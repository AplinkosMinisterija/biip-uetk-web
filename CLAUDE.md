# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Client web app for BĮIP UETK (Lithuanian water bodies registry), built by Aplinkos Ministerija. It is a frontend only — all data comes from the [biip-uetk-api](https://github.com/AplinkosMinisterija/biip-uetk-api) backend, proxied at `/api`. Node `>=20.0.0 <21.0.0`, package manager is yarn.

## Commands

- `yarn start` — Vite dev server on port 8080. Requires a `.env` (copy `.env.template`); `VITE_PROXY_URL` is the backend the `/api` requests are proxied to.
- `yarn build` — `tsc` typecheck + `vite build`. Treat type errors as build failures.
- `yarn lint` — ESLint over `.js,.jsx,.ts,.tsx` using `@aplinkosministerija/eslint-config-biip-react`.
- `yarn test` — vitest. There is currently no real test suite; the script exists but no `.test.*` files are checked in.
- `yarn serve` — preview a production build.

A husky `pre-commit` hook runs `lint-staged` (prettier + eslint on staged JS/TS, prettier on md/html/css). Don't bypass it.

## Architecture

### Routing & auth flow

Entry is [src/index.tsx](src/index.tsx) → [src/app.tsx](src/app.tsx). Routes are declared centrally in [src/utils/routes.tsx](src/utils/routes.tsx) — `slugs` is the canonical map of URL paths (Lithuanian, e.g. `/duomenu-teikimas`, `/duomenu-gavimas`), and `routes` pairs each slug with its page component. `filteredRoutes(profile)` hides routes flagged `tenantOwner: true` from non-owners; add new pages by extending both `slugs` and `routes`, not by registering `<Route>` elements ad-hoc in `app.tsx`.

`App` wraps everything in `PublicRoute` / `ProtectedRoute` guards driven by `state.user.loggedIn`. Auth uses cookies (`token`, `refreshToken`, `profileId`) read directly via `universal-cookie` — there is no auth context. Login goes through either username/password or e-Gates (Lithuanian national auth, `?ticket=`/`?eGates=` query params handled in `app.tsx`). After login the user picks a profile from `state.user.userData.profiles`; the chosen `profileId` is sent as the `X-Profile` header on every request and a tenant context is loaded if applicable.

### State

Redux Toolkit store in [src/state/store.ts](src/state/store.ts) with reducers for `user`, `users`, `tenant`, `filters`, `columns`. Only `filters` is persisted via `redux-persist` (localStorage, key `speciesConfig`). Use `useAppSelector` / `useAppDispatch` from [src/state/hooks.ts](src/state/hooks.ts) — typed wrappers around the raw redux hooks.

Server state lives in **react-query** (`QueryClient` provided in `index.tsx`). Pattern: redux for session/user/tenant/UI filters; react-query for everything fetched from the API.

### API layer

[src/api.ts](src/api.ts) exports a singleton `Api` instance. All requests go through a single Axios instance whose interceptor:
1. Prepends `/api` (Vite proxies this to `VITE_PROXY_URL` in dev; Caddy handles it in prod via [caddy/Caddyfile](caddy/Caddyfile)).
2. Adds `Authorization: Bearer <token>` and `X-Profile: <profileId>` from cookies.

Generic CRUD helpers (`getAll`, `getOne`, `post`, `patch`, `delete`) take a `resource` string from `Resources` enum in [src/utils/constants.ts](src/utils/constants.ts). Add new endpoints by extending `Resources` and reusing these helpers rather than adding bespoke methods.

### Pages and forms

- `src/pages/Forms/` and `src/pages/Requests/` are list pages; each has its own `config.ts`, `functions.tsx`, and `hooks/` subfolder.
- `src/pages/Form.tsx`, `Request.tsx`, `Profile.tsx`, `Tenant.tsx`, `TenantUserForm.tsx` are detail/edit pages.
- Forms use **Formik + Yup**. Shared field components live in [src/components/fields/](src/components/fields/) — prefer those over raw `<input>` so styling and error display stay consistent.
- Map UI is in [src/components/map/](src/components/map/) and integrates with `VITE_MAPS_HOST` (defaults to `https://maps.biip.lt`).

### Styling

`styled-components` + a single theme in [src/styles/](src/styles/) injected via `ThemeProvider` in `index.tsx`. The shared design system is `@aplinkosministerija/design-system`; check there before building a primitive that might already exist.

### Localization

UI text is Lithuanian and centralized in [src/utils/texts.ts](src/utils/texts.ts) (and `menuLabels`, `url` exported from there). There is no i18n framework — strings are imported from `texts.ts` directly. URL slugs themselves are also Lithuanian; don't anglicize them.

## Conventions worth knowing

- `tsconfig.json` does **not** enable `strict`. Don't assume strict-null checking; explicit guards are still required.
- Prettier config comes from `@aplinkosministerija/biip-prettier-config` (referenced in `package.json`); do not add a local `.prettierrc`.
- Deployment: pushing to `main` auto-deploys staging. Production deploys are triggered by creating a GitHub release; dev deploys via the `Deploy to Development` Action.
