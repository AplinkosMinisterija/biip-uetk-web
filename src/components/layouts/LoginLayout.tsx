import styled from "styled-components";
import { device } from "../../styles";
import { ChildrenType } from "../../types";
import { getPublicUrl } from "../../utils/functions";
import { descriptions } from "../../utils/texts";
import Icon from "../other/Icons";

export interface LoginLayoutProps {
  children?: ChildrenType;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <Container>
      <LayoutImage src={getPublicUrl("LoginImage.jpg")} />
      <InnerContainer>
        <LogoContainer>
          <Icon name="logo" width="250px" height="40px" />
          <Description>{descriptions.mainDescription}</Description>
        </LogoContainer>
        {children}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  overflow-y: auto;
`;

const LogoContainer = styled.div``;

const InnerContainer = styled.div`
  background-color: #ffffff;
  padding: 0 48px 16px 55px;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media ${device.mobileM} {
    padding: 16px;
  }
`;

const LayoutImage = styled.img`
  max-width: 70%;
  position: sticky;
  object-fit: cover;

  @media ${device.mobileXL} {
    width: 50%;
  }
  @media ${device.mobileL} {
    display: none;
  }
`;

const Description = styled.div`
  font-weight: normal;
  font-size: 1.4rem;
  color: #121926;
  margin-bottom: 48px;
  margin-top: 12px;
  line-height: 24px;
`;

export default LoginLayout;
