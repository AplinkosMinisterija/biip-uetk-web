import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SimpleContainer from "../components/containers/SimpleContainer";
import NumericTextField from "../components/fields/NumericTextField";
import SelectField from "../components/fields/SelectField";
import TextField from "../components/fields/TextField";
import Icon from "../components/other/Icons";
import LoaderComponent from "../components/other/LoaderComponent";
import FormPageWrapper from "../components/wrappers/FormikFormPageWrapper";
import { useAppSelector } from "../state/hooks";
import { device } from "../styles";
import { DeleteInfoProps, User } from "../types";
import { RolesTypes } from "../utils/constants";
import { getRolesTypes, handleResponse, isNew } from "../utils/functions";
import { slugs } from "../utils/routes";
import {
  buttonsTitles,
  deleteDescriptionFirstPart,
  deleteDescriptionSecondPart,
  deleteTitles,
  formLabels,
  inputLabels,
  pageTitles
} from "../utils/texts";
import {
  validateCreateTenantUser,
  validateUpdateTenantUser
} from "../utils/validation";
import Api from "./../api";

const TenantUserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const currentUser = useAppSelector((state) => state.user?.userData);

  const handleSubmit = async (values: User) => {
    await handleResponse({
      endpoint: () => createOrUpdate(values),
      onSuccess: () => {
        navigate(slugs.tenantUsers);
      }
    });
  };

  const createOrUpdate = async (values: User) => {
    const params = { ...values };
    if (isNew(id)) {
      return await Api.createTenantUser(params);
    } else {
      return await Api.updateTenantUser(params, id);
    }
  };

  const handleSetUser = async () => {
    if (isNew(id)) return setLoading(false);

    await handleResponse({
      endpoint: () => Api.tenantUser(id!),
      onSuccess: (user: User) => {
        if (currentUser?.id === user?.id) return navigate(slugs.profile);
        setUser(user);
      },
      onError: () => {
        navigate(slugs.tenantUsers);
      }
    });
    setLoading(false);
  };

  const handleRemoveTenantUser = async () => {
    await handleResponse({
      endpoint: () => Api.deleteTenantUser(id!),
      onSuccess: () => {
        navigate(slugs.tenantUsers);
      }
    });
  };

  const deleteInfo: DeleteInfoProps = {
    deleteButtonText: buttonsTitles.removeTenantUser,
    deleteDescriptionFirstPart: deleteDescriptionFirstPart.tenantUser,
    deleteDescriptionSecondPart: deleteDescriptionSecondPart.tenantUser,
    deleteTitle: deleteTitles.tenantUser,
    deleteName: `${user?.firstName} ${user?.lastName}`,
    deleteFunction: !isNew(id) ? handleRemoveTenantUser : undefined
  };

  useEffect(() => {
    handleSetUser();
  }, [id]);

  const initialValues: User = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    personalCode: user?.personalCode || "",
    role: user?.role || RolesTypes.USER
  };
  const renderForm = (values: User, errors: any, handleChange: any) => {
    return (
      <InnerContainer>
        <SimpleContainer title={formLabels.tenantUserInfo}>
          <>
            <Row>
              <StyledTextField
                label={inputLabels.firstName}
                value={values.firstName}
                error={errors.firstName}
                name="firstName"
                onChange={(firstName) => handleChange("firstName", firstName)}
              />

              <StyledTextField
                label={inputLabels.lastName}
                name="lastName"
                value={values.lastName}
                error={errors.lastName}
                onChange={(lastName) => handleChange("lastName", lastName)}
              />
              {isNew(id) && (
                <StyledNumericTextField
                  label={inputLabels.personalCode}
                  name="personalCode"
                  value={values.personalCode}
                  error={errors.personalCode}
                  onChange={(code) =>
                    handleChange("personalCode", code.replace(/\s/g, ""))
                  }
                />
              )}
              <StyledTextField
                label={inputLabels.phone}
                value={values.phone}
                error={errors.phone}
                name="phone"
                onChange={(phone) => handleChange("phone", phone)}
              />
              <StyledTextField
                label={inputLabels.email}
                name="email"
                value={values.email}
                error={errors.email}
                onChange={(email) => handleChange("email", email)}
              />
              <StyledSelectField
                label={inputLabels.role}
                name="role"
                value={getRolesTypes().find((role) => role.id === values.role)}
                error={errors.role}
                options={getRolesTypes()}
                onChange={(role) => handleChange("role", role.id)}
                getOptionLabel={(option) => option.label}
              />
            </Row>
          </>
        </SimpleContainer>
      </InnerContainer>
    );
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <FormPageWrapper
      title={
        isNew(id) ? pageTitles.inviteTenantUser : pageTitles.updateTenantUser
      }
      initialValues={initialValues}
      onSubmit={handleSubmit}
      renderForm={renderForm}
      validationSchema={
        isNew(id) ? validateCreateTenantUser : validateUpdateTenantUser
      }
      deleteInfo={deleteInfo}
    />
  );
};

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media ${device.mobileL} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const StyledTextField = styled(TextField)`
  flex: 1;
`;

const StyledSelectField = styled(SelectField)`
  flex: 1;
`;
const StyledNumericTextField = styled(NumericTextField)`
  flex: 1;
`;
const StyledIcon = styled(Icon)`
  color: #cdd5df;
  font-size: 2.4rem;
  margin-right: 12px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default TenantUserForm;
