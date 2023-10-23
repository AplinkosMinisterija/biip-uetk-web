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
import TextAreaField from "../components/fields/TextAreaField";
import TextField from "../components/fields/TextField";
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
import { PurposeTypes, StatusTypes } from "../utils/constants";
import {
  getLocationList,
  handleErrorFromServerToast,
  isNew
} from "../utils/functions";
import { useGetCurrentProfile } from "../utils/hooks";
import { purposeTypesOptions } from "../utils/options";
import { slugs } from "../utils/routes";
import {
  formLabels,
  inputLabels,
  pageTitles,
  purposeTypeLabels,
  requestHistoryStatusLabels
} from "../utils/texts";
import { validateRequest } from "../utils/validation";

export interface RequestProps {
  id?: string;
  notifyEmail: string;
  objects: { cadastralId: string; category: string }[];
  status?: StatusTypes;
  purposeValue: string;
  purpose: PurposeTypes;
  canEdit?: boolean;
  canValidate?: boolean;
  extended?: any;
  geom?: any;
  agreeWithConditions: boolean;
}

export interface RequestPayload {
  id?: string;
  notifyEmail: string;
  objects: { type: string; id: string }[];
  status?: StatusTypes;
  purposeValue: string;
  purpose: PurposeTypes;
  canEdit?: boolean;
  canValidate?: boolean;
  data?: {
    extended?: any;
  };
  geom?: any;
}

const requestDataTypes = ["false", "true"];

const requestDataTypeLabels = {
  false: "Pagrindiniai duomenys (.pdf)",
  true: "Išplėstiniai duomenys (.pdf)"
};

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

  // const getMapQueryString = (disabled = false) => {
  //   const queryString = `?`;
  //   const param = new URLSearchParams();

  //   if (disabled) {
  //     param.append("preview", "true");
  //     return queryString + param;
  //   }

  //   param.append("types[]", "polygon");
  //   param.append("multi", "true");
  //   return queryString + param;
  // };

  // const mapQueryString = getMapQueryString(disabled);

  const createRequest = useMutation(
    (values: RequestPayload) => api.createRequests(values),
    {
      onError: () => {
        handleErrorFromServerToast();
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
        handleErrorFromServerToast();
      },
      onSuccess: () => {
        navigate(slugs.requests);
      },
      retry: false
    }
  );

  const handleSubmit = async (values: RequestProps) => {
    const { agreeWithConditions, extended, objects, ...rest } = values;
    const params: RequestPayload = {
      ...rest,
      objects: objects.map((item) => {
        return {
          type: "CADASTRAL_ID",
          id: item?.cadastralId
        };
      }),
      data: { extended: extended === "true" }
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
    //geom: !isEmpty(request?.geom) ? request?.geom : undefined,
    agreeWithConditions: disabled || false,
    purposeValue: request?.purposeValue || "",
    purpose: request?.purpose || PurposeTypes.TERRITORIAL_PLANNING_DOCUMENT,
    extended: request?.data?.extended?.toString() || "false"
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
              <Row columns={2}>
                <SelectField
                  disabled={disabled}
                  label={inputLabels.dataReceivingPurpose}
                  value={values.purpose}
                  error={errors.dataReceivingPurpose}
                  name={"purpose"}
                  onChange={(e) => {
                    handleChange("purpose", e);
                    handleChange("purposeValue", "");
                  }}
                  options={purposeTypesOptions}
                  getOptionLabel={(e) => {
                    return purposeTypeLabels[e];
                  }}
                />

                {isEqual(values.purpose, PurposeTypes.OTHER) && (
                  <TextAreaField
                    label={"Kita"}
                    disabled={disabled}
                    value={values.purposeValue}
                    error={errors?.purposeValue}
                    rows={1}
                    onChange={(e: string) => handleChange("purposeValue", e)}
                  />
                )}
              </Row>
              <Row columns={2}>
                <SelectField
                  disabled={disabled}
                  label={inputLabels.requestType}
                  value={values.extended}
                  error={errors.extended}
                  name={"extended"}
                  onChange={(e) => {
                    handleChange(`extended`, e?.toString());
                  }}
                  options={requestDataTypes}
                  getOptionLabel={(e) => {
                    return requestDataTypeLabels[e];
                  }}
                />
              </Row>
            </SimpleContainer>

            <SimpleContainer>
              <MapContainer>
                <AsyncMultiSelect
                  disabled={disabled}
                  label={inputLabels.objects}
                  placeholder={inputLabels.objectNameOrCode}
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
                    getLocationList(input, page, {})
                  }
                  showError={false}
                />

                {/* <Map
                  queryString={mapQueryString}
                  error={errors?.geom}
                  onSave={(data) => handleChange("geom", data)}
                  value={values?.geom}
                  height={"300px"}
                  showError={false}
                />
                {errors?.geom && errors.objects && (
                  <ErrorMessage error="Prašome nurodyti, ar pageidaujate pasirinkti vietą iš žemėlapio ar objektus iš pateiktų objektų sąrašo" />
                )} */}
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
              formHistoryLabels={requestHistoryStatusLabels}
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
