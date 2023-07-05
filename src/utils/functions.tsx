import { map } from "lodash";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import { default as api, default as Api } from "../api";
import { FilterConfig } from "../components/other/DynamicFilter/Filter";
import { actions } from "../state/user/reducer";
import { Columns, Profile, ProfileId } from "../types";
import {
  FormDataFields,
  FormObjectType,
  FormProviderType,
  FormType,
  RolesTypes,
  StatusTypes
} from "./constants";
import {
  formObjectTypeLabels,
  formStatusLabels,
  formTypeLabels,
  roleLabels,
  validationTexts
} from "./texts";

const cookies = new Cookies();
interface SetResponseProps {
  endpoint: () => Promise<any>;
  onSuccess: (data: any) => void;
  onError?: (data: any) => void;
}

interface UpdateTokenProps {
  token?: string;
  error?: string;
  message?: string;
  refreshToken?: string;
}

export const handleAlert = (responseError: string) => {
  toast.error(
    validationTexts[responseError as keyof typeof validationTexts] ||
      validationTexts.error,
    {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true
    }
  );
};

export const handleSuccess = (message: string) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  });
};

export const isNew = (id?: string) => !id || id === "naujas";

export const bytesIntoMb = (bytes: number) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";

  const sizeArrayIndex = parseInt(
    `${Math.floor(Math.log(bytes) / Math.log(1024))}`,
    10
  );
  if (sizeArrayIndex === 0) return `${bytes} ${sizes[sizeArrayIndex]})`;
  return `${(bytes / 1024 ** sizeArrayIndex).toFixed(1)} ${
    sizes[sizeArrayIndex]
  }`;
};

export const formObjectTypes = Object.keys(FormObjectType);
export const formProviderTypes = Object.keys(FormProviderType);

export const getFormStatusTypes = () =>
  map(StatusTypes, (Status) => ({
    id: Status,
    label: formStatusLabels[Status]
  }));

export const getFormSTypes = () =>
  map(FormType, (Status) => ({
    id: Status,
    label: formTypeLabels[Status]
  }));

export const getFormObjectTypes = () =>
  map(FormObjectType, (Status) => ({
    id: Status,
    label: formObjectTypeLabels[Status]
  }));

export const getRolesTypes = () =>
  map(RolesTypes, (role) => ({
    id: role,
    label: roleLabels[role]
  }));

export const canShowResponseDate = (status) => {
  return [
    StatusTypes.APPROVED,
    StatusTypes.REJECTED,
    StatusTypes.RETURNED
  ].includes(status);
};

export const sortDesktop = (columns: Columns, key: string, key2: string) => {
  if (columns[key].desktopOrder && columns[key2].desktopOrder) {
    return columns?.[key]?.desktopOrder! > columns?.[key2]?.desktopOrder!
      ? 1
      : -1;
  }

  return 0;
};

export const sortMobile = (columns: Columns, key: string, key2: string) => {
  if (columns[key].mobileOrder && columns[key2].mobileOrder) {
    return columns?.[key]?.mobileOrder! > columns?.[key2]?.mobileOrder!
      ? 1
      : -1;
  }

  if (columns[key].desktopOrder && columns[key2].desktopOrder) {
    return columns?.[key]?.desktopOrder! > columns?.[key2]?.desktopOrder!
      ? 1
      : -1;
  }

  return 0;
};

export const getOrderedColumns = (columns: Columns, isMobile: boolean) =>
  Object.keys(columns)
    .sort((key, key2) =>
      isMobile
        ? sortMobile(columns, key, key2)
        : sortDesktop(columns, key, key2)
    )
    .reduce((obj, key) => {
      const isVisible =
        !columns[key].hasOwnProperty("visible") || columns[key].visible;

      if (isVisible) {
        obj[key] = columns[key];
      }
      return obj;
    }, {});

export const getActiveColumns = (orderedColumns: Columns) =>
  Object.keys(orderedColumns).reduce((obj, key) => {
    if (orderedColumns[key].show) {
      obj[key] = orderedColumns[key];
    }
    return obj;
  }, {});

export const handleToggleColumns = (columns: Columns, key: string) => {
  columns[key].show = !columns[key].show;
};

export const handleSetVisibleColumns = (
  columns: Columns,
  items: { [key: string]: boolean }
) => {
  const keys = Object.keys(items);

  keys.forEach((key) => {
    columns[key].visible = items[key];
  });
};

