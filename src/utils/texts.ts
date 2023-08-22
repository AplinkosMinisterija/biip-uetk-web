import {
  DeliveryTypes,
  FishPassType,
  FormObjectType,
  FormProviderType,
  FormType,
  HistoryTypes,
  HydroPowerPlantType,
  PurposeTypes,
  RolesTypes,
  ServerErrors,
  StatusTypes,
  SubPoolTypes,
  Units,
  WaterExcessCulvertType
} from "./constants";

export const emptyStateLabels = {
  form: "Jūs neturite pateikę duomenų teikimų. Sukurkite ",
  user: "Jūs neturite Naudotojų. Sukurkite ",
  request: "Jūs neturite pateikę prašymų. Pateikite ",
  excerpt: "Jūs neturite pateikę išrašų prašymų Pateikite "
};

export const emptyStateUrlLabels = {
  form: "naują  duomenų teikimą",
  user: "naują naudotoją",
  request: "naują prašymą"
};

export const url = {
  new: "naujas",
  publicUETK: "https://uetk.biip.lt/",
  upload: "/api/public/files",
  termsAndConditions: "https://uetk.biip.lt/duomenu-teikimo-taisykles/"
};

export const subTitles = {
  dataUpdate: "Duomenų koregavimas",
  legalPerson: "Juridinis asmuo"
};

export const formFiltersLabels = {
  objectType: "Kategorija",
  createdFrom: "Sukūrimo data nuo",
  createdTo: "Sukūrimo data iki",
  status: "Būsena",
  species: "Rūšis",
  users: "Pateikė",
  type: "Tipas"
};

export const userFilterLabels = {
  firstName: "Vardas",
  lastName: "Pavardė"
};

export const usersLabels = {
  fullName: { label: "Vardas, pavardė", show: true },
  email: { label: "Elektroninis paštas", show: true },
  phone: { label: "Telefono numeris", show: true }
};

export const tenantUsersLabels = {
  fullName: { label: "Vardas, pavardė", show: true },
  email: { label: "Elektroninis paštas", show: true },
  role: { label: "Teisė", show: true }
};

export const requestLabels = {
  tableId: {
    label: "Id",
    mobileOrder: 0,
    desktopOrder: 0,
    show: true
  },
  delivery: {
    label: "Išrašo pristatymo būdas",
    mobileOrder: 1,
    desktopOrder: 1,
    show: true
  },
  purpose: {
    label: "Duomenų gavimo tikslas",
    mobileOrder: 2,
    desktopOrder: 3,
    show: true
  },
  createdAt: {
    label: "Duomenų įvedimo data",
    mobileOrder: 6,
    desktopOrder: 5,
    show: true
  },
  status: {
    label: "Būsena",
    mobileOrder: 2,
    desktopOrder: 7,
    show: true
  },
  respondedAt: {
    label: "Atsakymo data",
    mobileOrder: 8,
    desktopOrder: 8,
    show: true
  },
  generatedFile: {
    label: "",
    mobileOrder: 9,
    desktopOrder: 9,
    show: true
  }
};

export const formTableLabels = {
  name: {
    label: "Objekto Pavadinimas",
    mobileOrder: 1,
    desktopOrder: 1,
    show: true
  },
  objectType: {
    label: "Kategorija",
    mobileOrder: 3,
    desktopOrder: 2,
    show: true
  },
  type: {
    label: "Tipas",
    mobileOrder: 4,
    desktopOrder: 3,
    show: true
  },
  providedBy: {
    label: "Pateikė",
    mobileOrder: 5,
    desktopOrder: 4,
    show: true
  },
  createdAt: {
    label: "Duomenų įvedimo data",
    mobileOrder: 6,
    desktopOrder: 5,
    show: true
  },

  status: {
    label: "Būsena",
    mobileOrder: 2,
    desktopOrder: 7,
    show: true
  },
  respondedAt: {
    label: "Atsakymo data",
    mobileOrder: 8,
    desktopOrder: 8,
    show: true
  }
};

