import { FieldArray } from "formik";
import { isEmpty, isEqual } from "lodash";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { default as api, default as Api } from "../api";
import ButtonsGroup from "../components/buttons/ButtonsGroup";
import SingleCheckBox from "../components/buttons/CheckBox";
import SimpleButton from "../components/buttons/SimpleButton";
import FormHistoryContainer from "../components/containers/FormHistoryContainer";
import SimpleContainer from "../components/containers/SimpleContainer";
import AsyncSelectField from "../components/fields/AsyncSelect";
import DragAndDropUploadField from "../components/fields/DragAndDropUploadField";
import NumericTextField from "../components/fields/NumericTextField";
import SelectField from "../components/fields/SelectField";
import TextAreaField from "../components/fields/TextAreaField";
import TextField from "../components/fields/TextField";
import Map from "../components/map/DrawMap";
import Icon from "../components/other/Icons";
import LoaderComponent from "../components/other/LoaderComponent";
import {
  CubicMeterPerSecond,
  Hectares,
  Kilometer,
  Kilowatt,
  Meter,
  SquareMeter,
  ThousandsPerCubicMeter
} from "../components/other/MeasurmentUnits";
import TermsAndConditions from "../components/other/TermsAndConditions";
import FormPageWrapper from "../components/wrappers/FormikFormPageWrapper";
import { device } from "../styles";
import {
  ColumnOne,
  ColumnTwo,
  Container
} from "../styles/GenericStyledComponents";
import { Form } from "../types";
import {
  FishPassType,
  FormDataFields,
  FormObjectType,
  FormProviderType,
  FormType,
  HydroPowerPlantType,
  Resources,
  WaterExcessCulvertType
} from "../utils/constants";
import {
  formObjectTypes,
  formProviderTypes,
  getLocationList,
  handleAlert,
  isMapEditAttribute,
  isNew,
  subPoolTypes
} from "../utils/functions";
import { slugs } from "../utils/routes";
import {
  buttonsTitles,
  fishPassTypeLabels,
  formHistoryLabels,
  formLabels,
  formObjectTypeLabels,
  formProviderTypeLabels,
  formTypeLabels,
  hydroPowerPlantTypeLabels,
  inputLabels,
  pageTitles,
  subPoolTypeLabels,
  waterExcessCulvertTypeLabels
} from "../utils/texts";
import { validateForm } from "../utils/validation";