export const taxonomyOptionLabel = (taxonomy) =>
  `${taxonomy?.name || "-"} (lot. ${taxonomy?.nameLatin || "-"})`;

export const speciesOptionLabel = (option) =>
  `${option?.speciesName || "-"} (lot. ${option?.speciesNameLatin || "-"})`;

export const getUserList = async () => {
  return await Api.tenantUsers({
    pageSize: "99999"
  });
};

export const handleResponse = async ({
  endpoint,
  onSuccess,
  onError
}: SetResponseProps) => {
  const response = await endpoint();

  if (onError && response?.error) {
    return onError(
      validationTexts[response?.error?.type] || validationTexts.error
    );
  }

  if (!response || response?.error) {
    return handleAlert(response?.error?.type);
  }

  return onSuccess(response);
};

export const handleIsTenantUser = (profile?: Profile) => !!profile?.role;

export const handleIsTenantOwner = (role?: RolesTypes) =>
  role === RolesTypes.ADMIN;

export const handleSelectProfile = (profileId: ProfileId) => {
  if (cookies.get("profileId") == profileId) return;

  cookies.set("profileId", `${profileId}`, { path: "/" });

  window.location.reload();
};

export const handleNavigate = (
  slug: string,
  navigate: NavigateFunction,
  show: React.Dispatch<React.SetStateAction<boolean>>
) => {
  navigate(slug);
  show(false);
};

export const handleDateRestriction = (filter: FilterConfig, values: any) => {
  if (filter?.key?.includes("From")) {
    const dateTo = filter?.key?.replace("From", "To");
    if (values?.[dateTo]) {
      return { maxDate: new Date(values[dateTo]) };
    }
  }
  if (filter?.key?.includes("To")) {
    const dateFrom = filter?.key?.replace("To", "From");
    if (values?.[dateFrom]) {
      return { minDate: new Date(values[dateFrom]) };
    }
  }
};

export const clearCookies = () => {
  cookies.remove("token", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
  cookies.remove("module", { path: "/" });
  cookies.remove("profileId", { path: "/" });
};

export const handleLogout = async (dispatch) => {
  handleResponse({
    endpoint: () => Api.logout(),
    onSuccess: () => {
      clearCookies();
      dispatch(actions.setUser({ userData: null, loggedIn: false }));
    }
  });
};

export const handleUpdateTokens = (data: UpdateTokenProps) => {
  const { token, refreshToken, error } = data;
  if (token) {
    cookies.set("token", `${token}`, {
      path: "/",
      expires: new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
    });

    if (refreshToken) {
      cookies.set("refreshToken", `${refreshToken}`, { path: "/" });
    }
  }
  if (error) {
    return { error };
  }
};

export const handleGetCurrentUser = async (justLoggedIn: boolean = false) => {
  const emptyUser = { userData: null, loggedIn: false };

  if (!cookies.get("token")) return emptyUser;

  return handleResponse({
    endpoint: () => Api.checkAuth(),
    onError: () => {
      clearCookies();
      return emptyUser;
    },
    onSuccess: (userData) => {
      handleSetProfile(userData?.profiles, justLoggedIn);
      return { userData: userData, loggedIn: true };
    }
  });
};

export const getLocationList = async (input: string, page: number | string) => {
  return await api.getLocations({ search: input, page });
};

const handleSetProfile = (
  profiles?: Profile[],
  justLoggedIn: boolean = false
) => {
  const isOneProfile = profiles?.length === 1;
  const profileId = cookies.get("profileId");

  if (profileId && justLoggedIn) {
    const hasProfile = profiles?.some((profile) => profile.id == profileId);

    if (hasProfile) {
      handleSelectProfile(profileId);
    } else {
      cookies.remove("profileId", { path: "/" });
    }
  } else if (isOneProfile) {
    handleSelectProfile(profiles[0].id);
  }
};

export const handleEGatesSign = async () => {
  await handleResponse({
    endpoint: () => Api.eGatesSign(),
    onSuccess: ({ url }) => {
      window.location.replace(url);
    }
  });
};

export const isMapEditAttribute = (attribute) =>
  [
    FormDataFields.mouthCenterCoordinates,
    FormDataFields.centerCoordinates
  ].includes(attribute as FormDataFields);

export const handleHasCoordinatesField = (editFields) =>
  editFields.some((item) => isMapEditAttribute(item?.attribute));