export const pageTitles = {
  request: (id: string) => `Prašymo nr. ${id}`,
  requests: "Prašymai",
  newRequest: "Naujas prašymas",
  excerpt: (id: string) => `Prašymas nr. ${id}`,
  profile: "Profilis",
  newForm: "Naujas duomenų teikimas",
  updateForm: "Atnaujinti duomenų teikimą",
  inviteTenantUser: "Pakviesti darbuotoją",
  updateTenantUser: "Atnaujinti darbuotoją",
  forms: "Duomenų teikimai",
  users: "Naudotojai",
  updateProfile: "Atnaujinti profilį",
  tenantUsers: "Įmonės darbuotojai"
};

export const menuLabels = {
  forms: "Duomenų teikimas",
  requests: "Prašymai",
  profile: "Profilis",
  tenantUsers: "Įmonės darbuotojai",
  myProfile: "MANO PASKYRA"
};
export const buttonsTitles = {
  download: "Atsisiųsti",
  or: "arba",
  forgotPassword: "Pamiršau slaptažodį",
  login: "Prisijungti",
  eLogin: "Prisijungti per el. valdžios vartus",
  fillOutRequest: "Pildyti prašymą",
  newExcerpt: "Naujas prašymas",
  inviteTenantUser: "Pakviesti darbuotoją",
  columns: "Stulpeliai",
  addNew: "+ Pridėti naują",
  newForm: "Nauja teikimo anketa",
  logout: "Atsijungti",
  newUser: "Naujas naudotojas",
  save: "Išsaugoti",
  submit: "Pateikti",
  back: "Grįžti atgal",
  generate: "Generuoti",
  approve: "Tvirtinti",
  return: "Grąžinti taisymui",
  reject: "Atmesti",
  importData: "Įkelti duomenis",
  templateFile: "Šablono failas",
  clearAll: "Išvalyti visus",
  filter: "Filtruoti",
  resetPassword: "Atstatyti slaptažodį",
  createPassword: "Nustatyti slaptažodį",
  eGates: "Prisijungti per el. valdžios vartus",
  edit: "Atnaujinti",
  view: "Peržiūrėti",
  removeTenantUser: "Pašalinti darbuotoją",
  deleteGroup: "Ištrinti grupę",
  sarasas: "Sąrašas",
  zemelapis: "Žemėlapis",
  padalintas: "Padalintas vaizdas",
  newTenant: "Nauja įmonė",
  cancel: "Atšaukti",
  delete: "Ištrinti"
};

