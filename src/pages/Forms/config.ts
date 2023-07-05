import { FilterInputTypes } from "../../components/other/DynamicFilter/Filter";
import {
  getFormObjectTypes,
  getFormStatusTypes,
  getFormSTypes
} from "../../utils/functions";
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
  type: {
    label: formFiltersLabels.type,
    key: "type",
    inputType: FilterInputTypes.multiselect,
    options: getFormSTypes()
  },
  objectType: {
    label: formFiltersLabels.objectType,
    key: "objectType",
    inputType: FilterInputTypes.multiselect,
    options: getFormObjectTypes()
  },
  status: {
    label: formFiltersLabels.status,
    key: "status",
    inputType: FilterInputTypes.multiselect,
    options: getFormStatusTypes()
  }
};

export const rowConfig = [
  ["objectType"],
  ["type"],
  ["createdFrom", "createdTo"],
  ["status"]
];
