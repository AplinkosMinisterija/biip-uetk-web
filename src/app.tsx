import { isEqual } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import {
  Location,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import api from "./api";
import DefaultLayout from "./components/layouts/DefaultLayout";
import LoaderComponent from "./components/other/LoaderComponent";
import { Login } from "./pages/Login";
import { useAppSelector } from "./state/hooks";
import { ProfileId } from "./types";
import { ServerErrorCodes } from "./utils/constants";
import {
  isProfileFullyCompleted,
  isTenantFullyCompleted
} from "./utils/functions";
import {
  useEGatesSign,
  useFilteredRoutes,
  useGetCurrentProfile,
  useIsTenantOwner,
  useTenantInfoMutation,
  useUserInfo
} from "./utils/hooks";
import { handleUpdateTokens } from "./utils/loginFunctions";
import { slugs } from "./utils/routes";

const cookies = new Cookies();

interface RouteProps {
  loggedIn: boolean;
  profileId?: ProfileId;
  location?: Location;
}

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const profiles = useAppSelector((state) => state.user.userData.profiles);
  const [searchParams] = useSearchParams();
  const { ticket, eGates } = Object.fromEntries([...Array.from(searchParams)]);
  const [initialLoading, setInitialLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const routes = useFilteredRoutes();
  const navigateRef = useRef(navigate);
  const user = useAppSelector((state) => state.user.userData);
  const tenant = useAppSelector((state) => state.tenant);
  const currentProfile = useGetCurrentProfile();
  const isTenantOwner = useIsTenantOwner();
  const profileId = currentProfile?.id!;
  const publicSlugs = [slugs.profiles, slugs.login];
  const isPublicSlugs = publicSlugs.includes(location.pathname);

  const isInvalidProfile =
    profileId &&
    !profiles
      ?.map((profile) => {
        return profile?.id;
      })
      .includes(profileId) &&
    loggedIn;

  const updateTokensMutation = useMutation(api.refreshToken, {
    onError: ({ response }: any) => {
      if (isEqual(response.status, ServerErrorCodes.NOT_FOUND)) {
        cookies.remove("refreshToken", { path: "/" });
      }
    },
    onSuccess: (data) => {
      handleUpdateTokens(data);
    }
  });

  const updateTokensMutationMutateAsyncFunction =
    updateTokensMutation.mutateAsync;

  const shouldUpdateTokens = useCallback(async () => {
    if (!cookies.get("token") && cookies.get("refreshToken")) {
      await updateTokensMutationMutateAsyncFunction();
    }
  }, [updateTokensMutationMutateAsyncFunction]);

  const { mutateAsync: eGateSignsMutation, isLoading: eGatesSignLoading } =
    useEGatesSign();

  const { isLoading: userInfoLoading } = useUserInfo();
  const { isFetching: tenantInfoLoading } = useTenantInfoMutation();

  const eGatesLoginMutation = useMutation(
    (ticket: string) => api.eGatesLogin({ ticket }),
    {
      onSuccess: (data) => {
        handleUpdateTokens(data);
      },
      retry: false
    }
  );

  useEffect(() => {
    if (userInfoLoading || tenantInfoLoading || isPublicSlugs) return;

    if (profileId && !isProfileFullyCompleted(user)) {
      return navigate(slugs.profile);
    }
    if (isTenantOwner && !isTenantFullyCompleted(tenant)) {
      return navigate(slugs.tenant);
    }
  }, [
    location.pathname,
    navigate,
    profileId,
    isPublicSlugs,
    isTenantOwner,
    userInfoLoading,
    tenantInfoLoading,
    user,
    tenant
  ]);

  const isLoading = [
    userInfoLoading,
    initialLoading,
    tenantInfoLoading,
    eGatesLoginMutation.isLoading,
    eGatesSignLoading,
    updateTokensMutation.isLoading
  ].some((loading) => loading);

  useEffect(() => {
    (async () => {
      await shouldUpdateTokens();
      setInitialLoading(false);
    })();
  }, [location.pathname, shouldUpdateTokens]);

  const eGatesLoginMutationMutateAsync = eGatesLoginMutation.mutateAsync;

  useEffect(() => {
    (async () => {
      if (loggedIn) return;

      if (ticket) {
        eGatesLoginMutationMutateAsync(ticket);
      }
      if (eGates !== undefined) {
        eGateSignsMutation();
      }
    })();
  }, [
    ticket,
    eGates,
    eGateSignsMutation,
    eGatesLoginMutationMutateAsync,
    loggedIn
  ]);

  useEffect(() => {
    if (!isInvalidProfile) return;

    cookies.remove("profileId", { path: "/" });

    if (!navigateRef?.current) return;

    navigateRef?.current("");
  }, [profileId, loggedIn, isInvalidProfile]);

  const getDefaultRoute = () => {
    if (!loggedIn) return slugs.login;

    if (!profileId) return slugs.profiles;

    return slugs.forms;
  };

  return (
    <>
      {!isLoading ? (
        <DefaultLayout loggedIn={loggedIn}>
          <>
            <Routes>
              <Route
                element={
                  <PublicRoute profileId={profileId} loggedIn={loggedIn} />
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
              <Route
                element={
                  <ProtectedRoute
                    location={location}
                    profileId={profileId}
                    loggedIn={loggedIn}
                  />
                }
              >
                {(routes || []).map((route, index) => (
                  <Route
                    key={`route-${index}`}
                    path={route.slug}
                    element={route.component}
                  />
                ))}
              </Route>
              <Route path="*" element={<Navigate to={getDefaultRoute()} />} />
            </Routes>
            <ToastContainer />
          </>
        </DefaultLayout>
      ) : (
        <LoaderComponent />
      )}
    </>
  );
}

const PublicRoute = ({ loggedIn, profileId }: RouteProps) => {
  if (loggedIn) {
    return <Navigate to={!!profileId ? slugs.forms : slugs.profiles} replace />;
  }

  return <Outlet />;
};

const ProtectedRoute = ({ loggedIn, profileId, location }: RouteProps) => {
  if (!loggedIn) {
    return <Navigate to={"/login"} replace />;
  }

  if (location?.pathname === slugs.profiles && !!profileId) {
    return <Navigate to={slugs.forms} replace />;
  }

  return <Outlet />;
};

export default App;