export const formLabels = {
  selectProfile: "Pasirinkite paskyrą",
  login: "Prisijungti",
  history: "Istorija",
  tenantUserInfo: "Darbuotojo kontaktinė informacija",
  name: "Pavadinimas",
  description: "Aprašymas",
  gallery: "Galerija",
  profileUpdated: "Profilis atnaujintas",
  mainPhoto: "Pagrindinė nuotrauka",
  map: "Žemėlapis",
  photos: "Nuotraukos",
  profileInfo: "Profilio informacija",
  additionalInfo: "Papildoma informacija",
  contactInfo: "Prašymo teikėjo kontaktinė informacija",
  documents: "Dokumentai",
  infoAboutObject: "Informacija apie objektą",
  infoAboutUser: "Informacija apie naudotoją",
  selectRiverMouth: "Pažymėkite upės žiotis",
  selectCenter: "Pažymėkite centro koordinates",
  uploadFiles: "Įkelkite papildomus dokumentus",
  otherInfo: "Kita papildoma informacija",
  deregistration: "Išregistravimo pagrindas",
  cadastralObjects: "Kadastro objektai",
  avgPerennialDebit: "VIDUTINIS DAUGIAMETIS VANDENS DEBITAS",
  avgPerennialDebit95: "Vidutinis daugiametis debitas 95 %",
  maxSpringFloodDebit: "MAKSIMALUS PAVASARIO POTVYNIO VANDENS DEBITAS",
  springDebit1: "Pavasario potvynio (lietaus poplūdžio) 1 % debitas"
};
export const inputLabels = {
  generating: "Išrašas kuriamas",
  hydrostaticId: "Hidrostatinio unikalus identifikatorius",
  attribute: "Atributas",
  receiveUnverifiedData: "Gauti nepatikrintus duomenis automatiškai",
  extended: "Noriu gauti išplėstinius objektų duomenis",
  requestDeliveryType: "Išrašo pristatymo būdas",
  dataReceivingPurpose: "Duomenų gavimo tikslas",
  noData: "Nėra duomenų",
  chooseOption: "Pasirinkite",
  comment: "Komentaras",
  or: "arba",
  uploadPhotos: "Įkelti nuotraukas",
  receiveDate: "Nurodykite, kokios dienos situaciją norite gauti",
  pressToWant: "Paspauskite norėdami",
  uploadOrDragFilesHere: "įkelti arba įtempkite failus čia",
  fileTypesAndMaxSize: "PDF, PNG, JPEG, JPG (maks. 20MB)",
  profiles: "PASKYROS",
  length: "Ilgis",
  width: "Plotis",
  measurementUnits: "Matavimo vienetai",
  createdBy: "Duomenis įvedė",
  dataEnteredDate: "Duomenų įvedimo data",
  firstName: "Vardas",
  gallery: "Galerija",
  directives: "Direktyvos",
  lastName: "Pavardė",
  phone: "Telefonas",
  email: "El. pašto adresas",
  legalPersonName: "Juridinio asmens pavadinimas",
  personalCode: "Asmens kodas",
  duties: "Pareigos",
  groupUsers: "Grupės naudotojai",
  getData: "gauti duomenims",
  expirationDate: "Paskyros galiojimo terminas",
  role: "Rolė",
  password: "Slaptažodis",
  rememberMe: "Likti prisijungus",
  newPassword: "Naujas slaptažodis",
  repeatNewPassword: "Pakartokite naują slaptažodį",
  qualificationDocuments:
    "Įkelkite duomenų tikrinimo tikslą ir/ar jūsų kvalifikaciją pagrindžiančius dokumentus",
  quantity: "vnt.",
  noOptions: "Nėra pasirinkimų",
  objectType: "Objekto kategorija",
  providerType: "Duomenų teikėjo statusas objekto atžvilgiu",
  formType: "Teikiami duomenys dėl",
  objectName: "Pavadinimas",
  objects: "Objektai",
  objectNameOrCode: "Pavadinimas arba kodas",
  agreeWithConditions: "Su duomenų teikimo sąlygomis susipažinau ir sutinku.",
  providedByFullName: "Teikėjo Vardas, Pavardė / Įmonės pavadinimas",
  poolArea: "Baseino plotas",
  waterVolume: "Vandens tūris",
  waterLevelAltitude: "Vandens lygio altitudė",
  maxWaterDepth: "Maksimalus vandens gylis",
  avgWaterDepth: "Vidutinis vandens gylis",
  usefulWaterVolume: "Naudingas vandens tūris",
  distanceFromRiverMouth: "Atstumas nuo upės žiočių",
  normalPondLevelNPL: "Normaliojo patvankos lygio aukštis (NPL)",
  maxWaterDepthNPL: "Maksimalus vandens gylis esant NPL",
  avgWaterDepthNPL: "Vidutinis vandens gylis esant NPL",
  pondedRiver: "Patvenktos upės pavadinimas",
  constructionYear: "Pastatymo metai",
  river: "Upės pavadinimas",
  lake: "Tvenkinio pavadinimas",
  earthDamWidth: "Žemių užtvankos ilgis",
  earthDamLength: "Žemių užtvankos plotis",
  maxPondHeight: "Maksimalus patvankos aukštis",
  maxPondPressureHeight: "Maksimalus patvankos slėgio aukštis, m",
  pondHeight: "Patvankos aukštis",
  type: "Tipas",
  environmentalDebit: "Gamtosauginis vandens debitas",
  minDebit: "Min. vasaros – rudens laikotarpio debitas Q95%",
  maxDebit: "Maks. vandens debitas",
  qvid: "Qvid",
  q95: "Q95%",
  q1: "Q1%",
  q5: "Q5%",
  olderWaterBody: "Vyresniojo vandens telkinio pavadinimas",
  power: "Galia",
  maxPressureHeight: "Maksimalus slėgio aukštis",
  fishPassDebit: "Žuvų pralaidos debitas",
  fishPassProjectDebit: "Žuvų pralaidos projektinis debitas",
  name: "Pavadinimas",
  cadastralId: "Kadastro identifikavimo kodas",
  category: "Objekto kategorijos pavadinimas",
  subPool: "Upės pabaseinis",
  olderRiver: "Vyresnioji upė",
  mouthCenterCoordinates:
    "Žiočių centro  koordinatės LKS 94 koordinačių sistemoje, m",
  centerCoordinates:
    "Objekto centro koordinatės LKS-94 koordinačių sistemoje, m",
  olderRiverBank: "Įtekėjimo į vyresniąją upę krantas",
  inflowOrder:
    "Įtekėjimo eiliškumas upės, įtekančios į Baltijos jūrą ar Kuršių marias, atžvilgiu",
  riverLength: "Upės ilgis geografinis Lietuvos teritorijoje, km",
  avgDebitQGrid: "Vid. debitas, skaičiuotas pagal qGRID'ą, m³/s",
  otherData: "Kiti duomenys",
  surfaceArea: "Vandens paviršiaus plotas Lietuvos teritorijoje geografinis",
  lakeLength: "Ežero, tvenkinio ilgis",
  lakeSquareNumber: "Ežero kvadrato numeris",
  lakeNumberInSquare: "Ežero numeris kvadrate",
  lakeWidth: "Ežero, tvenkinio vidutinis plotis",
  bankLineLength: "Kranto linijos ilgis geografinis",
  directRiver: "Tiesioginė upė"
};

