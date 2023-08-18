import { isEqual } from "lodash";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { default as api, default as Api } from "../api";
import SingleCheckBox from "../components/buttons/CheckBox";
import FormHistoryContainer from "../components/containers/FormHistoryContainer";
import SimpleContainer from "../components/containers/SimpleContainer";
import AsyncMultiSelect from "../components/fields/AsyncMultiSelect";
import SelectField from "../components/fields/SelectField";
import TextField from "../components/fields/TextField";
import Map from "../components/map/DrawMap";
import { ErrorMessage } from "../components/other/ErrorMessage";
import { GeneratedFileComponent } from "../components/other/GeneratedFileComponent";
import LoaderComponent from "../components/other/LoaderComponent";
import TermsAndConditions from "../components/other/TermsAndConditions";
import FormPageWrapper from "../components/wrappers/FormikFormPageWrapper";
import { useAppSelector } from "../state/hooks";
import { device } from "../styles";
import {
  ColumnOne,
  ColumnTwo,
  Container
} from "../styles/GenericStyledComponents";
import { DeliveryTypes, PurposeTypes, StatusTypes } from "../utils/constants";
import { getLocationList, handleAlert, isNew } from "../utils/functions";
import { useGetCurrentProfile } from "../utils/hooks";
import { deliveryTypesOptions, purposeTypesOptions } from "../utils/options";
import { slugs } from "../utils/routes";
import {
  deliveryTypeLabels,
  formLabels,
  inputLabels,
  pageTitles,
  purposeTypeLabels,
  requestStatusLabels
} from "../utils/texts";
import { validateRequest } from "../utils/validation";

export interface RequestProps {
  id?: string;
  notifyEmail: string;
  objects: { cadastralId: string; category: string }[];
  status?: StatusTypes;
  delivery: DeliveryTypes;
  purpose: PurposeTypes;
  canEdit?: boolean;
  canValidate?: boolean;
  unverified?: boolean;
  extended?: boolean;
  geom: any;
  agreeWithConditions: boolean;
}

export interface RequestPayload {
  id?: string;
  notifyEmail: string;
  objects: { type: string; id: string }[];
  status?: StatusTypes;
  delivery: DeliveryTypes;
  purpose: PurposeTypes;
  canEdit?: boolean;
  canValidate?: boolean;
  data?: {
    unverified?: boolean;
    extended?: boolean;
  };
  geom: any;
}

