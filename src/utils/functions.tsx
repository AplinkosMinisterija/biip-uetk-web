import { useMediaQuery } from "@material-ui/core";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { default as api, default as Api } from "../api";
import { FilterConfig } from "../components/other/DynamicFilter/Filter";
import { device } from "../styles";
import { Columns, Profile } from "../types";
import {
  FormDataFields,
  FormObjectType,
  FormProviderType,
  RolesTypes,
  StatusTypes,
  SubPoolTypes
} from "./constants";
import { validationTexts } from "./texts";

export const handleAlert = (responseError?: string) => {
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

export const bytesToMb = (bytes: number) => {
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
export const subPoolTypes = Object.keys(SubPoolTypes);

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

  return sortDesktop(columns, key, key2);
};

export const getActiveColumns = (sortedColumns: Columns) =>
  Object.keys(sortedColumns).reduce((obj, key) => {
    if (sortedColumns[key].show) {
      obj[key] = sortedColumns[key];
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

export const getUserList = async () => {
  return await Api.tenantUsers({
    pageSize: "99999"
  });
};

export const handleIsTenantUser = (profile?: Profile) => !!profile?.role;

export const handleIsTenantOwner = (role?: RolesTypes) =>
  role === RolesTypes.ADMIN;

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

export const getLocationList = async (input: string, page: number | string) => {
  return await api.getLocations({ search: input, page });
};

export const isMapEditAttribute = (attribute) =>
  [
    FormDataFields.mouthCenterCoordinates,
    FormDataFields.centerCoordinates
  ].includes(attribute as FormDataFields);

export const handleHasCoordinatesField = (editFields) =>
  editFields.some((item) => isMapEditAttribute(item?.attribute));

export const useGetSortedColumns = (columns: Columns) => {
  const isMobile = useMediaQuery(device.mobileL);

  const sortedColumns = Object.keys(columns)
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

  return sortedColumns;
};

export const getPublicUrl = (url: string) => `${process.env.PUBLIC_URL}/${url}`;

export const availableMimeTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "application/pdf"
];
