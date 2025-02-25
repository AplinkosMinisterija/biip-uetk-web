import { useMutation, useQuery } from 'react-query';
import Cookies from 'universal-cookie';
import api from '../api';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { actions as tenantActions } from '../state/tenant/reducer';
import { actions as userActions } from '../state/user/reducer';
import { Tenant, User } from '../types';
import { handleErrorFromServerToast, handleIsTenantOwner, handleIsTenantUser } from './functions';
import { clearCookies, emptyUser, handleSetProfile } from './loginFunctions';
import { filteredRoutes } from './routes';

const cookies = new Cookies();

export const useFilteredRoutes = () => {
  return filteredRoutes(useGetCurrentProfile());
};

export const useGetCurrentProfile = () => {
  const profiles = useAppSelector((state) => state.user.userData.profiles);
  const profileId = cookies.get('profileId');
  const currentProfile = profiles?.find(
    (profile) => profile.id.toString() === profileId?.toString(),
  );
  return currentProfile;
};

export const useIsTenantUser = () => {
  return handleIsTenantUser(useGetCurrentProfile());
};

export const useIsTenantOwner = () => {
  return handleIsTenantOwner(useGetCurrentProfile());
};

export const useEGatesSign = () => {
  const { mutateAsync, isLoading } = useMutation(api.eGatesSign, {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: ({ url }) => {
      window.location.replace(url);
    },
    retry: false,
  });

  return { isLoading, mutateAsync };
};

export const useTenantInfoMutation = () => {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state?.user?.loggedIn);
  const profileId = cookies.get('profileId');

  const { isFetching } = useQuery(
    ['tenant', loggedIn, profileId],
    () => api.getTenantInfo(profileId),
    {
      onError: () => {
        handleErrorFromServerToast();
      },
      onSuccess: ({ name, code, phone, email, id }: Tenant) => {
        dispatch(tenantActions.setTenant({ id, name, code, phone, email }));
      },
      retry: false,
      refetchOnWindowFocus: false,
      enabled: loggedIn && !isNaN(profileId),
    },
  );

  return { isFetching };
};

export const useUserInfo = () => {
  const dispatch = useAppDispatch();
  const token = cookies.get('token');

  const { isLoading } = useQuery([token], () => api.getUserInfo(), {
    onError: () => {
      clearCookies();
      dispatch(userActions.setUser(emptyUser));
    },
    onSuccess: (data: User) => {
      if (data) {
        handleSetProfile(data.profiles);
        dispatch(userActions.setUser({ userData: data, loggedIn: true }));
      }
    },
    retry: false,
    enabled: !!token,
  });

  return { isLoading };
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();

  const { mutateAsync } = useMutation(() => api.logout(), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: () => {
      clearCookies();
      dispatch(userActions.setUser(emptyUser));
    },
  });

  return { mutateAsync };
};
