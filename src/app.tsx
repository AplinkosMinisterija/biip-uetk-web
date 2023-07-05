import { useEffect, useState } from "react";
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
import LoginPage from "./pages/Login";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { actions } from "./state/user/reducer";
import { ProfileId } from "./types";
import {
  handleEGatesSign,
  handleGetCurrentUser,
  handleResponse,
  handleUpdateTokens
} from "./utils/functions";
import { useFilteredRoutes } from "./utils/hooks";
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
  const profileId: ProfileId = cookies.get("profileId");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const routes = useFilteredRoutes();

  const shouldUpdateTokens = async () => {
    if (!cookies.get("token") && cookies.get("refreshToken")) {
      await handleResponse({
        endpoint: () => api.refreshToken(),
        onSuccess: (data) => {
          handleUpdateTokens(data);
        }
      });
    }
  };

  const handleCheckAuth = async () => {
    await shouldUpdateTokens();

    const currentUserData = await handleGetCurrentUser();
    dispatch(actions.setUser(currentUserData));
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await handleCheckAuth();

      if (loggedIn) return;

      if (ticket) {
        setLoading(true);
        handleResponse({
          endpoint: () => api.eGatesLogin({ ticket }),
          onSuccess: async (data) => {
            handleUpdateTokens(data);
            const currentUserData = await handleGetCurrentUser();
            dispatch(actions.setUser(currentUserData));
            setLoading(false);
          }
        });
      }
      if (eGates !== undefined) {
        setLoading(true);
        await handleEGatesSign();
        setLoading(false);
      }
    })();
  }, [ticket, eGates, location.pathname]);

  useEffect(() => {
    const isValidProfile =
      !profiles?.map((profile) => profile.id.toString()).includes(profileId) &&
      loggedIn;

    if (isValidProfile) {
      cookies.remove("profileId", { path: "/" });

      navigate(slugs.profiles);
    }
  }, [profileId, loggedIn]);

  return (
    <>
      {!loading ? (
        <DefaultLayout loggedIn={loggedIn}>
          <>
            <Routes>
              <Route
                element={
                  <PublicRoute profileId={profileId} loggedIn={loggedIn} />
                }
              >
                <Route path="/login" element={<LoginPage />} />
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
              <Route
                path="*"
                element={<Navigate to={loggedIn ? slugs.forms : "/login"} />}
              />
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
    return <Navigate to={"/prisijungimas"} replace />;
  }

  if (location?.pathname == slugs.profiles && !!profileId) {
    return <Navigate to={slugs.forms} replace />;
  }

  return <Outlet />;
};

export default App;
