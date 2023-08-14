import { Form, Formik, yupToFormErrors } from "formik";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles";
import { DeleteInfoProps } from "../../types";
import { buttonsTitles, validationTexts } from "../../utils/texts";
import Button, { ButtonColors } from "../buttons/Button";
import { DeleteComponent } from "../other/DeleteComponent";
import Icon from "../other/Icons";

interface FormPageWrapperProps {
  renderForm: (
    vales: any,
    errors: any,
    handleChange: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    setValues?: (values: any, shouldValidate?: boolean | undefined) => void
  ) => JSX.Element;
  initialValues: any;
  onSubmit: (values: any, setErrors?: any) => void;
  title?: string;
  validationSchema: any;
  additionalValidation?: any;
  back?: boolean;
  backUrl?: string;
  canSubmit?: boolean;
  disabled?: boolean;
  deleteInfo?: DeleteInfoProps;
  twoColumn?: boolean;
  submitButtonText?: string;
}

const FormPageWrapper = ({
  renderForm,
  title,
  initialValues,
  onSubmit,
  validationSchema,
  back = true,
  additionalValidation,
  canSubmit = true,
  backUrl,
  disabled,
  deleteInfo,
  twoColumn = false,
  submitButtonText = buttonsTitles.submit
}: FormPageWrapperProps) => {
  const navigate = useNavigate();
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any, helper?: any) => {
    setLoading(true);
    try {
      await onSubmit(values, helper);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const url: string | number = backUrl || -1;

  return (
    <Container>
      <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validateOnChange={validateOnChange}
        validationSchema={validationSchema}
        validate={async (values) => {
          setValidateOnChange(true);
          const additionalErrors = additionalValidation
            ? additionalValidation(values)
            : null;

          try {
            await validationSchema.validate(values, { abortEarly: false });
          } catch (e) {
            return {
              ...yupToFormErrors(e),
              ...additionalErrors
            };
          }

          return additionalErrors;
        }}
      >
        {({ values, errors, setFieldValue, handleSubmit, setValues }) => {
          return (
            <StyledForm two_column={twoColumn ? 1 : 0}>
              <Row>
                <InnerRow>
                  {back && (
                    <Button
                      onClick={() => navigate(url as string)}
                      leftIcon={<StyledBackIcon name="back" />}
                      variant={ButtonColors.TRANSPARENT}
                      type="button"
                      height={32}
                      buttonPadding="6px 8px"
                      color="black"
                    >
                      {buttonsTitles.back}
                    </Button>
                  )}
                  <Title>{title}</Title>
                </InnerRow>
                <DeleteComponent deleteInfo={deleteInfo} />
              </Row>
              {renderForm(values, errors, setFieldValue, setValues)}

              {!isEmpty(errors) && (
                <MessageContainer>
                  <ErrorMessage>{validationTexts.formFillError}</ErrorMessage>
                  <Invisible />
                </MessageContainer>
              )}
              {canSubmit && !disabled && (
                <ButtonContainer>
                  <Button
                    onClick={handleSubmit as any}
                    type="button"
                    height={40}
                    buttonPadding="6px 8px"
                    loading={loading}
                    disabled={disabled}
                  >
                    {submitButtonText}
                  </Button>
                </ButtonContainer>
              )}
            </StyledForm>
          );
        }}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  flex-basis: 1200px;
  margin-bottom: 120px;
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  color: #121926;
  opacity: 1;
  @media ${device.mobileL} {
    font-size: 2.4rem;
  }
`;

const StyledForm = styled(Form)<{ two_column: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: 1200px;
`;

const StyledBackIcon = styled(Icon)`
  cursor: pointer;

  font-size: 1.1rem;
  align-self: center;
  color: #000000;
`;

const Row = styled.div<{ titleRowWidth?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 22px 0px;
  flex-wrap: wrap;
  gap: 16px;
  width: "100%";
`;

const InnerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const MessageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(168px, 412px);

  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffedf0;
  color: #fe1d42;
  border: 1px solid #fe1d42;
  border-radius: 4px;
  padding: 5px 15px 5px 15px;
  margin: 8px 0 10px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 485.47px;
  flex: 2;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const Invisible = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  flex: 1;

  @media ${device.mobileL} {
    width: 100%;
  }
`;

export default FormPageWrapper;
