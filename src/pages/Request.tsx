import { MapField } from '@aplinkosministerija/design-system';
import { isEqual } from 'lodash';
import { useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { default as api, default as Api } from '../api';
import SingleCheckBox from '../components/buttons/CheckBox';
import FormHistoryContainer from '../components/containers/FormHistoryContainer';
import SimpleContainer from '../components/containers/SimpleContainer';
import AsyncMultiSelect from '../components/fields/AsyncMultiSelect';
import SelectField from '../components/fields/SelectField';
import TextAreaField from '../components/fields/TextAreaField';
import EmailChangeAlert from '../components/other/EmailChangeAlert';
import { GeneratedFileComponent } from '../components/other/GeneratedFileComponent';
import LoaderComponent from '../components/other/LoaderComponent';
import TermsAndConditions from '../components/other/TermsAndConditions';
import FormPageWrapper from '../components/wrappers/FormikFormPageWrapper';
import { useAppSelector } from '../state/hooks';
import { device } from '../styles';
import { ColumnOne, ColumnTwo, Container } from '../styles/GenericStyledComponents';
import { mapsHost, PurposeTypes, StatusTypes } from '../utils/constants';
import { getLocationList, handleErrorFromServerToast, isNew } from '../utils/functions';
import { useGetCurrentProfile } from '../utils/hooks';
import { purposeTypesOptions } from '../utils/options';
import { slugs } from '../utils/routes';
import {
  formLabels,
  inputLabels,
  pageTitles,
  purposeTypeLabels,
  requestHistoryStatusLabels,
  url,
} from '../utils/texts';
import { validateRequest } from '../utils/validation';

export interface RequestProps {
  id?: string;
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

const requestDataTypes = ['false', 'true'];

const requestDataTypeLabels = {
  false: 'Pagrindiniai duomenys (.pdf)',
  true: 'Išplėstiniai duomenys (.pdf)',
};

const RequestPage = () => {
  const navigate = useNavigate();
  const userEmail = useAppSelector((state) => state?.user?.userData?.email);
  const currentProfile = useGetCurrentProfile();
  const { id } = useParams();
  const title = isNew(id) ? pageTitles.newRequest : pageTitles.request(id!);

  const { data: request, isLoading } = useQuery(['request', id], () => api.request(id!), {
    onError: () => {
      navigate(slugs.requests);
    },
    enabled: !isNew(id),
  });

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

  const createRequest = useMutation((values: RequestPayload) => api.createRequests(values), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: () => {
      navigate(slugs.requests);
    },
    retry: false,
  });

  const updateRequest = useMutation((values: RequestPayload) => api.updaterRequest(id!, values), {
    onError: () => {
      handleErrorFromServerToast();
    },
    onSuccess: () => {
      navigate(slugs.requests);
    },
    retry: false,
  });

  const handleSubmit = async (values: RequestProps) => {
    const { agreeWithConditions, extended, objects, ...rest } = values;
    const params: RequestPayload = {
      ...rest,
      notifyEmail: currentProfile?.email || userEmail || '',
      objects: objects.map((item) => {
        return {
          type: 'CADASTRAL_ID',
          id: item?.cadastralId,
        };
      }),
      data: { extended: extended === 'true' },
    };

    if (isNew(id)) {
      return await createRequest.mutateAsync(params);
    }

    return await updateRequest.mutateAsync(params);
  };

  const initialValues: RequestProps = {
    objects: request?.objects || [],
    agreeWithConditions: disabled || false,
    purposeValue: request?.purposeValue || '',
    purpose: request?.purpose || PurposeTypes.TERRITORIAL_PLANNING_DOCUMENT,
    extended: request?.data?.extended?.toString() || 'false',
  };

  const isApproved = isEqual(request?.status, StatusTypes.APPROVED);
  const mapPath = '/uetk?hideSidebar=true&preview=true';

  const renderForm = (values: RequestProps, errors: any, handleChange: any) => {
    const objects = values.objects || [];

    const cadastralIds = objects.map((item) => {
      return item?.cadastralId;
    });

    const objectsRef = useRef(values.objects);

    useEffect(() => {
      objectsRef.current = values.objects;
    }, [values.objects]);

    const handleClick = (result) => {
      if (disabled) return;

      const objects = objectsRef.current;

      const item = result?.[0];

      if (item) {
        const name = item?.['1. Pavadinimas'];
        const cadastralId = item?.['2. Kadastro identifikavimo kodas'];
        const categoryTranslate = item?.['3. Kategorija'];

        if (!objects.some((obj) => obj.cadastralId === cadastralId)) {
          handleChange('objects', [...objects, { name, cadastralId, categoryTranslate }]);
        }
      }
    };
    return (
      <Container>
        <ColumnOne>
          {!disabled && <EmailChangeAlert />}
          <InnerContainer>
            <SimpleContainer title={formLabels.requestInfo}>
              <Row columns={2}>
                <SelectField
                  disabled={disabled}
                  label={inputLabels.dataReceivingPurpose}
                  value={values.purpose}
                  error={errors.dataReceivingPurpose}
                  name={'purpose'}
                  onChange={(e) => {
                    handleChange('purpose', e);
                    handleChange('purposeValue', '');
                  }}
                  options={purposeTypesOptions}
                  getOptionLabel={(e) => {
                    return purposeTypeLabels[e];
                  }}
                />

                {isEqual(values.purpose, PurposeTypes.OTHER) && (
                  <TextAreaField
                    label={'Kita'}
                    disabled={disabled}
                    value={values.purposeValue}
                    error={errors?.purposeValue}
                    rows={1}
                    onChange={(e: string) => handleChange('purposeValue', e)}
                  />
                )}
              </Row>
              <Row columns={2}>
                <SelectField
                  disabled={disabled}
                  label={inputLabels.requestType}
                  value={values.extended}
                  error={errors.extended}
                  name={'extended'}
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

            <SimpleContainer title={formLabels.objectList}>
              <MapContainer>
                <AsyncMultiSelect
                  disabled={disabled}
                  label={inputLabels.objects}
                  placeholder={inputLabels.objectNameOrCode}
                  values={values.objects}
                  getOptionValue={(option) => option?.cadastralId}
                  error={errors.objects}
                  onChange={(value) => {
                    handleChange('objects', value);
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

                <MapField
                  {...(cadastralIds && { filter: { cadastralId: { $in: cadastralIds } } })}
                  onClick={handleClick}
                  mapHost={mapsHost}
                  mapPath={mapPath}
                  allow="geolocation *"
                />
              </MapContainer>
            </SimpleContainer>

            <SimpleContainer title={formLabels.otherInfo}>
              <SingleCheckBox
                disabled={disabled}
                label={
                  <TermsAndConditions
                    urlText="duomenų gavimo taisyklėmis susipažinau"
                    url={url.requestTermsAndConditions}
                  />
                }
                value={values.agreeWithConditions}
                error={errors?.agreeWithConditions}
                onChange={(value) => handleChange(`agreeWithConditions`, value)}
              />
            </SimpleContainer>
          </InnerContainer>
        </ColumnOne>
        {!isNew(id) && (
          <ColumnTwo>
            {isApproved && <GeneratedFileComponent generatedFile={request?.generatedFile} />}
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
