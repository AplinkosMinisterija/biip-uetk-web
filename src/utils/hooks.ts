import { isEmpty } from "lodash";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { actions } from "../state/users/reducer";
import { getUserList, handleIsTenantUser } from "./functions";
import { filteredRoutes } from "./routes";

const cookies = new Cookies();

export const useFilteredRoutes = () => {
  return filteredRoutes(useGetCurrentProfile());
};

export const useGetCurrentProfile = () => {
  const profiles = useAppSelector((state) => state.user.userData.profiles);
  const profileId = cookies.get("profileId");
  const currentProfile = profiles?.find((profile) => profile.id == profileId);
  return currentProfile;
};

export const useIsTenantUser = () => {
  return handleIsTenantUser(useGetCurrentProfile());
};

export const useUsers = (returnUsers: boolean) => {
  const users = useAppSelector((state) => state.users.list);
  const isTenantUser = useIsTenantUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isEmpty(users) || !isTenantUser || !returnUsers) return;

    (async () => {
      const list = await getUserList();

      dispatch(actions.setUsers(list?.rows));
    })();
  }, [users]);

  if (!returnUsers) return [];

  return users || [];
};