type FormPayload = Omit<Form, "editFields">;
const FormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: form, isLoading } = useQuery(
    ["form", id],
    () => api.form(id!),
    {
      onError: () => {
        navigate(slugs.forms);
      },
      enabled: !isNew(id)
    }
  );

  const disabled = !isNew(id) && !form?.canEdit;
  const getMapQueryString = (disabled = false) => {
    const queryString = `?`;
    const param = new URLSearchParams();

    if (disabled) {
      param.append("preview", "true");
      return queryString + param;
    }
    param.append("types[]", "point");
    param.append("buffer", "true");
    return queryString + param;
  };

  const mapQueryString = getMapQueryString(disabled);
  const title = isNew(id) ? pageTitles.newForm : pageTitles.updateForm;

  const typeOptions = {
    [FormObjectType.WATER_EXCESS_CULVERT]: Object.keys(WaterExcessCulvertType),
    [FormObjectType.HYDRO_POWER_PLANT]: Object.keys(HydroPowerPlantType),
    [FormObjectType.FISH_PASS]: Object.keys(FishPassType)
  };
  const typeLabels = {
    [FormObjectType.WATER_EXCESS_CULVERT]: waterExcessCulvertTypeLabels,
    [FormObjectType.HYDRO_POWER_PLANT]: hydroPowerPlantTypeLabels,
    [FormObjectType.FISH_PASS]: fishPassTypeLabels
  };

  const createForm = useMutation(
    (values: FormPayload) => api.createForm(values),
    {
      onError: () => {
        handleAlert();
      },
      onSuccess: () => {
        navigate(slugs.forms);
      },
      retry: false
    }
  );

  const updateForm = useMutation(
    (values: FormPayload) => api.updateForm(id!, values),
    {
      onError: () => {
        handleAlert();
      },
      onSuccess: () => {
        navigate(slugs.forms);
      },
      retry: false
    }
  );

  const handleSubmit = async (values: Form) => {
    const { editFields, ...rest } = values;

    const data: { [key in FormDataFields]?: string } | any =
      values.type === FormType.EDIT
        ? editFields?.reduce((obj, curr) => {
            obj[curr?.attribute!] = curr.value;
            return obj;
          }, {})
        : values.data;

    const params: FormPayload = { ...rest, data };

    if (isNew(id)) {
      return await createForm.mutateAsync(params);
    }

    return await updateForm.mutateAsync(params);
  };

  const fields = {
    poolArea: (value, error, handleChange, showError = true) => (
      <NumericTextField
        label={inputLabels.poolArea}
        showError={showError}
        value={value}
        error={error}
        name="poolArea"
        onChange={(value) => handleChange(value)}
        rightIcon={<SquareMeter />}
        disabled={disabled}
      />
    ),
    waterVolume: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.waterVolume}
        value={value}
        error={error}
        name="waterVolume"
        onChange={(value) => handleChange(value)}
        rightIcon={<ThousandsPerCubicMeter />}
        disabled={disabled}
      />
    ),

    waterLevelAltitude: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.waterLevelAltitude}
        value={value}
        error={error}
        name="waterLevelAltitude"
        onChange={(value) => handleChange(value)}
        rightIcon={<Meter />}
        disabled={disabled}
      />
    ),
    maxWaterDepth: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.maxWaterDepth}
        value={value}
        error={error}
        name="maxWaterDepth"
        onChange={(value) => handleChange(value)}
        rightIcon={<Meter />}
        disabled={disabled}
      />
    ),
    avgWaterDepth: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.avgWaterDepth}
        value={value}
        error={error}
        name="avgWaterDepth"
        onChange={(value) => handleChange(value)}
        rightIcon={<Meter />}
        disabled={disabled}
      />
    ),
    maxWaterDepthNPL: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.maxWaterDepthNPL}
        value={value}
        error={error}
        name="maxWaterDepthNPL"
        onChange={(value) => handleChange(value)}
        rightIcon={<Meter />}
        disabled={disabled}
      />
    ),
    avgWaterDepthNPL: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.avgWaterDepthNPL}
        value={value}
        error={error}
        name="avgWaterDepthNPL"
        onChange={(value) => handleChange(value)}
        rightIcon={<Meter />}
        disabled={disabled}
      />
    ),
    usefulWaterVolume: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.usefulWaterVolume}
        value={value}
        error={error}
        name="usefulWaterVolume"
        onChange={(value) => handleChange(value)}
        rightIcon={<ThousandsPerCubicMeter />}
        disabled={disabled}
      />
    ),
    distanceFromRiverMouth: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.distanceFromRiverMouth}
        value={value}
        error={error}
        name="distanceFromRiverMouth"
        onChange={(value) => handleChange(value)}
        rightIcon={<Kilometer />}
        disabled={disabled}
      />
    ),
    pondHeight: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.pondHeight}
        value={value}
        error={error}
        name="pondHeight"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    maxPondHeight: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.maxPondHeight}
        value={value}
        error={error}
        name="maxPondHeight"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    normalPondLevelNPL: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.normalPondLevelNPL}
        value={value}
        error={error}
        name="normalPondLevelNPL"
        onChange={(value) => handleChange(value)}
        rightIcon={<Meter />}
        disabled={disabled}
      />
    ),
    constructionYear: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.constructionYear}
        value={value}
        error={error}
        name="constructionYear"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    earthDamWidth: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.earthDamWidth}
        value={value}
        error={error}
        name="earthDamWidth"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    earthDamLength: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.earthDamLength}
        value={value}
        error={error}
        name="earthDamLength"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    environmentalDebit: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.environmentalDebit}
        value={value}
        error={error}
        name="environmentalDebit"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    fishPassDebit: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.fishPassDebit}
        value={value}
        error={error}
        name="fishPassDebit"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),
    fishPassProjectDebit: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.fishPassProjectDebit}
        value={value}
        error={error}
        name="fishPassProjectDebit"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),
    minDebit: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.minDebit}
        value={value}
        error={error}
        bottomLabel="30 sausiausių parų"
        name="minDebit"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),

    maxDebit: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.maxDebit}
        value={value}
        error={error}
        name="maxDebit"
        bottomLabel="Esant maks.(skaičiuotinai) debito tikimybei"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),
    qvid: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.qvid}
        value={value}
        error={error}
        name="qvid"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),
    q95: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.q95}
        value={value}
        error={error}
        name="q95"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),
    q1: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.q1}
        value={value}
        error={error}
        name="q1"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),
    q5: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.q5}
        value={value}
        error={error}
        name="q5"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),
    avgPerennialDebit95: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={formLabels.avgPerennialDebit95}
        value={value}
        error={error}
        name="avgPerennialDebit95"
        onChange={(value) => handleChange(value)}
        rightIcon={<CubicMeterPerSecond />}
        disabled={disabled}
      />
    ),
    power: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.power}
        value={value}
        wholeNumber={true}
        error={error}
        name="power"
        onChange={(value) => handleChange(value)}
        rightIcon={<Kilowatt />}
        disabled={disabled}
      />
    ),
    maxPressureHeight: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.maxPressureHeight}
        value={value}
        error={error}
        name="maxPressureHeight"
        onChange={(value) => handleChange(value)}
        rightIcon={<Meter />}
        disabled={disabled}
      />
    ),
    maxPondPressureHeight: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.maxPondPressureHeight}
        value={value}
        error={error}
        name="maxPondPressureHeight"
        onChange={(value) => handleChange(value)}
        rightIcon={<Meter />}
        disabled={disabled}
      />
    ),

    type: (value, error, handleChange, showError = true, options, labels) => (
      <SelectField
        showError={showError}
        label={inputLabels.type}
        value={value}
        error={error}
        name="type"
        options={options}
        onChange={(value) => handleChange(value)}
        getOptionLabel={(option) => labels[option]}
        disabled={disabled}
      />
    ),
    pondedRiver: (value, error, handleChange, showError = true) => (
      <RenderWaterBodyField
        showError={showError}
        label={inputLabels.pondedRiver}
        value={value}
        error={error}
        handleChange={handleChange}
      />
    ),
    olderWaterBody: (value, error, handleChange, showError = true) => (
      <RenderWaterBodyField
        showError={showError}
        label={inputLabels.olderWaterBody}
        value={value}
        error={error}
        handleChange={handleChange}
      />
    ),
    river: (value, error, handleChange, showError = true) => (
      <RenderWaterBodyField
        showError={showError}
        label={inputLabels.river}
        value={value}
        error={error}
        handleChange={handleChange}
      />
    ),
    lake: (value, error, handleChange, showError = true) => (
      <RenderWaterBodyField
        showError={showError}
        label={inputLabels.lake}
        value={value}
        error={error}
        handleChange={handleChange}
      />
    ),
    riverLength: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.riverLength}
        value={value}
        error={error}
        name="riverLength"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    name: (value, error, handleChange, showError = true) => (
      <TextField
        showError={showError}
        label={inputLabels.name}
        value={value}
        error={error}
        name="name"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    cadastralId: (value, error, handleChange, showError = true) => (
      <TextField
        showError={showError}
        label={inputLabels.cadastralId}
        value={value}
        error={error}
        name="cadastralId"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    hydrostaticId: (value, error, handleChange, showError = true) => (
      <TextField
        showError={showError}
        label={inputLabels.hydrostaticId}
        value={value}
        error={error}
        name="hydrostaticId"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    inflowOrder: (value, error, handleChange, showError = true) => (
      <TextField
        showError={showError}
        label={inputLabels.inflowOrder}
        value={value}
        error={error}
        name="inflowOrder"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    otherData: (value, error, handleChange, showError = true) => (
      <TextField
        showError={showError}
        label={inputLabels.otherData}
        value={value}
        error={error}
        name="otherData"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    avgDebitQGrid: (value, error, handleChange, showError = true) => (
      <TextField
        showError={showError}
        label={inputLabels.avgDebitQGrid}
        value={value}
        error={error}
        name="avgDebitQGrid"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    subPool: (value, error, handleChange, showError = true) => (
      <SelectField
        showError={showError}
        label={inputLabels.subPool}
        value={value}
        error={error}
        name="subPool"
        options={subPoolTypes}
        onChange={(value) => handleChange(value)}
        getOptionLabel={(option) => subPoolTypeLabels[option]}
        disabled={disabled}
      />
    ),
    category: (value, error, handleChange, showError = true) => (
      <SelectField
        showError={showError}
        label={inputLabels.category}
        value={value}
        options={formObjectTypes}
        getOptionLabel={(option) => formObjectTypeLabels[option]}
        error={error}
        name="category"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    olderRiverBank: (value, error, handleChange, showError = true) => (
      <TextField
        showError={showError}
        label={inputLabels.olderRiverBank}
        value={value}
        error={error}
        name="olderRiverBank"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    olderRiver: (value, error, handleChange, showError = true) => (
      <RenderWaterBodyField
        showError={showError}
        label={inputLabels.olderRiver}
        value={value}
        error={error}
        handleChange={handleChange}
      />
    ),
    surfaceArea: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.surfaceArea}
        value={value}
        error={error}
        name="surfaceArea"
        onChange={(value) => handleChange(value)}
        rightIcon={<Hectares />}
        disabled={disabled}
      />
    ),
    lakeLength: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.lakeLength}
        value={value}
        error={error}
        name="lakeLength"
        onChange={(value) => handleChange(value)}
        rightIcon={<Kilometer />}
        disabled={disabled}
      />
    ),
    lakeNumberInSquare: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.lakeNumberInSquare}
        value={value}
        error={error}
        name="lakeNumberInSquare"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    lakeSquareNumber: (value, error, handleChange, showError = true) => (
      <NumericTextField
        showError={showError}
        label={inputLabels.lakeSquareNumber}
        value={value}
        error={error}
        name="lakeSquareNumber"
        onChange={(value) => handleChange(value)}
        disabled={disabled}
      />
    ),
    lakeWidth: (value, error, handleChange, showError = true) => (
      <NumericTextField
        label={inputLabels.lakeWidth}
        showError={showError}
        value={value}
        error={error}
        name="lakeWidth"
        onChange={(value) => handleChange(value)}
        rightIcon={<Kilometer />}
        disabled={disabled}
      />
    ),
    bankLineLength: (value, error, handleChange, showError = true) => (
      <NumericTextField
        label={inputLabels.bankLineLength}
        showError={showError}
        value={value}
        error={error}
        name="bankLineLength"
        onChange={(value) => handleChange(value)}
        rightIcon={<Kilometer />}
        disabled={disabled}
      />
    ),
    directRiver: (value, error, handleChange, showError = true) => (
      <RenderWaterBodyField
        label={inputLabels.directRiver}
        showError={showError}
        value={value}
        error={error}
        handleChange={handleChange}
      />
    )
  };

  const RenderWaterBodyField = ({
    value,
    error,
    handleChange,
    showError,
    label
  }) => {
    return (
      <AsyncSelectField
        label={label}
        disabled={disabled}
        showError={showError}
        value={value}
        error={error}
        onChange={(value) =>
          handleChange(
            `${value?.name}, ${value?.cadastralId}, ${value?.categoryTranslate}`
          )
        }
        getOptionValue={(option) => option?.cadastralId}
        getInputLabel={(option) => option}
        getOptionLabel={(option) => {
          const { name, cadastralId, categoryTranslate } = option;
          return `${name}, ${cadastralId}, ${categoryTranslate}`;
        }}
        loadOptions={(input: string, page: number | string) =>
          getLocationList(input, page)
        }
      />
    );
  };

  const renderAdditionalFields = (
    values: Form,
    errors: any,
    handleChange: any
  ) => {
    const { data } = values;

    const options = typeOptions[values?.objectType!];
    const labels = typeLabels[values?.objectType!];

    const components: any = [];
    const isNaturalLakeOrPondFields = [
      FormObjectType.POND,
      FormObjectType.PONDED_LAKE
    ].includes(values?.objectType!);

    const hasPoolAreaWaterVolumeFields = [
      FormObjectType.NATURAL_LAKE,
      FormObjectType.PONDED_LAKE,
      FormObjectType.POND
    ].includes(values?.objectType!);

    if (hasPoolAreaWaterVolumeFields) {
      components.push(
        <Row>
          {fields.poolArea(data?.poolArea, errors?.data?.poolArea, (value) =>
            handleChange("data.poolArea", value)
          )}
          {fields.waterVolume(
            data?.waterVolume,
            errors?.data?.waterVolume,
            (value) => handleChange("data.waterVolume", value)
          )}
        </Row>
      );
    }

    if (isEqual(values.objectType, FormObjectType.NATURAL_LAKE)) {
      components.push(
        <Row repeat={3}>
          {fields.waterLevelAltitude(
            data?.waterLevelAltitude,
            errors?.data?.waterLevelAltitude,
            (value) => handleChange("data.waterLevelAltitude", value)
          )}
          {fields.maxWaterDepth(
            data?.maxWaterDepth,
            errors?.data?.maxWaterDepth,
            (value) => handleChange("data.maxWaterDepth", value)
          )}
          {fields.avgWaterDepth(
            data?.avgWaterDepth,
            errors?.data?.avgWaterDepth,
            (value) => handleChange("data.avgWaterDepth", value)
          )}
        </Row>
      );
    }

    if (isNaturalLakeOrPondFields) {
      components.push(
        <>
          <Row repeat={3}>
            {fields.usefulWaterVolume(
              data?.usefulWaterVolume,
              errors?.data?.usefulWaterVolume,
              (value) => handleChange("data.usefulWaterVolume", value)
            )}
            {fields.distanceFromRiverMouth(
              data?.distanceFromRiverMouth,
              errors?.data?.distanceFromRiverMouth,
              (value) => handleChange("data.distanceFromRiverMouth", value)
            )}
            {fields.normalPondLevelNPL(
              data?.avgWaterDepth,
              errors?.data?.avgWaterDepth,
              (value) => handleChange("data.avgWaterDepth", value)
            )}
          </Row>
          <Row>
            {fields.maxWaterDepthNPL(
              data?.maxWaterDepthNPL,
              errors?.data?.maxWaterDepthNPL,
              (value) => handleChange("data.maxWaterDepthNPL", value)
            )}
            {fields.avgWaterDepthNPL(
              data?.avgWaterDepthNPL,
              errors?.data?.avgWaterDepthNPL,
              (value) => handleChange("data.avgWaterDepthNPL", value)
            )}
          </Row>
          <Row repeat={1}>
            {fields.pondedRiver(
              data?.pondedRiver,
              errors?.data?.pondedRiver,
              (value) => handleChange("data.pondedRiver", value)
            )}
          </Row>
        </>
      );
    }

    if (isEqual(values.objectType, FormObjectType.ISOLATED_WATER_BODY)) {
      components.push(
        <>
          <Row repeat={3}>
            {fields.poolArea(data?.poolArea, errors?.data?.poolArea, (value) =>
              handleChange("data.poolArea", value)
            )}
            {fields.waterVolume(
              data?.waterVolume,
              errors?.data?.waterVolume,
              (value) => handleChange("data.waterVolume", value)
            )}
            {fields.distanceFromRiverMouth(
              data?.distanceFromRiverMouth,
              errors?.data?.distanceFromRiverMouth,
              (value) => handleChange("data.distanceFromRiverMouth", value)
            )}
          </Row>
          <Row repeat={3}>
            {fields.waterLevelAltitude(
              data?.waterLevelAltitude,
              errors?.data?.waterLevelAltitude,
              (value) => handleChange("data.waterLevelAltitude", value)
            )}
            {fields.maxWaterDepth(
              data?.maxWaterDepth,
              errors?.data?.maxWaterDepth,
              (value) => handleChange("data.maxWaterDepth", value)
            )}
            {fields.avgWaterDepth(
              data?.avgWaterDepth,
              errors?.data?.avgWaterDepth,
              (value) => handleChange("data.avgWaterDepth", value)
            )}
          </Row>
          <Row repeat={1}>
            {fields.olderWaterBody(
              data?.olderWaterBody,
              errors?.data?.olderWaterBody,
              (value) => handleChange("data.olderWaterBody", value)
            )}
          </Row>
        </>
      );
    }

    if (isEqual(values.objectType, FormObjectType.EARTH_DAM)) {
      components.push(
        <>
          <Row>
            {fields.constructionYear(
              data?.constructionYear,
              errors?.data?.constructionYear,
              (value) => handleChange("data.constructionYear", value)
            )}
            {fields.maxPondHeight(
              data?.maxPondHeight,
              errors?.data?.maxPondHeight,
              (value) => handleChange("data.maxPondHeight", value)
            )}
          </Row>
          <Row>
            {fields.earthDamLength(
              data?.earthDamLength,
              errors?.data?.earthDamLength,
              (value) => handleChange("data.earthDamLength", value)
            )}

            {fields.earthDamWidth(
              data?.earthDamWidth,
              errors?.data?.earthDamWidth,
              (value) => handleChange("data.earthDamWidth", value)
            )}
          </Row>
        </>
      );
    }

    if (isEqual(values.objectType, FormObjectType.WATER_EXCESS_CULVERT)) {
      components.push(
        <>
          <Row>
            {fields.constructionYear(
              data?.constructionYear,
              errors?.data?.constructionYear,
              (value) => handleChange("data.constructionYear", value)
            )}
            {fields.type(
              data?.type,
              errors?.data?.type,
              (value) => handleChange("data.type", value),
              true,
              options,
              labels
            )}
          </Row>
          <Row>
            {fields.pondHeight(
              data?.pondHeight,
              errors?.data?.pondHeight,
              (value) => handleChange("data.pondHeight", value)
            )}

            {fields.environmentalDebit(
              data?.environmentalDebit,
              errors?.data?.environmentalDebit,
              (value) => handleChange("data.environmentalDebit", value)
            )}
          </Row>
          <Row>
            {fields.minDebit(data?.minDebit, errors?.data?.minDebit, (value) =>
              handleChange("data.minDebit", value)
            )}

            {fields.maxDebit(data?.maxDebit, errors?.data?.maxDebit, (value) =>
              handleChange("data.maxDebit", value)
            )}
          </Row>
          <Row>
            <FormLabel>{formLabels.avgPerennialDebit}</FormLabel>
            <FormLabel>{formLabels.maxSpringFloodDebit}</FormLabel>
          </Row>
          <Row repeat={4}>
            {fields.qvid(data?.qvid, errors?.data?.qvid, (value) =>
              handleChange("data.qvid", value)
            )}
            {fields.q95(data?.q95, errors?.data?.q95, (value) =>
              handleChange("data.q95", value)
            )}
            {fields.q1(data?.q1, errors?.data?.q1, (value) =>
              handleChange("data.q1", value)
            )}
            {fields.q5(data?.q5, errors?.data?.q5, (value) =>
              handleChange("data.q5", value)
            )}
          </Row>
        </>
      );
    }

    if (isEqual(values.objectType, FormObjectType.HYDRO_POWER_PLANT)) {
      components.push(
        <>
          <Row>
            {fields.constructionYear(
              data?.constructionYear,
              errors?.data?.constructionYear,
              (value) => handleChange("data.constructionYear", value)
            )}
            {fields.type(
              data?.type,
              errors?.data?.type,
              (value) => handleChange("data.type", value),
              true,
              options,
              labels
            )}
          </Row>
          <Row>
            {fields.power(data?.power, errors?.data?.power, (value) =>
              handleChange("data.power", value)
            )}
            {fields.maxPressureHeight(
              data?.maxPressureHeight,
              errors?.data?.maxPressureHeight,
              (value) => handleChange("data.maxPressureHeight", value)
            )}
          </Row>
        </>
      );
    }

    if (isEqual(values.objectType, FormObjectType.FISH_PASS)) {
      components.push(
        <Row repeat={3}>
          {fields.constructionYear(
            data?.constructionYear,
            errors?.data?.constructionYear,
            (value) => handleChange("data.constructionYear", value)
          )}
          {fields.type(
            data?.type,
            errors?.data?.type,
            (value) => handleChange("data.type", value),
            true,
            options,
            labels
          )}
          {fields.fishPassDebit(
            data?.fishPassDebit,
            errors?.data?.fishPassDebit,
            (value) => handleChange("data.fishPassDebit", value)
          )}
        </Row>
      );
    }

    return components;
  };

  const commonOptions = [
    FormDataFields.name,
    FormDataFields.hydrostaticId,
    FormDataFields.constructionYear,
    FormDataFields.centerCoordinates
  ];

  const hydroPowerPlantOptions = [
    ...commonOptions,
    FormDataFields.maxPondPressureHeight,
    FormDataFields.type,
    FormDataFields.power
  ];

  const fishPassOptions = [
    ...commonOptions,
    FormDataFields.type,
    FormDataFields.fishPassProjectDebit
  ];

  const earthDamOptions = [
    ...commonOptions,
    FormDataFields.earthDamWidth,
    FormDataFields.earthDamLength,
    FormDataFields.maxPondPressureHeight
  ];

  const waterExcessCulvertOptions = [
    ...commonOptions,
    FormDataFields.avgPerennialDebit95,
    FormDataFields.type
  ];

  const waterBodyCommonOptions = [
    FormDataFields.name,
    FormDataFields.cadastralId,
    FormDataFields.category,
    FormDataFields.subPool,
    FormDataFields.otherData
  ];

  const riverOptions = [
    ...waterBodyCommonOptions,
    FormDataFields.olderRiver,
    FormDataFields.mouthCenterCoordinates,
    FormDataFields.olderRiverBank,
    FormDataFields.inflowOrder,
    FormDataFields.riverLength,
    FormDataFields.avgDebitQGrid
  ];

  const lakeOptions = [
    ...waterBodyCommonOptions,
    FormDataFields.centerCoordinates,
    FormDataFields.surfaceArea,
    FormDataFields.lakeLength,
    FormDataFields.lakeSquareNumber,
    FormDataFields.lakeNumberInSquare,
    FormDataFields.lakeWidth,
    FormDataFields.bankLineLength,
    FormDataFields.directRiver
  ];

  const editOptions = {
    [FormObjectType.RIVER]: riverOptions,
    [FormObjectType.CANAL]: riverOptions,
    [FormObjectType.WATER_EXCESS_CULVERT]: waterExcessCulvertOptions,
    [FormObjectType.EARTH_DAM]: earthDamOptions,
    [FormObjectType.FISH_PASS]: fishPassOptions,
    [FormObjectType.ISOLATED_WATER_BODY]: lakeOptions,
    [FormObjectType.NATURAL_LAKE]: lakeOptions,
    [FormObjectType.HYDRO_POWER_PLANT]: hydroPowerPlantOptions,
    [FormObjectType.POND]: lakeOptions,
    [FormObjectType.PONDED_LAKE]: lakeOptions
  };

  const mapEditFields = () => {
    const fields = Object.keys(form?.data!).map((key) => {
      return { attribute: key, value: form?.data?.[key] };
    });

    if (!isEmpty(form?.geom) && form?.objectType) {
      const attribute = editOptions[form.objectType].find((item) =>
        item.toLocaleLowerCase().includes("coordinates")
      );

      fields.push({ attribute: attribute!, value: "" });
    }

    return fields;
  };

  const initialValues: Form = {
    objectType: form?.objectType,
    objectName: form?.objectName || "",
    cadastralId: form?.cadastralId || "",
    geom: form?.geom || undefined,
    description: form?.description || "",
    type: form?.type || FormType.NEW,
    status: undefined,
    files: form?.files || [],
    providerType: form?.providerType || FormProviderType.MANAGER,
    editFields:
      form?.type === FormType.EDIT
        ? mapEditFields()
        : [{ attribute: undefined, value: "" }],
    providedBy: form?.providedBy || "",
    data: form?.data || {},
    agreeWithConditions: disabled || false
  };
  const mainFieldsDisabled = !!form?.id;

  const renderForm = (values: Form, errors: any, handleChange: any) => {
    const hasCadastralObjects = [
      FormObjectType.HYDRO_POWER_PLANT,
      FormObjectType.FISH_PASS,
      FormObjectType.EARTH_DAM,
      FormObjectType.WATER_EXCESS_CULVERT
    ].includes(values?.objectType!);

    const handleUploadFile = async (files) => {
      const uploadedFiles = await Api.uploadFiles(Resources.FORMS, files);
      handleChange("files", [...values.files, ...uploadedFiles]);
    };

    const isNewType = isEqual(values.type, FormType.NEW);
    const isEditType = isEqual(values.type, FormType.EDIT);

    const showFilesContainer =
      (!isEmpty(values?.files) && disabled) || !disabled;

    const hasMapField =
      isNewType ||
      values.editFields?.some((item) => isMapEditAttribute(item.attribute));

    const mapField = [FormObjectType.RIVER, FormObjectType.CANAL].includes(
      values.objectType!
    )
      ? formLabels.selectRiverMouth
      : formLabels.selectCenter;

    const textareaLabel =
      FormType.REMOVE === values.type
        ? formLabels.deregistration
        : formLabels.otherInfo;

    return (
      <Container>
        <ColumnOne>
          <InnerContainer>
            <SimpleContainer title={formLabels.infoAboutObject}>
              <Row>
                {isNewType && (
                  <SelectField
                    label={inputLabels.objectType}
                    value={values.objectType}
                    disabled={mainFieldsDisabled}
                    options={formObjectTypes}
                    getOptionLabel={(option) => formObjectTypeLabels[option]}
                    error={errors.objectType}
                    name="objectType"
                    onChange={(firstName) => {
                      handleChange("objectType", firstName);
                      handleChange("data", {});
                      handleChange("editFields", [
                        { attribute: undefined, value: "" }
                      ]);
                    }}
                  />
                )}
                <ButtonsGroup
                  label={inputLabels.formType}
                  options={Object.keys(FormType)}
                  disabled={mainFieldsDisabled}
                  onChange={(e) => {
                    handleChange("type", e);
                    handleChange("objectName", "");
                    handleChange("objectType", "");
                    handleChange("cadastralId", "");
                    handleChange("data", {});
                    handleChange("editFields", [
                      { attribute: undefined, value: "" }
                    ]);
                    handleChange("geom", undefined);
                  }}
                  isSelected={(option) => option === values?.type}
                  getOptionLabel={(option) => {
                    return formTypeLabels[option];
                  }}
                />
              </Row>
              {isNewType ? (
                <TextField
                  label={inputLabels.objectName}
                  value={values.objectName}
                  error={errors.objectName}
                  disabled={disabled}
                  name="objectName"
                  onChange={(objectName) =>
                    handleChange("objectName", objectName)
                  }
                />
              ) : (
                <AsyncSelectField
                  label={inputLabels.objectNameOrCode}
                  value={values.objectName}
                  disabled={disabled}
                  error={errors.objectName}
                  onChange={(value) => {
                    handleChange("objectName", value?.name);
                    handleChange("objectType", value?.category);
                    handleChange("cadastralId", value?.cadastralId);
                  }}
                  getOptionValue={(option) => option?.cadastralId}
                  getInputLabel={() =>
                    `${values?.objectName}, ${values?.cadastralId}, ${
                      formObjectTypeLabels[values?.objectType!]
                    }`
                  }
                  getOptionLabel={(option) => {
                    const { name, cadastralId, categoryTranslate } = option;
                    return `${name}, ${cadastralId}, ${categoryTranslate}`;
                  }}
                  loadOptions={(input: string, page: number | string) =>
                    getLocationList(input, page)
                  }
                />
              )}
              {isNewType &&
                renderAdditionalFields(values, errors, handleChange)}
            </SimpleContainer>

            {isNewType && hasCadastralObjects && (
              <SimpleContainer title={formLabels.cadastralObjects}>
                <Row repeat={1}>
                  {fields.river(
                    values?.data?.river,
                    errors?.data?.river,
                    (value) => handleChange("data.river", value)
                  )}
                </Row>
                <Row repeat={1}>
                  {fields.lake(
                    values?.data?.lake,
                    errors?.data?.lake,
                    (value) => handleChange("data.lake", value)
                  )}
                </Row>
                <Row repeat={3}>
                  {fields.distanceFromRiverMouth(
                    values?.data?.distanceFromRiverMouth,
                    errors?.data?.distanceFromRiverMouth,
                    (value) =>
                      handleChange("data.distanceFromRiverMouth", value)
                  )}
                </Row>
              </SimpleContainer>
            )}
            {isEditType && !!values?.objectType && (
              <SimpleContainer title={"Keičiama informacija"}>
                <FieldArray
                  name={`editFields`}
                  render={(arrayHelpers) => (
                    <div>
                      {values.editFields?.map((item, index) => {
                        const filteredOptions = editOptions[
                          values?.objectType!
                        ]?.filter(
                          (option) =>
                            !values.editFields?.some(
                              (editField) =>
                                editField.attribute === option &&
                                item.attribute !== option
                            )
                        );

                        const options = typeOptions[values?.objectType!];
                        const labels = typeLabels[values?.objectType!];

                        const handleRemove = (index) => {
                          if (isMapEditAttribute(item.attribute)) {
                            handleChange("geom", undefined);
                          }

                          arrayHelpers.remove(Number(index));
                        };

                        const editFieldErrors = errors?.editFields?.[index];

                        return (
                          <EditFieldsRow>
                            <SelectField
                              label={inputLabels.attribute}
                              value={item.attribute}
                              options={filteredOptions}
                              getOptionLabel={(option) => inputLabels[option]}
                              error={editFieldErrors?.attribute}
                              disabled={disabled}
                              showError={false}
                              name="attribute"
                              onChange={(attribute) =>
                                handleChange(
                                  `editFields.${index}.attribute`,
                                  attribute
                                )
                              }
                            />
                            {fields?.[item?.attribute!]?.(
                              item.value,
                              editFieldErrors?.value,
                              (value) =>
                                handleChange(
                                  `editFields.${index}.value`,
                                  value
                                ),
                              false,
                              options,
                              labels
                            )}
                            {!disabled && values.editFields?.length! > 1 && (
                              <DeleteButton
                                onClick={() => {
                                  handleRemove(index);
                                }}
                              >
                                <DeleteIcon name={"delete"} />
                              </DeleteButton>
                            )}
                          </EditFieldsRow>
                        );
                      })}

                      {!disabled && (
                        <SimpleButton
                          onClick={() => {
                            arrayHelpers.push({
                              attribute: "",
                              value: undefined
                            });
                          }}
                        >
                          {buttonsTitles.addNew}
                        </SimpleButton>
                      )}
                    </div>
                  )}
                />
              </SimpleContainer>
            )}
            {hasMapField && (
              <SimpleContainer title={mapField}>
                <Map
                  queryString={mapQueryString}
                  error={errors?.geom}
                  onSave={(data) => handleChange("geom", data)}
                  value={values?.geom}
                  height={"300px"}
                />
              </SimpleContainer>
            )}
            {showFilesContainer && (
              <SimpleContainer title={formLabels.uploadFiles}>
                <DragAndDropUploadField
                  disabled={disabled}
                  error={errors?.files}
                  onUpload={handleUploadFile}
                  onDelete={(files: File[]) => handleChange("files", files)}
                  files={values?.files || []}
                  label={""}
                />
              </SimpleContainer>
            )}

            <SimpleContainer title={textareaLabel}>
              <TextAreaField
                disabled={disabled}
                value={values.description}
                error={errors?.description}
                name={"description"}
                onChange={(description) =>
                  handleChange("description", description)
                }
              />
            </SimpleContainer>

            <SimpleContainer title={formLabels.infoAboutUser}>
              <InnerContainer>
                <SelectField
                  disabled={disabled}
                  label={inputLabels.providerType}
                  value={values.providerType}
                  options={formProviderTypes}
                  getOptionLabel={(option) => formProviderTypeLabels[option]}
                  error={errors.providerType}
                  name="providerType"
                  onChange={(firstName) => {
                    handleChange("providerType", firstName);
                    handleChange("providedBy", "");
                  }}
                />
                {values.providerType === FormProviderType.OTHER && (
                  <TextField
                    disabled={disabled}
                    label={inputLabels.providedByFullName}
                    value={values?.providedBy}
                    error={errors?.providedBy}
                    name="providedBy"
                    onChange={(objectName) =>
                      handleChange("providedBy", objectName)
                    }
                  />
                )}
                <SingleCheckBox
                  disabled={disabled}
                  label={<TermsAndConditions />}
                  value={values.agreeWithConditions}
                  error={!!errors?.agreeWithConditions}
                  onChange={(value) =>
                    handleChange(`agreeWithConditions`, value)
                  }
                />
              </InnerContainer>
            </SimpleContainer>
          </InnerContainer>
        </ColumnOne>
        {!isNew(id) && (
          <ColumnTwo>
            <FormHistoryContainer
              name="formRequests"
              formHistoryLabels={formHistoryLabels}
              endpoint={Api.getFormHistory}
            />
          </ColumnTwo>
        )}
      </Container>
    );
  };

  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <FormPageWrapper
      twoColumn={!isNew(id)}
      disabled={disabled}
      title={title}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={validateForm}
    />
  );
};

const Row = styled.div<{ repeat?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ repeat }) => (repeat ? repeat : 2)}, 1fr);
  gap: 12px;
  margin: 12px 0;

  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const EditFieldsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 48px;
  gap: 12px;
  margin: 12px 0;

  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormLabel = styled.div`
  font-size: 1.2rem;
  line-height: 1.4px;
  color: #4b5565;
  text-transform: uppercase;
  margin: 12px 0px;
`;
const DeleteButton = styled.div`
  margin-top: auto;
  height: 40px;
  display: flex;
  @media ${device.mobileL} {
    margin-bottom: 0px;
    height: auto;
  }
`;

const DeleteIcon = styled(Icon)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.error};
  font-size: 2.4rem;
  margin: auto 0 auto 0px;
  @media ${device.mobileL} {
    margin: 8px 0 16px 0;
  }
`;

export default FormPage;
