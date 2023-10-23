import { isEqual } from "lodash";
import { useMutation, useQuery } from "react-query";
import Cookies from "universal-cookie";
import api from "../api";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { actions } from "../state/user/reducer";
import { User } from "../types";
import { ServerErrorCodes } from "./constants";
import { handleAlert, handleIsTenantUser } from "./functions";
import { clearCookies, emptyUser, handleSetProfile } from "./loginFunctions";
import { filteredRoutes } from "./routes";

const cookies = new Cookies();

export const useFilteredRoutes = () => {
  return filteredRoutes(useGetCurrentProfile());
};

export const useGetCurrentProfile = () => {
  const profiles = useAppSelector((state) => state.user.userData.profiles);
  const profileId = cookies.get("profileId");
  const currentProfile = profiles?.find(
    (profile) => profile.id.toString() === profileId?.toString()
  );
  return currentProfile;
};

export const useIsTenantUser = () => {
  return handleIsTenantUser(useGetCurrentProfile());
};

export const useEGatesSign = () => {
  const { mutateAsync, isLoading } = useMutation(api.eGatesSign, {
    onError: () => {
      handleAlert();
    },
    onSuccess: ({ url }) => {
      window.location.replace(url);
    },
    retry: false
  });

  return { isLoading, mutateAsync };
};

export const useUserInfo = () => {
  const dispatch = useAppDispatch();
  const token = cookies.get("token");

  const { isLoading } = useQuery([token], () => api.getUserInfo(), {
    onError: ({ response }: any) => {
      if (isEqual(response.status, ServerErrorCodes.NO_PERMISSION)) {
        clearCookies();
        dispatch(actions.setUser(emptyUser));

        return;
      }

      return handleAlert();
    },
    onSuccess: (data: User) => {
      if (data) {
        handleSetProfile(data.profiles);
        dispatch(actions.setUser({ userData: data, loggedIn: true }));
      }
    },
    retry: false,
    enabled: !!token
  });

  return { isLoading };
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation(() => api.logout(), {
    onError: () => {
      handleAlert();
    },
    onSuccess: () => {
      clearCookies();
      dispatch(actions.setUser(emptyUser));
    }
  });

  return { mutateAsync };
};