export const roleLabels = {
  [RolesTypes.ADMIN]: "Administratorius",
  [RolesTypes.USER]: "Naudotojas"
};

export const formStatusLabels = {
  [StatusTypes.CREATED]: "Pateikta",
  [StatusTypes.SUBMITTED]: "Pateikta pakartotinai",
  [StatusTypes.RETURNED]: "Grąžinta taisymui",
  [StatusTypes.REJECTED]: "Atmesta",
  [StatusTypes.APPROVED]: "Patvirtinta"
};

export const requestStatusLabels = {
  [StatusTypes.CREATED]: "Pateiktas",
  [StatusTypes.SUBMITTED]: "Pateiktas pakartotinai",
  [StatusTypes.RETURNED]: "Grąžintas taisymui",
  [StatusTypes.REJECTED]: "Atmestas",
  [StatusTypes.APPROVED]: "Patvirtintas",
  [HistoryTypes.FILE_GENERATED]: "Išrašas paruoštas"
};

export const formObjectTypeLabels = {
  [FormObjectType.CANAL]: "Kanalas",
  [FormObjectType.EARTH_DAM]: "Žemių užtvanka",
  [FormObjectType.FISH_PASS]: "Žuvų perlaida",
  [FormObjectType.HYDRO_POWER_PLANT]: "Hidroelektrinė",
  [FormObjectType.ISOLATED_WATER_BODY]:
    "Nepratekamas dirbtinis paviršinis vandens telkinys",
  [FormObjectType.NATURAL_LAKE]: "Natūralus ežeras",
  [FormObjectType.POND]: "Tvenkinys",
  [FormObjectType.PONDED_LAKE]: "Patvenktas ežeras",
  [FormObjectType.RIVER]: "Upė",
  [FormObjectType.WATER_EXCESS_CULVERT]: "Vandens pertekliaus pralaida"
};

export const formObjectLabelsToType = {
  Kanalas: FormObjectType.CANAL,
  "Žemių užtvanka": FormObjectType.EARTH_DAM,
  "Žuvų perlaida": FormObjectType.FISH_PASS,
  Hidroelektrinė: FormObjectType.HYDRO_POWER_PLANT,
  "Nepratekamas dirbtinis paviršinis vandens telkinys":
    FormObjectType.ISOLATED_WATER_BODY,
  "Natūralus ežeras": FormObjectType.NATURAL_LAKE,
  Tvenkinys: FormObjectType.POND,
  "Patvenktas ežeras": FormObjectType.PONDED_LAKE,
  Upė: FormObjectType.RIVER,
  "Vandens pertekliaus pralaida": FormObjectType.WATER_EXCESS_CULVERT
};

