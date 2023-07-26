import styled from "styled-components";
import Icon from "../components/other/Icons";
import Form from "../pages/Form";
import Forms from "../pages/Forms";
import ProfilePage from "../pages/Profile";
import Profiles from "../pages/Profiles";
import RequestPage from "../pages/Request";
import Requests from "../pages/Requests";
import TenantUserForm from "../pages/TenantUserForm";
import TenantUsers from "../pages/TenantUsers";
import { Profile } from "../types";
import { handleIsTenantOwner, handleIsTenantUser } from "./functions";
import { menuLabels, url } from "./texts";

export const slugs = {
  profile: "/profilis",
  profiles: "/profiliai",
  forms: "/duomenu-teikimas",
  formMy: "/duomenu-teikimas/mano",
  newForm: "/duomenu-teikimas/naujas",
  form: (id: string) => `/duomenu-teikimas/${id}`,
  requests: `/prasymai`,
  request: (id: string) => `/prasymai/${id}`,
  newRequest: "/prasymai/naujas",
  tenantUsers: `/imones_darbuotojai`,
  tenantUser: (id?: string) => `/imones_darbuotojai/${id}`,
  newTenantUser: `/imones_darbuotojai/naujas`,
  placesMap: `/radavieciu-zemelapis`
};

const StyledIcons = styled(Icon)`
  color: #cdd5df;
  font-size: 1.8rem;
`;

export const externalRoutes = [
  {
    label: menuLabels.forms,
    slug: slugs.forms,
    internal: true
  },
  {
    label: menuLabels.requests,
    slug: slugs.requests,
    internal: true
  },

  {
    label: "UETK",
    slug: url.publicUETK,
    icon: <StyledIcons name={"open"} />
  }
];

const routes = [
  {
    label: menuLabels.profile,
    slug: slugs.profile,
    dropDown: true,
    component: <ProfilePage />
  },
  {
    label: menuLabels.profile,
    slug: slugs.forms,
    component: <Forms />
  },
  {
    slug: slugs.form(":id"),
    component: <Form />
  },

  {
    label: menuLabels.tenantUsers,
    slug: slugs.tenantUsers,
    dropDown: true,
    tenantOwner: true,
    component: <TenantUsers />
  },
  {
    slug: slugs.tenantUser(":id"),
    tenantOwner: true,
    component: <TenantUserForm />
  },
  {
    slug: slugs.requests,
    component: <Requests />
  },
  {
    slug: slugs.request(":id"),
    component: <RequestPage />
  },
  {
    slug: slugs.profiles,
    component: <Profiles />
  }
];

export const filteredRoutes = (profile?: Profile): any =>
  routes.filter((route) => {
    if (!route?.slug) return false;
    if (route.tenantOwner) {
      return handleIsTenantOwner(profile?.role);
    }
    if (route.tenantOwner) {
      return handleIsTenantUser(profile);
    }

    return true;
  });
