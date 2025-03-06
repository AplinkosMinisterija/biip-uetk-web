import { FilterInputTypes } from '../../components/other/DynamicFilter/Filter';
import { getLocationList } from '../../utils/functions';
import {
  getFormObjectTypes,
  getPurposeTypes,
  getRequestDataTypes,
  getRequestStatusTypes,
} from '../../utils/options';
import { formFiltersLabels } from '../../utils/texts';

export const filterConfig = {
  createdFrom: {
    label: formFiltersLabels.createdFrom,
    key: 'createdFrom',
    inputType: FilterInputTypes.date,
  },
  createdTo: {
    label: formFiltersLabels.createdTo,
    key: 'createdTo',
    inputType: FilterInputTypes.date,
  },
  purpose: {
    label: formFiltersLabels.purpose,
    key: 'purpose',
    inputType: FilterInputTypes.multiselect,
    options: getPurposeTypes(),
  },
  status: {
    label: formFiltersLabels.status,
    key: 'status',
    inputType: FilterInputTypes.multiselect,
    options: getRequestStatusTypes(),
  },
  objects: {
    label: formFiltersLabels.objects,
    key: 'objects',
    inputType: FilterInputTypes.asyncMultiSelect,
    api: getLocationList,
    optionLabel: (option) => {
      const { name, cadastralId, categoryTranslate } = option;
      return `${name}, ${cadastralId}, ${categoryTranslate}`;
    },
    getOptionValue: (option) => option.cadastralId,
  },
  category: {
    label: formFiltersLabels.objectType,
    key: 'category',
    inputType: FilterInputTypes.singleselect,
    options: getFormObjectTypes(),
  },
  requestDataType: {
    label: formFiltersLabels.requestDataType,
    key: 'requestDataType',
    inputType: FilterInputTypes.singleselect,
    options: getRequestDataTypes(),
  },
};

export const rowConfig = [
  ['objects'],
  ['category'],
  ['createdFrom', 'createdTo'],
  ['purpose'],
  ['status'],
  ['requestDataType'],
];
