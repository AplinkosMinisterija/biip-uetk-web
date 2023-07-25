import { FilterInputTypes } from "../../components/other/DynamicFilter/Filter";
import {
  getDeliveryTypes,
  getPurposeTypes,
  getRequestStatusTypes
} from "../../utils/options";
import { formFiltersLabels } from "../../utils/texts";

export const filterConfig = {
  createdFrom: {
    label: formFiltersLabels.createdFrom,
    key: "createdFrom",
    inputType: FilterInputTypes.date
  },
  createdTo: {
    label: formFiltersLabels.createdTo,
    key: "createdTo",
    inputType: FilterInputTypes.date
  },
  delivery: {
    label: formFiltersLabels.type,
    key: "delivery",
    inputType: FilterInputTypes.multiselect,
    options: getDeliveryTypes()
  },
  purpose: {
    label: formFiltersLabels.objectType,
    key: "purpose",
    inputType: FilterInputTypes.multiselect,
    options: getPurposeTypes()
  },
  status: {
    label: formFiltersLabels.status,
    key: "status",
    inputType: FilterInputTypes.multiselect,
    options: getRequestStatusTypes()
  }
};

export const rowConfig = [
  ["createdFrom", "createdTo"],
  ["delivery"],
  ["purpose"],
  ["status"]
];
