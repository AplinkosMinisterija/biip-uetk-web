import { useFormik } from "formik";
import { useMutation } from "react-query";
import styled from "styled-components";
import api from "../api";
import Button from "../components/buttons/Button";
import PasswordField from "../components/fields/PasswordField";
import TextField from "../components/fields/TextField";
import { handleAlert } from "../utils/functions";
import { useCheckAuthMutation, useEGatesSign } from "../utils/hooks";
import { handleUpdateTokens } from "../utils/loginFunctions";
import {
  buttonsTitles,
  formLabels,
  inputLabels,
  validationTexts
} from "../utils/texts";
import { loginSchema } from "../utils/validation";

interface LoginProps {
  email: string;
  password: string;
}

export const Login = () => {
  const onSubmit = async ({
    email,
    password
  }: {
    email: string;
    password: string;
  }) => {
    const params = { email, password };
    await loginMutation.mutateAsync(params);
  };

  const loginMutation = useMutation((params: LoginProps) => api.login(params), {
    onError: ({ response }: any) => {
      const text = validationTexts[response?.data?.type];

      if (text) {
        return setErrors({ password: text });
      }

      handleAlert();
    },
    onSuccess: (data) => {
      handleUpdateTokens(data);
      checkAuthMutation();
    },
    retry: false
  });

  const { mutateAsync: eGatesMutation, isLoading: eGatesSignLoading } =
    useEGatesSign();

  const { mutateAsync: checkAuthMutation, isLoading: checkAuthLoading } =
    useCheckAuthMutation();

  const loading = [loginMutation.isLoading, checkAuthLoading].some(
    (loading) => loading
  );

  const { values, errors, setFieldValue, handleSubmit, setErrors } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validateOnChange: false,
    validationSchema: loginSchema,
    onSubmit
  });

  const handleType = (field: string, value: string) => {
    setFieldValue(field, value);
    setErrors({});
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
        }
      }}
    >
      <H1>{formLabels.login}</H1>
      <InnerContainer>
        <TextField
          label={inputLabels.email}
          type="email"
          value={values.email}
          error={errors.email}
          onChange={(e) => handleType("email", e)}
        />
        <PasswordField
          label={inputLabels.password}
          value={values.password}
          error={errors.password}
          onChange={(e) => handleType("password", e)}
        />
        <ButtonContainer>
          <StyledButton loading={loading} type="submit">
            {buttonsTitles.login}
          </StyledButton>
        </ButtonContainer>

        <OrContainer>
          <Or>
            <Separator />
            <SeparatorLabelContainer>
              <SeparatorLabel> {buttonsTitles.or}</SeparatorLabel>
            </SeparatorLabelContainer>
          </Or>
        </OrContainer>
      </InnerContainer>
      <StyledButton
        loading={eGatesSignLoading}
        type="button"
        onClick={() => eGatesMutation()}
      >
        {buttonsTitles.eLogin}
      </StyledButton>
    </FormContainer>
  );
};

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 300px;
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  text-align: center;
  font: normal normal bold 32px/44px;
  letter-spacing: 0px;
  color: #121a55;
  opacity: 1;
  padding-bottom: 24px;
  @media only screen and (max-width: 1000px) {
    padding-bottom: 0px;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  height: 100%;
  max-width: 510px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OrContainer = styled.div`
  width: 100%;
`;

const Or = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SeparatorLabelContainer = styled.div`
  font: normal normal 600 16px/40px;
  letter-spacing: 1.02px;
  color: #0b1f518f;
  position: absolute;
  max-width: 400px;
  width: 100%;
  text-align: center;
  opacity: 1;
`;

const SeparatorLabel = styled.span`
  font: normal normal 600 16px/40px;
  letter-spacing: 1.02px;
  color: #0b1f518f;
  background-color: white;
  padding: 0 8px;
  margin: 0 auto;
  vertical-align: middle;
  opacity: 1;
`;

const Separator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme?.colors?.border};
  margin: auto 0;
  position: absolute;
  max-width: 400px;
  width: 100%;
  margin: 24px 0;
`;
