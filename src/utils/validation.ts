import { isEmpty, isEqual } from "lodash";
import * as Yup from "yup";
import {
  FormDataFields,
  FormObjectType,
  FormProviderType,
  FormType
} from "./constants";
import {
  availableMimeTypes,
  handleHasCoordinatesField,
  isMapEditAttribute
} from "./functions";
import { validationTexts } from "./texts";

export const validateCreateTenantUser = Yup.object().shape({
  firstName: Yup.string().required(validationTexts.requireText).nullable(),
  lastName: Yup.string().required(validationTexts.requireText).nullable(),
  personalCode: Yup.string()
    .required(validationTexts.requireText)
    .length(11, validationTexts.personalCode)
    .nullable(),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat)
    .nullable(),
  email: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText)
    .nullable()
});

export const validateForm = Yup.object().shape({
  type: Yup.string().required(validationTexts.requireText),
  objectType: Yup.string().required(validationTexts.requireText),
  objectName: Yup.string().required(validationTexts.requireText),
  providerType: Yup.string().required(validationTexts.requireText),
  providedBy: Yup.string().when("providerType", {
    is: (providerType) => isEqual(providerType, FormProviderType.OTHER),
    then: Yup.string().required(validationTexts.requireText)
  }),
  geom: Yup.object().when(["type", "editFields"], {
    is: (
      type: FormType,
      editFields: { attribute: FormDataFields; value: any }[]
    ) => {
      const isNewType = isEqual(type, FormType.NEW);

      const hasCoordinatesField = handleHasCoordinatesField(editFields);

      return isNewType || hasCoordinatesField;
    },
    then: Yup.object().required(validationTexts.requireText)
  }),
  description: Yup.string().when(["type"], {
    is: (type: FormType) => {
      const isRemoveType = isEqual(type, FormType.REMOVE);

      return isRemoveType;
    },
    then: Yup.string().required(validationTexts.requireText)
  }),
  editFields: Yup.array().when(["type"], {
    is: (type: FormType) => {
      return isEqual(type, FormType.EDIT);
    },
    then: Yup.array().of(
      Yup.object().shape({
        attribute: Yup.string()
          .required(validationTexts.requireSelect)
          .nullable(),
        value: Yup.string().when("attribute", {
          is: (attribute) => !isMapEditAttribute(attribute),
          then: Yup.string().required(validationTexts.requireText)
        })
      })
    )
  }),

  data: Yup.lazy((values, ctx) => {
    const { objectType, type } = ctx.parent;

    if (!isEqual(type, FormType.NEW)) return Yup.mixed().notRequired();

    let obj: any = {};

    const requirePondedRiver = [
      FormObjectType.POND,
      FormObjectType.PONDED_LAKE
    ].includes(objectType);

    const requireRiverAndConstructionYear = [
      FormObjectType.EARTH_DAM,
      FormObjectType.HYDRO_POWER_PLANT,
      FormObjectType.FISH_PASS,
      FormObjectType.WATER_EXCESS_CULVERT
    ].includes(objectType);

    const requireType = [
      FormObjectType.HYDRO_POWER_PLANT,
      FormObjectType.FISH_PASS,
      FormObjectType.WATER_EXCESS_CULVERT
    ].includes(objectType);

    const requirePowerAndMaxPressureHeight = isEqual(
      objectType,
      FormObjectType.HYDRO_POWER_PLANT
    );

    const requireFishPassDebit = isEqual(objectType, FormObjectType.FISH_PASS);

    if (requirePondedRiver) {
      obj.pondedRiver = Yup.string().required(validationTexts.requireSelect);
    }

    if (requireType) {
      obj.type = Yup.string().required(validationTexts.requireSelect);
    }

    if (requireRiverAndConstructionYear) {
      obj.constructionYear = Yup.string().required(validationTexts.requireText);
      obj.river = Yup.string().required(validationTexts.requireSelect);
    }

    if (requireRiverAndConstructionYear) {
      obj.constructionYear = Yup.string().required(validationTexts.requireText);
      obj.river = Yup.string().required(validationTexts.requireSelect);
    }

    if (requirePowerAndMaxPressureHeight) {
      obj.maxPressureHeight = Yup.string().required(
        validationTexts.requireText
      );
      obj.power = Yup.string().required(validationTexts.requireSelect);
    }

    if (requireFishPassDebit) {
      obj.fishPassDebit = Yup.string().required(validationTexts.requireSelect);
    }

    if (!isEmpty(obj)) return Yup.object().shape(obj);

    return Yup.mixed().notRequired();
  }),

  agreeWithConditions: Yup.boolean()
    .required(validationTexts.requireSelect)
    .oneOf([true], validationTexts.requireSelect)
});

export const validateUpdateTenantUser = Yup.object().shape({
  firstName: Yup.string().required(validationTexts.requireText).nullable(),
  lastName: Yup.string().required(validationTexts.requireText).nullable(),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/^(86|\+3706)\d{7}$/, validationTexts.badPhoneFormat)
    .nullable(),
  email: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText)
});

export const validateProfileForm = Yup.object().shape({
  firstName: Yup.string()
    .required(validationTexts.requireText)
    .test("validFirstName", validationTexts.validFirstName, (values) => {
      if (/\d/.test(values || "")) return false;

      return true;
    }),
  lastName: Yup.string()
    .required(validationTexts.requireText)
    .test("validLastName", validationTexts.validLastName, (values) => {
      if (/\d/.test(values || "")) return false;

      return true;
    }),
  phone: Yup.string()
    .required(validationTexts.requireText)
    .trim()
    .matches(/(86|\+3706)\d{7}/, validationTexts.badPhoneFormat),
  email: Yup.string()
    .email(validationTexts.badEmailFormat)
    .required(validationTexts.requireText)
});

export const validateFileSizes = (files: File[]) => {
  const maxSize = 20;
  for (let i = 0; i < files.length; i++) {
    const fileSizeIntoMb = files[i].size / 1024 / 1024;
    if (fileSizeIntoMb > maxSize) {
      return false;
    }
  }

  return true;
};

export const validateFileTypes = (files: File[]) => {
  for (let i = 0; i < files.length; i++) {
    const availableType = availableMimeTypes.find(
      (type) => type === files[i].type
    );
    if (!availableType) return false;
  }
  return true;
};

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required(validationTexts.requireText)
    .email(validationTexts.badEmailFormat),
  password: Yup.string().required(validationTexts.requireText)
});

export const validateRequest = Yup.object().shape(
  {
    delivery: Yup.string().required(validationTexts.requireText).nullable(),
    purpose: Yup.string().required(validationTexts.requireText).nullable(),
    agreeWithConditions: Yup.boolean()
      .required(validationTexts.requireSelect)
      .oneOf([true], validationTexts.requireSelect),
    notifyEmail: Yup.string()
      .email(validationTexts.badEmailFormat)
      .required(validationTexts.requireText)
      .nullable(),
    objects: Yup.array()
      .when(["geom", "objects"], {
        is: (geom, objects) => {
          return isEmpty(geom) && isEmpty(objects);
        },
        then: Yup.array().min(1, validationTexts.requireSelect)
      })
      .nullable(),
    geom: Yup.object()
      .when(["geom", "objects"], {
        is: (geom, objects) => {
          return isEmpty(geom) && isEmpty(objects);
        },
        then: Yup.object().required(validationTexts.requireSelect).nullable()
      })
      .nullable()
  },
  [
    ["geom", "objects"],
    ["objects", "geom"],
    ["geom", "geom"],
    ["objects", "objects"]
  ]
);
