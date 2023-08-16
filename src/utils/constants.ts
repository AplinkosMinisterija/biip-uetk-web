export enum FormObjectType {
  RIVER = "RIVER",
  CANAL = "CANAL",
  INTERMEDIATE_WATER_BODY = "INTERMEDIATE_WATER_BODY",
  TERRITORIAL_WATER_BODY = "TERRITORIAL_WATER_BODY",
  NATURAL_LAKE = "NATURAL_LAKE",
  PONDED_LAKE = "PONDED_LAKE",
  POND = "POND",
  ISOLATED_WATER_BODY = "ISOLATED_WATER_BODY",
  EARTH_DAM = "EARTH_DAM",
  WATER_EXCESS_CULVERT = "WATER_EXCESS_CULVERT",
  HYDRO_POWER_PLANT = "HYDRO_POWER_PLANT",
  FISH_PASS = "FISH_PASS"
}

export enum WaterExcessCulvertType {
  TUBULAR = "TUBULAR",
  SLUICE_REGULATOR = "SLUICE_REGULATOR",
  TOP_STREAM = "TOP_STREAM",
  TOWER = "TOWER",
  THRESHOLD_WITHOUT_CLOSURES = "THRESHOLD_WITHOUT_CLOSURES",
  THRESHOLD_WITH_CLOSURES = "THRESHOLD_WITH_CLOSURES",
  SIPHON = "SIPHON",
  SHAFT = "SHAFT",
  OTHER = "OTHER"
}

export enum FishPassType {
  POOLS = "POOLS",
  DENIL = "DENIL",
  SLUICE = "SLUICE",
  ELEVATOR = "ELEVATOR",
  BYPASS_CANAL = "BYPASS_CANAL",
  OTHER = "OTHER"
}

export enum HydroPowerPlantType {
  DAM = "DAM",
  DERIVATIVE = "DERIVATIVE",
  FURROWS = "FURROWS",
  OTHER = "OTHER"
}

export enum FormType {
  NEW = "NEW",
  EDIT = "EDIT",
  REMOVE = "REMOVE"
}

export enum FormProviderType {
  OWNER = "OWNER",
  OTHER = "OTHER",
  MANAGER = "MANAGER"
}

export enum HistoryTypes {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  REJECTED = "REJECTED",
  FILE_GENERATED = "FILE_GENERATED",
  RETURNED = "RETURNED",
  APPROVED = "APPROVED",
  DELETED = "DELETED"
}

export enum StatusTypes {
  CREATED = "CREATED",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  RETURNED = "RETURNED",
  REJECTED = "REJECTED"
}