export const waterExcessCulvertTypeLabels = {
  [WaterExcessCulvertType.TUBULAR]: "Vamzdinė",
  [WaterExcessCulvertType.SLUICE_REGULATOR]: "Šliuzas reguliatorius",
  [WaterExcessCulvertType.TOP_STREAM]: "Greitvietė",
  [WaterExcessCulvertType.TOWER]: "Bokštinė",
  [WaterExcessCulvertType.THRESHOLD_WITHOUT_CLOSURES]: "Slenkstinė be uždorių",
  [WaterExcessCulvertType.THRESHOLD_WITH_CLOSURES]: "Slenkstinė su uždorių",
  [WaterExcessCulvertType.SIPHON]: "Sifoninė",
  [WaterExcessCulvertType.SHAFT]: "Šachtinė",
  [WaterExcessCulvertType.OTHER]: "Kita"
};

export const fishPassTypeLabels = {
  [FishPassType.POOLS]: "Baseinai",
  [FishPassType.DENIL]: "DENIL",
  [FishPassType.SLUICE]: "Šliuzas",
  [FishPassType.ELEVATOR]: "Liftas",
  [FishPassType.BYPASS_CANAL]: "Apvedimo kanalas",
  [FishPassType.OTHER]: "Kita"
};

export const hydroPowerPlantTypeLabels = {
  [HydroPowerPlantType.DAM]: "Prieužtvakinė",
  [HydroPowerPlantType.DERIVATIVE]: "Derivacinė",
  [HydroPowerPlantType.FURROWS]: "Vagos",
  [HydroPowerPlantType.OTHER]: "Kita"
};

export const formProviderTypeLabels = {
  [FormProviderType.MANAGER]: "Valdytojas",
  [FormProviderType.OWNER]: "Savininkas",
  [FormProviderType.OTHER]: "Kitas asmuo"
};

export const formTypeLabels = {
  [FormType.NEW]: "Įregistravimo",
  [FormType.EDIT]: "Redagavimo",
  [FormType.REMOVE]: "Išregistravimo"
};

export const validationTexts = {
  formFillError: "Neteisingai užpildyta forma",
  requireMap: "Privalote pasirinkti vietą žemėlapyje",
  requirePhotos: "Privalote įkelti nuotrauką",
  requireSpeciesType: "Privalote pasirinkti bent vieną rūšių tipą",
  requireText: "Privalomas laukelis",
  requireSelect: "Privalote pasirinkti",
  badEmailFormat: "Blogas el. pašto adresas",
  badPhoneFormat: "Blogai įvestas telefono numeris",
  tooFrequentRequest: "Nepavyko, per dažna užklausa prašome pabandyti veliau ",
  [ServerErrors.ENTITY_NOT_FOUND]:
    "Blogas elektroninis paštas arba slaptažodis",
  [ServerErrors.USER_NOT_FOUND]: "Naudotojo su tokiu el. paštu nėra",
  passwordsDoNotMatch: "Slaptažodžiai nesutampa",
  error: "Įvyko nenumatyta klaida, prašome pabandyti vėliau",
  validFirstName: "Įveskite taisyklingą vardą",
  validLastName: "Įveskite taisyklingą pavardę",
  badFileTypes: "Blogi failų tipai",
  fileSizesExceeded: "Viršyti failų dydžiai",
  personalCode: "Neteisingas asmens kodo formatas",
  positiveNumber: "Reikšmė turi būti didesnė už nulį",
  requireFiles: "Privalote įkelti dokumentus",
  atLeastOneColumn: "Turi būti pasirinktas bent vienas stulpelis"
};

