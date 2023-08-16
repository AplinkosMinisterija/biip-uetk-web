import {
  DeliveryTypes,
  FormDataFields,
  FormObjectType,
  FormProviderType,
  FormType,
  HistoryTypes,
  PurposeTypes,
  RolesTypes,
  StatusTypes,
  TableItemWidth
} from "./utils/constants";

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: RolesTypes;
  active?: boolean;
  phone?: string;
  mobilePhone?: string;
  password?: string;
  legalPerson?: string;
  personalCode?: string;
  duties?: string;
  maxForms?: string;
  maxLoops?: string;
  accessDate?: Date;
  getData?: boolean;
  stats?: { approvedForms: number; rejectedForms: number };
  isExpert?: boolean;
  error?: string;
  profiles?: Profile[];
}

export type ProfileId = "freelancer" | "expert" | string;

export interface Profile {
  id: ProfileId;
  name: string;
  freelancer: boolean;
  email?: string;
  role: RolesTypes;
}

export interface AuthState {
  loggedIn: boolean;
}

export type Column = {
  label: string;
  mobileOrder?: number;
  desktopOrder?: number;
  show: boolean;
  visible?: boolean;
  width?: TableItemWidth;
};

export type Columns = {
  [key: string]: Column;
};

export interface Sources {
  id?: string;
  name: string;
  createdBy?: User;
  createdAt: string;
}

export type FileProps = {
  url: string;
  name: string;
  size: number;
};

export type ResponseFileProps = {
  url: string;
  filename: string;
  size: number;
};

export interface ListResultProps<T> {
  rows?: T[];
  totalPages?: number;
  error?: string;
}

export interface TransformUser {
  id?: string;
  fullName: string;
  email: string;
  roles: string;
  active: string;
}

export interface TransformObservation {
  id?: string;
  name: string;
  nameLatin: string;
  createdAt: string;
}

export interface FormHistory {
  type: HistoryTypes;
  comment: string;
  createdBy: User;
  createdAt: Date;
}

export type HandleChangeType = (name: string, value: any) => void;
export type ChildrenType = string | JSX.Element | JSX.Element[] | any;

export interface DeleteInfoProps {
  deleteButtonText: string;
  deleteDescriptionFirstPart: string;
  deleteDescriptionSecondPart: string;
  deleteTitle: string;
  deleteName: string;
  deleteFunction?: () => void;
}

export interface TransformPlace {
  id?: string;
  code: string;
  species: string;
  status: string;
}

export interface UserFilters {
  firstName?: string;
  lastName?: string;
}

export interface FormFilters {
  createdFrom?: string;
  createdTo?: string;
  status?: { id: StatusTypes; label: string }[];
  objectType?: { id: FormObjectType; label: string }[];
  type?: { id: FormType; label: string }[];
}

export interface FormFiltersProps {
  createdAt?: { $gte?: Date; $lt?: Date };
  status?: { $in: StatusTypes[] };
  type?: { $in: FormType[] };
  objectType?: { $in: FormObjectType[] };
}

export interface RequestFilters {
  createdFrom?: string;
  createdTo?: string;
  status?: { id: StatusTypes; label: string }[];
  delivery?: { id: DeliveryTypes; label: string }[];
  purpose?: { id: PurposeTypes; label: string }[];
}

export interface RequestFiltersProps {
  status?: { $in: StatusTypes[] };
  createdAt?: { $gte?: Date; $lt?: Date };
  delivery?: { $in: DeliveryTypes[] };
  purpose?: { $in: PurposeTypes[] };
}

export interface Form {
  id?: string;
  type: FormType;
  createdBy?: User;
  objectType?: FormObjectType;
  objectName?: string;
  cadastralId?: string;
  geom: any;
  description: string;
  status?: StatusTypes;
  files: any[];
  providerType?: FormProviderType;
  providedBy?: string;
  data?: { [key in FormDataFields]?: string };
  respondedAt?: Date;
  createdAt?: Date;
  canEdit?: boolean;
  canValidate?: boolean;
  agreeWithConditions?: boolean;
  editFields?: { attribute?: string; value?: string }[];
}

export interface Request {
  id?: string;
  notifyEmail?: string;
  objects?: { cadastralId: string; category: string }[];
  status?: StatusTypes;
  delivery?: DeliveryTypes;
  purpose?: PurposeTypes;
  canEdit?: boolean;
  canValidate?: boolean;
  data?: {
    unverified?: boolean;
    extended?: boolean;
  };
  geom?: any;
  agreeWithConditions?: boolean;
  respondedAt?: Date;
  createdAt?: Date;
  generatedFile?: any;
}