export enum RolesTypes {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum ServerErrors {
  USER_NOT_FOUND = `Email not found.`,
  WRONG_PASSWORD = "Wrong password.",
  ENTITY_NOT_FOUND = "ENTITY_NOT_FOUND",
  USER_EXIST = "User already exists.",
  WRONG_OLD_PASSWORD = "Wrong old password.",
  PARAMETERS_VALIDATION_ERROR = "Parameters validation error!",
  NOT_FOUND = "Not found."
}
export enum Resources {
  LOGIN = "auth/login",
  CAN_EDIT = "canEdit",
  MAPS_AUTH = "maps/auth",
  GEOM = "geom",
  REFRESH_TOKEN = "auth/refresh",
  VERIFY_USER = "auth/change/verify",
  REMIND_PASSWORD = "auth/remind",
  E_GATES_LOGIN = "auth/evartai/login",
  E_GATES_SIGN = "auth/evartai/sign",
  USERS = "users",
  FORMS = "forms",
  MY_FORMS = "forms/my",
  HISTORY = "history",
  CREATED_BY = "createdBy",
  REQUESTS = "requests",
  MY_REQUESTS = "requests/my",
  DELETED_REQUESTS = "requests/deleted",
  UPLOAD = "upload",
  SEARCH = "search"
}

export enum Populations {
  SOURCE = "source",
  ROLE = "role",
  CAN_EDIT = "canEdit",
  OBJECTS = "objects"
}

export enum SortFields {
  CREATED_AT = "-createdAt",
  LAST_NAME = "lastName",
  NAME = "name"
}

export enum TagColors {
  BLUE = "blue",
  BROWN = "brown",
  GREEN = "green",
  PINK = "pink",
  VIOLET = "violet",
  ORANGE = "orange",
  SKYBLUE = "skyblue",
  GREY = "grey"
}

export const colorsByStatus = {
  [StatusTypes.CREATED]: TagColors.SKYBLUE,
  [StatusTypes.SUBMITTED]: TagColors.VIOLET,
  [StatusTypes.APPROVED]: TagColors.GREEN,
  [StatusTypes.RETURNED]: TagColors.BLUE,
  [StatusTypes.REJECTED]: TagColors.PINK
};

const mapsHost = process.env.REACT_APP_MAPS_HOST || "https://maps.biip.lt";
export const Url = {
  DRAW: `${mapsHost}/edit`,
  UETK: `${mapsHost}/uetk`
};

export enum Units {
  CENTIMETER = "CENTIMETER",
  METER = "METER",
  KILOWATT = "KILOWATT",
  KILOMETER = "KILOMETER",
  THOUSANDS_PER_METER = "THOUSANDS_PER_METER",
  HECTARES = "HECTARES",
  CUBIC_METER = "CUBIC_METER",
  SQUARE_METER = "SQUARE_METER"
}

export enum TableItemWidth {
  MEDIUM = "76px",
  SMALL = "40px",
  LARGE = "30px"
}

export const subPoolOptions = [
  {
    code: "LT1100",
    label: "Nemuno mažųjų intakų (su Nemunu) upių pabaseinis"
  },
  {
    code: "LT1111",
    label: "Merkio upės pabaseinis"
  },
  {
    code: "LT1120",
    label: "Neries mažųjų intakų (su Nerimi) upių pabaseinis "
  },
  {
    code: "LT1121",
    label: "Žeimenos upės pabaseinis"
  },
  {
    code: "LT1122",
    label: "Šventosios upės pabaseinis"
  },
  {
    code: "LT1130",
    label: "Nevėžio upės pabaseinis"
  },
  {
    code: "LT1140",
    label: "Dubysos upės pabaseinis"
  },
  {
    code: "LT1150",
    label: "Šešupės upės pabaseinis"
  },
  {
    code: "LT1160",
    label: "Jūros upės pabaseinis"
  },
  {
    code: "LT1170",
    label: "Minijos upės pabaseinis "
  },
  {
    code: "LT3400",
    label: "Lielupės upės mažųjų intakų pabaseinis "
  },
  {
    code: "LT3410",
    label: "Mūšos upės pabaseinis"
  },
  {
    code: "LT3420",
    label: "Nemunėlio upės pabaseinis"
  }
];

export enum FormDataFields {
  poolArea = "poolArea",
  waterVolume = "waterVolume",
  waterLevelAltitude = "waterLevelAltitude",
  maxWaterDepth = "maxWaterDepth",
  avgWaterDepth = "avgWaterDepth",
  maxWaterDepthNPL = "maxWaterDepthNPL",
  avgWaterDepthNPL = "avgWaterDepthNPL",
  usefulWaterVolume = "usefulWaterVolume",
  distanceFromRiverMouth = "distanceFromRiverMouth",
  pondedRiver = "pondedRiver",
  pondHeight = "pondHeight",
  maxPondHeight = "maxPondHeight",
  normalPondLevelNPL = "normalPondLevelNPL",
  constructionYear = "constructionYear",
  olderWaterBody = "olderWaterBody",
  earthDamWidth = "earthDamWidth",
  earthDamLength = "earthDamLength",
  river = "river",
  lake = "lake",
  environmentalDebit = "environmentalDebit",
  fishPassDebit = "fishPassDebit",
  minDebit = "minDebit",
  maxDebit = "maxDebit",
  qvid = "qvid",
  q95 = "q95",
  q1 = "q1",
  q5 = "q5",
  type = "type",
  power = "power",
  maxPressureHeight = "maxPressureHeight",
  name = "name",
  cadastralId = "cadastralId",
  category = "category",
  subPool = "subPool",
  olderRiver = "olderRiver",
  mouthCenterCoordinates = "mouthCenterCoordinates",
  olderRiverBank = "olderRiverBank",
  inflowOrder = "inflowOrder",
  riverLength = "riverLength",
  avgDebitQGrid = "avgDebitQGrid",
  otherData = "otherData",
  centerCoordinates = "centerCoordinates",
  surfaceArea = "surfaceArea",
  lakeLength = "lakeLength",
  lakeSquareNumber = "lakeSquareNumber",
  lakeNumberInSquare = "lakeNumberInSquare",
  lakeWidth = "lakeWidth",
  bankLineLength = "bankLineLength",
  directRiver = "directRiver",
  avgPerennialDebit95 = "avgPerennialDebit95",
  maxPondPressureHeight = "maxPondPressureHeight",
  hydrostaticId = "hydrostaticId",
  fishPassProjectDebit = "fishPassProjectDebit"
}

export enum ServerErrorCodes {
  NOT_FOUND = "404",
  NO_PERMISSION = "401"
}

export enum DeliveryTypes {
  EMAIL = "EMAIL",
  REGULAR_MAIL = "REGULAR_MAIL",
  WITHDRAW = "WITHDRAW"
}

export enum PurposeTypes {
  TERRITORIAL_PLANNING_DOCUMENT = "TERRITORIAL_PLANNING_DOCUMENT",
  TECHNICAL_PROJECT = "TECHNICAL_PROJECT",
  SCIENTIFIC_INVESTIGATION = "SCIENTIFIC_INVESTIGATION",
  OTHER = "OTHER"
}