export const descriptions = {
  getDataAboutPlaces:
    "Norėdami matyti tikslų radaviečių žemėlapį, pateikite prašymą gauti duomenis.",
  getMoreDataAboutPlaces:
    "Norėdami matyti daugiau radaviečių žemėlapyje, pateikite prašymą gauti duomenis.",
  mainDescription:
    "Elektroninių paslaugų sistema teikianti ir gaunanti duomenis bei informaciją apie vandens telkinius.",
  forgotPasswordDescription:
    "Jeigu pamiršote slaptažodį, įrašykite savo el. pašto adresą ir mes padėsime jį atkurti",
  instructionSentDescription:
    "Jūsų nurodytu el. paštu išsiuntėme prisijungimo instrukciją",
  biipDescription: "Biologinės įvairovės informacinė platforma",
  passwordChangedDescription:
    "Jūsų slaptažodis sėkmingai pakeistas. Galite prisijungti prie paskyros",
  passwordCreatedDescription:
    "Jūsų slaptažodis sėkmingai sukurtas. Galite prisijungti prie paskyros",
  resetPasswordDescription:
    "Naujas slaptažodis neturi sutapti su senuoju slaptažodžiu",
  tableNotFound: "Atsiprašome nieko neradome pagal pasirinktus filtrus",
  footerTitle: "© Lietuvos Respublikos aplinkos ministerija, 2013-2022",
  footerDescription:
    "Duomenys apie įmonę kaupiami ir saugomi Juridinių asmenų registre. Įmonės kodas: 188602370 | Adresas: A. Jakšto g. 4, 01105 Vilnius Telefonas: 8 706 63661 | El. paštas: info@am.lt"
};

export const deleteTitles = {
  tenantUser: "Pašalinti darbuotoją"
};

export const deleteDescriptionFirstPart = {
  tenantUser: "Ar esate tikri, kad norite pašalinti ",
  request: "Ar esate tikri, kad norite ištrinti "
};

export const deleteDescriptionSecondPart = {
  tenantUser: " darbuotoją?"
};
export const queryStrings = {
  draw: "?basemap_selector=true&draw_edit_prop=true&draw_geom=[Point]&draw=true&draw_panel=true&autosave=true"
};

export const shortMeasurementUnitsLabels = {
  [Units.CENTIMETER]: "cm",
  [Units.METER]: "m",
  [Units.KILOWATT]: "KW",
  [Units.HECTARES]: "ha",
  [Units.KILOMETER]: "km",
  [Units.THOUSANDS_PER_METER]: "tūkst. m",
  [Units.SQUARE_METER]: "m2"
};

export const formHistoryLabels = {
  [HistoryTypes.CREATED]: "Pateikta",
  [HistoryTypes.UPDATED]: "Pateikta pakartotinai",
  [HistoryTypes.REJECTED]: "Atmesta",
  [HistoryTypes.RETURNED]: "Grąžinta taisyti",
  [HistoryTypes.APPROVED]: "Priimta",
  [HistoryTypes.DELETED]: "Ištrinta"
};

export const deliveryTypeLabels = {
  [DeliveryTypes.EMAIL]: "El. paštu",
  [DeliveryTypes.REGULAR_MAIL]: "Įprastiniu paštu",
  [DeliveryTypes.WITHDRAW]: "Atsiimti"
};

export const purposeTypeLabels = {
  [PurposeTypes.TERRITORIAL_PLANNING_DOCUMENT]:
    "Teritorijų planavimo dokumentui",
  [PurposeTypes.TECHNICAL_PROJECT]: "Techniniam projektui",
  [PurposeTypes.SCIENTIFIC_INVESTIGATION]: "Moksliniam tyrimui",
  [PurposeTypes.OTHER]: "Kiti tikslai"
};

export const subPoolTypeLabels = {
  [SubPoolTypes.LT1100]: "Nemuno mažųjų intakų (su Nemunu) upių pabaseinis",
  [SubPoolTypes.LT1111]: "Merkio upės pabaseinis",
  [SubPoolTypes.LT1120]: "Neries mažųjų intakų (su Nerimi) upių pabaseinis ",
  [SubPoolTypes.LT1121]: "Žeimenos upės pabaseinis",
  [SubPoolTypes.LT1122]: "Šventosios upės pabaseinis",
  [SubPoolTypes.LT1130]: "Nevėžio upės pabaseinis",
  [SubPoolTypes.LT1140]: "Dubysos upės pabaseinis",
  [SubPoolTypes.LT1150]: "Šešupės upės pabaseinis",
  [SubPoolTypes.LT1160]: "Jūros upės pabaseinis",
  [SubPoolTypes.LT1170]: "Minijos upės pabaseinis",
  [SubPoolTypes.LT3400]: "Lielupės upės mažųjų intakų pabaseinis",
  [SubPoolTypes.LT3410]: "Mūšos upės pabaseinis",
  [SubPoolTypes.LT3420]: "Nemunėlio upės pabaseinis"
};
