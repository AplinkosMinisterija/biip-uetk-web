import { map } from "lodash";
import {
  FormObjectType,
  FormType,
  PurposeTypes,
  RolesTypes,
  StatusTypes
} from "./constants";
import {
  formObjectTypeLabels,
  formStatusLabels,
  formTypeLabels,
  purposeTypeLabels,
  requestStatusLabels,
  roleLabels
} from "./texts";

export const purposeTypesOptions = Object.keys(PurposeTypes);

export const getPurposeTypes = () =>
  map(PurposeTypes, (Status) => ({
    id: Status,
    label: purposeTypeLabels[Status]
  }));

export const getFormStatusTypes = () =>
  map(StatusTypes, (Status) => ({
    id: Status,
    label: formStatusLabels[Status]
  }));

export const getRequestStatusTypes = () =>
  map(StatusTypes, (Status) => ({
    id: Status,
    label: requestStatusLabels[Status]
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
