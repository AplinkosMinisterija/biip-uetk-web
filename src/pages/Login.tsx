import { Formik } from "formik";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import api from "../api";
import Button, { ButtonColors } from "../components/buttons/Button";
import SingleCheckBox from "../components/buttons/CheckBox";
import PasswordField from "../components/fields/PasswordField";
import TextField from "../components/fields/TextField";
import { ErrorMessage } from "../components/other/ErrorMessage";
import { useAppDispatch } from "../state/hooks";
import { actions } from "../state/user/reducer";
import { device } from "../styles";
import {
  handleEGatesSign,
  handleGetCurrentUser,
  handleResponse,
  handleUpdateTokens
} from "../utils/functions";
import { buttonsTitles, inputLabels } from "../utils/texts";
import { loginSchema } from "../utils/validation";

const Login = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [eLoading, setELoading] = useState(false);
  const captchaRef = useRef<any>();

  const handleSubmit = async ({
    email,
    password,
    refresh
  }: {
    email: string;
    password: string;
    refresh: boolean;
  }) => {
    const captchaToken = await captchaRef?.current?.execute();
    const params = { email, password, refresh, captchaToken };

    setLoading(true);

    await handleResponse({
      endpoint: () => api.login(params),
      onError: (error) => {
        setError(error);
      },
      onSuccess: handleSuccess
    });

    setLoading(false);
  };

  const handleSuccess = async (data: any) => {
    handleUpdateTokens(data);
    const currentUserData = await handleGetCurrentUser(true);
    dispatch(actions.setUser(currentUserData));
  };

  const handleEGateSIgn = async () => {
    setELoading(true);
    await handleEGatesSign();
    setELoading(false);
  };

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={{ email: "", password: "", refresh: false }}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ values, errors, setFieldValue, handleSubmit }) => (
        <FormContainer
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        >
          <Container>
            <TextField
              value={values.email}
              type="email"
              error={errors.email}
              onChange={(value) => setFieldValue("email", value)}
              label={inputLabels.email}
            />
            <PasswordField
              value={values.password}
              error={errors.password}
              onChange={(value) => setFieldValue("password", value)}
              label={inputLabels.password}
            />
            <ErrorMessage error={error} />
            <Row>
              <SingleCheckBox
                onChange={(value) => setFieldValue("refresh", value)}
                value={values.refresh}
                label={inputLabels.rememberMe}
              />
              <Button loading={loading} type="submit">
                {buttonsTitles.login}
              </Button>
            </Row>
            <OrRow>
              <Hr />
              <OrLabel>{inputLabels.or}</OrLabel>
              <Hr />
            </OrRow>
            <Button
              type="button"
              leftIcon={<EvvIcon src="./icons/EVV.svg" />}
              variant={ButtonColors.PRIMARY}
              onClick={handleEGateSIgn}
              loading={eLoading}
            >
              {buttonsTitles.eGates}
            </Button>
            <ReCAPTCHA
              ref={captchaRef}
              size="invisible"
              sitekey="6LdydlggAAAAAO-vBvg9yBWEVxlulH5b4X6BijMV"
            />
          </Container>
        </FormContainer>
      )}
    </Formik>
  );
};

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
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EvvIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 12px;
`;

const OrLabel = styled.div`
  font-weight: normal;
  font-size: 1.4rem;
  letter-spacing: 0.56px;
  color: #716c6b;
  margin: 0 17px;
`;

const OrRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0px;
  width: 100%;
  @media ${device.mobileL} {
    margin: 6px 0px;
  }
`;

const Hr = styled.div`
  background-color: #d3d2d2;
  width: 100%;
  height: 1px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export default Login;
