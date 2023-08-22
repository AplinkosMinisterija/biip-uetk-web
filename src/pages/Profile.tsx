import { useMutation } from "react-query";
import styled from "styled-components";
import api from "../api";
import SimpleContainer from "../components/containers/SimpleContainer";
import TextField from "../components/fields/TextField";
import FormPageWrapper from "../components/wrappers/FormikFormPageWrapper";
import { useAppSelector } from "../state/hooks";
import { device } from "../styles";
import { User } from "../types";
import { handleAlert, handleSuccess } from "../utils/functions";
import { useGetCurrentProfile } from "../utils/hooks";
import { handleGetCurrentUser } from "../utils/loginFunctions";
import { formLabels, inputLabels, pageTitles } from "../utils/texts";
import { validateProfileForm } from "../utils/validation";

export interface UserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

const Profile = () => {
  const user: User = useAppSelector((state) => state?.user?.userData);
  const currentProfile = useGetCurrentProfile();
  const updateForm = useMutation(
    (values: UserProps) => api.updateProfile(user?.id!, values),
    {
      onError: () => {
        handleAlert();
      },
      onSuccess: () => {
        handleGetCurrentUser();
        handleSuccess(formLabels.profileUpdated);
      },
      retry: false
    }
  );

  const initialProfileValues: UserProps = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: currentProfile?.email || user?.email || "",
    phone: user?.phone || ""
  };

  const renderProfileForm = (
    values: UserProps,
    errors: any,
    handleChange: any
  ) => {
    return (
      <>
        <SimpleContainer title={formLabels.profileInfo}>
          <>
            <Row>
              <TextField
                label={inputLabels.firstName}
                value={values.firstName}
                error={errors.firstName}
                disabled={true}
                name="firstName"
                onChange={(firstName) => handleChange("firstName", firstName)}
              />
              <TextField
                label={inputLabels.lastName}
                disabled={true}
                name="lastName"
                value={values.lastName}
                error={errors.lastName}
                onChange={(lastName) => handleChange("lastName", lastName)}
              />
              <TextField
                label={inputLabels.phone}
                value={values.phone}
                error={errors.phone}
                name="phone"
                onChange={(phone) => handleChange("phone", phone)}
              />
              <TextField
                label={inputLabels.email}
                name="email"
                value={values.email}
                error={errors.email}
                onChange={(email) => handleChange("email", email)}
              />
            </Row>
          </>
        </SimpleContainer>
      </>
    );
  };

  return (
    <FormPageWrapper
      back={false}
      title={pageTitles.updateProfile}
      initialValues={initialProfileValues}
      onSubmit={updateForm.mutateAsync}
      renderForm={renderProfileForm}
      validationSchema={validateProfileForm}
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

export default Profile;
