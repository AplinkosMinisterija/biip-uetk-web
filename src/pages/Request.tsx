import { useEffect } from "react";
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
import { GeneratedFileComponent } from "../components/other/GeneratedFileComponent";
import LoaderComponent from "../components/other/LoaderComponent";
import TermsAndConditions from "../components/other/TermsAndConditions";
import FormPageWrapper from "../components/wrappers/FormikFormPageWrapper";
import { device } from "../styles";
import {
  ColumnOne,
  ColumnTwo,
  Container
} from "../styles/GenericStyledComponents";
import { DeliveryTypes, PurposeTypes, StatusTypes } from "../utils/constants";
import { getLocationList, handleAlert, isNew } from "../utils/functions";
import { deliveryTypesOptions, purposeTypesOptions } from "../utils/options";
import { slugs } from "../utils/routes";
import {
  deliveryTypeLabels,
  formHistoryLabels,
  formLabels,
  inputLabels,
  pageTitles,
  purposeTypeLabels
} from "../utils/texts";
import { validateRequest } from "../utils/validation";

export interface RequestProps {
  id?: string;
  notifyEmail: string;
  objects: { properties: { cadastral_id: string } }[];
  status?: StatusTypes;
  delivery: DeliveryTypes;
  purpose: PurposeTypes;
  canEdit?: boolean;
  canValidate?: boolean;
  unverified?: boolean;
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
  };
  geom: any;
  agreeWithConditions: boolean;
}

const RequestPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = isNew(id) ? pageTitles.newRequest : pageTitles.request(id!);

  const { data: request, isLoading } = useQuery(
    ["form", id],
    () => api.request(id!),
    {
      onError: () => {
        navigate(slugs.forms);
      },
      enabled: !isNew(id)
    }
  );

  const disabled = !isNew(id) && !request?.canEdit;
  const mapQueryString = !disabled
    ? "?types[]=polygon&multi=true"
    : "?preview=true";

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
    const { unverified, objects, ...rest } = values;
    const params: RequestPayload = {
      ...rest,
      objects: objects.map((item) => {
        return {
          type: "CADASTRAL_ID",
          id: item?.properties?.cadastral_id
        };
      }),
      data: { unverified }
    };

    if (isNew(id)) {
      return await createRequest.mutateAsync(params);
    }

    return await updateRequest.mutateAsync(params);
  };

  const handleSetForm = async () => {};

  useEffect(() => {
    handleSetForm();
  }, [id]);

  const initialValues: RequestProps = {
    notifyEmail: request?.notifyEmail || "",
    objects: request?.objects || [],
    geom: request?.geom || undefined,
    agreeWithConditions: disabled || false,
    delivery: request?.delivery || DeliveryTypes.EMAIL,
    purpose: request?.purpose || PurposeTypes.TERRITORIAL_PLANNING_DOCUMENT,
    status: request?.status || undefined,
    unverified: request?.data?.unverified || false
  };

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
                  name={"dataReceivingPurpose"}
                  onChange={(e) => handleChange("dataReceivingPurpose", e)}
                  options={purposeTypesOptions}
                  getOptionLabel={(e) => {
                    return purposeTypeLabels[e];
                  }}
                />
              </Row>

              <SingleCheckBox
                disabled={disabled}
                label={inputLabels.receiveUnverifiedData}
                value={values.unverified}
                onChange={(value) => handleChange(`unverified`, value)}
              />
            </SimpleContainer>

            <SimpleContainer title={formLabels.map}>
              <MapContainer>
                <AsyncMultiSelect
                  disabled={disabled}
                  label={inputLabels.objects}
                  values={values.objects}
                  getOptionValue={(option) => option?.properties?.cadastral_id}
                  error={errors.objectName}
                  onChange={(value) => {
                    handleChange("objects", value);
                  }}
                  getOptionLabel={(option) => {
                    return `${option?.properties?.name}, ${option?.properties?.cadastral_id}, ${option?.properties?.category}`;
                  }}
                  loadOptions={(input: string, page: number | string) =>
                    getLocationList(input, page)
                  }
                />

                <Map
                  queryString={mapQueryString}
                  error={errors?.geom}
                  onSave={(data) => handleChange("geom", data)}
                  value={values?.geom}
                  height={"300px"}
                />
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
            <FormHistoryContainer
              formHistoryLabels={formHistoryLabels}
              endpoint={Api.getRequestHistory}
            />
            <GeneratedFileComponent generatedFile={request?.generatedFile} />
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

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