const RequestPage = () => {
  const navigate = useNavigate();
  const userEmail = useAppSelector((state) => state?.user?.userData?.email);
  const currentProfile = useGetCurrentProfile();
  const { id } = useParams();
  const title = isNew(id) ? pageTitles.newRequest : pageTitles.request(id!);

  const { data: request, isLoading } = useQuery(
    ["request", id],
    () => api.request(id!),
    {
      onError: () => {
        navigate(slugs.requests);
      },
      enabled: !isNew(id)
    }
  );

  const disabled = !isNew(id) && !request?.canEdit;

  const getMapQueryString = (disabled = false) => {
    const queryString = `?`;
    const param = new URLSearchParams();

    if (disabled) {
      param.append("preview", "true");
      return queryString + param;
    }

    param.append("types[]", "polygon");
    param.append("multi", "true");
    return queryString + param;
  };

  const mapQueryString = getMapQueryString(disabled);

  const createRequest = useMutation(
    (values: RequestPayload) => api.createRequests(values),
    {
      onError: () => {
        handleAlert();
      },
      onSuccess: () => {
        navigate(slugs.requests);
      },
      retry: false
    }
  );

  const updateRequest = useMutation(
    (values: RequestPayload) => api.updaterRequest(id!, values),
    {
      onError: () => {
        handleAlert();
      },
      onSuccess: () => {
        navigate(slugs.requests);
      },
      retry: false
    }
  );

  const handleSubmit = async (values: RequestProps) => {
    const { agreeWithConditions, unverified, extended, objects, ...rest } =
      values;
    const params: RequestPayload = {
      ...rest,
      objects: objects.map((item) => {
        return {
          type: "CADASTRAL_ID",
          id: item?.cadastralId
        };
      }),
      data: { unverified, extended }
    };

    if (isNew(id)) {
      return await createRequest.mutateAsync(params);
    }

    return await updateRequest.mutateAsync(params);
  };

  const initialValues: RequestProps = {
    notifyEmail:
      request?.notifyEmail || currentProfile?.email || userEmail || "",
    objects: request?.objects || [],
    geom: request?.geom || undefined,
    agreeWithConditions: disabled || false,
    delivery: request?.delivery || DeliveryTypes.EMAIL,
    purpose: request?.purpose || PurposeTypes.TERRITORIAL_PLANNING_DOCUMENT,
    unverified: request?.data?.unverified || false,
    extended: request?.data?.extended || false
  };

  const isApproved = isEqual(request?.status, StatusTypes.APPROVED);

  const renderForm = (values: RequestProps, errors: any, handleChange: any) => {
    return (
      <Container>
        <ColumnOne>
          <InnerContainer>
            <SimpleContainer title={formLabels.infoAboutUser}>
              <TextField
                disabled={disabled}
                label={inputLabels.email}
                value={values.notifyEmail}
                name={"notifyEmail"}
                type="email"
                error={errors?.notifyEmail}
                onChange={(email) => handleChange("notifyEmail", email)}
              />
              <Row>
                <SelectField
                  disabled={disabled}
                  label={inputLabels.requestDeliveryType}
                  value={values.delivery}
                  error={errors.delivery}
                  name={"delivery"}
                  onChange={(e) => handleChange("delivery", e)}
                  options={deliveryTypesOptions}
                  getOptionLabel={(e) => deliveryTypeLabels[e]}
                />
                <SelectField
                  disabled={disabled}
                  label={inputLabels.dataReceivingPurpose}
                  value={values.purpose}
                  error={errors.dataReceivingPurpose}
                  name={"purpose"}
                  onChange={(e) => handleChange("purpose", e)}
                  options={purposeTypesOptions}
                  getOptionLabel={(e) => {
                    return purposeTypeLabels[e];
                  }}
                />
              </Row>
              <Row columns={1}>
                <SingleCheckBox
                  disabled={disabled}
                  label={inputLabels.receiveUnverifiedData}
                  value={values.unverified}
                  onChange={(value) => handleChange(`unverified`, value)}
                />
                <SingleCheckBox
                  disabled={disabled}
                  label={inputLabels.extended}
                  value={values.extended}
                  onChange={(value) => handleChange(`extended`, value)}
                />
              </Row>
            </SimpleContainer>

            <SimpleContainer title={formLabels.map}>
              <MapContainer>
                <AsyncMultiSelect
                  disabled={disabled}
                  label={inputLabels.objects}
                  values={values.objects}
                  getOptionValue={(option) => option?.cadastralId}
                  error={errors.objects}
                  onChange={(value) => {
                    handleChange("objects", value);
                  }}
                  getOptionLabel={(option) => {
                    const { name, cadastralId, categoryTranslate } = option;
                    return `${name}, ${cadastralId}, ${categoryTranslate}`;
                  }}
                  loadOptions={(input: string, page: number | string) =>
                    getLocationList(input, page)
                  }
                  placeholder={"Visi objektai"}
                  showError={false}
                />

                <Map
                  queryString={mapQueryString}
                  error={errors?.geom}
                  onSave={(data) => handleChange("geom", data)}
                  value={values?.geom}
                  height={"300px"}
                  showError={false}
                />
                {errors?.geom && errors.objects && (
                  <ErrorMessage error="Prašome nurodyti, ar pageidaujate pasirinkti vietą iš žemėlapio ar objektus iš pateiktų objektų sąrašo" />
                )}
              </MapContainer>
            </SimpleContainer>

            <SimpleContainer title={formLabels.otherInfo}>
              <SingleCheckBox
                disabled={disabled}
                label={<TermsAndConditions />}
                value={values.agreeWithConditions}
                error={errors?.agreeWithConditions}
                onChange={(value) => handleChange(`agreeWithConditions`, value)}
              />
            </SimpleContainer>
          </InnerContainer>
        </ColumnOne>
        {!isNew(id) && (
          <ColumnTwo>
            {isApproved && (
              <GeneratedFileComponent generatedFile={request?.generatedFile} />
            )}
            <FormHistoryContainer
              name={`historyRequests-${id}`}
              formHistoryLabels={requestStatusLabels}
              endpoint={Api.getRequestHistory}
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
      validationSchema={validateRequest}
    />
  );
};

const Row = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns || 2}, 1fr);
  gap: 12px;
  margin: 12px 0;
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export default RequestPage;
