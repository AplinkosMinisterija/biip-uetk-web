import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { buttonsTitles } from "../../utils/texts";
import Button, { ButtonColors } from "../buttons/Button";
import Icon from "../other/Icons";

interface FormPageWrapperProps {
  title?: string;
  back?: boolean;
  backUrl?: string;
  canSubmit?: boolean;
  handleDelete?: () => void;
  disabled?: boolean;
  children?: JSX.Element;
  handleSubmit?: (props: any) => void;
  loading?: boolean;
}

const FormPageWrapper = ({
  title,
  back = true,
  canSubmit = true,
  backUrl,
  disabled,
  children,
  loading,
  handleSubmit
}: FormPageWrapperProps) => {
  const navigate = useNavigate();
  const url: string | number = backUrl || -1;
  return (
    <Container>
      <StyledForm>
        <Row>
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
        </Row>
        {children}
        {canSubmit && (
          <ButtonContainer>
            <Button
              onClick={handleSubmit}
              variant={ButtonColors.PRIMARY}
              type="button"
              color="black"
              height={32}
              buttonPadding="6px 8px"
              loading={loading}
              disabled={loading || disabled}
            >
              {buttonsTitles.save}
            </Button>
          </ButtonContainer>
        )}
      </StyledForm>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  color: #121926;
  opacity: 1;
`;

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBackIcon = styled(Icon)`
  cursor: pointer;

  font-size: 1.1rem;
  align-self: center;
  color: #000000;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 22px 0px;
  flex-wrap: wrap;
  gap: 16px;
`;

export default FormPageWrapper;
