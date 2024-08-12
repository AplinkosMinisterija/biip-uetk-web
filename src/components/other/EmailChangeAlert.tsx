import styled from 'styled-components';
import { buttonsTitles, descriptions } from '../../utils/texts';
import { slugs } from '../../utils/routes';
import Icon from './Icons';
import { useNavigate } from 'react-router-dom';

const EmailChangeAlert = () => {
  const navigate = useNavigate();

  return (
    <InformationContainer>
      <IconContainer>
        <StyledIcon name={'info'} />
      </IconContainer>
      <TextContainer>
        <Description>{descriptions.infoSent}</Description>
        <>&nbsp;</>
        <BoldDescription>{descriptions.email}</BoldDescription>
        <Description>,</Description>
        <>&nbsp;</>
        <Description>{`${descriptions.emailProfile}.`}</Description>
        <>&nbsp;</>
        <Description>{descriptions.changeEmail}</Description>
        <>&nbsp;</>
        <ButtonContainer
          onClick={() => {
            navigate(slugs.profile);
          }}
        >
          {buttonsTitles.here}
        </ButtonContainer>
        <Description>.</Description>
      </TextContainer>
    </InformationContainer>
  );
};

const InformationContainer = styled.div`
  display: flex;
  padding: 16px;
  background-color: #ecf6ff;
  border: 1px solid #0b62ab;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

const StyledIcon = styled(Icon)`
  font-size: 1.6rem;
  color: #ffffff;
  display: inline-block;
`;

const IconContainer = styled.div`
  background-color: #0b62ab;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  display: flex;
  white-space: nowrap;
  min-width: 24px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 16px;
  flex-wrap: wrap;
`;

const Description = styled.div`
  color: #0b62ab;
  font-size: 1.4rem;
  line-height: 24px;
  flex-wrap: wrap;
`;

const BoldDescription = styled.div`
  color: #0b62ab;
  font-size: 1.4rem;
  line-height: 24px;
  font-weight: bold;
`;

const ButtonContainer = styled.a`
  color: #0b62ab;
  text-decoration: none;
  font-size: 1.4rem;
  line-height: 24px;
  cursor: pointer;
  &:hover {
    opacity: 50%;
  }
`;

export default EmailChangeAlert;
