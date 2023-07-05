import { useMediaQuery } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { device } from "../../styles";
import { ChildrenType } from "../../types";
import Footer from "../app/Footer";
import MobileNavbar from "../app/MobileNavbar";
import Navbar from "../app/Navbar";
import LoginLayout from "./LoginLayout";

const cookies = new Cookies();

export interface DefaultLayoutProps {
  children?: ChildrenType;
  loggedIn?: boolean;
}

const DefaultLayout = ({ children, loggedIn }: DefaultLayoutProps) => {
  const isMobile = useMediaQuery(device.mobileL);
  const location = useLocation();
  const loginLayoutPages = ["/profiliai", "/login"];
  const isLoginLayoutPage = loginLayoutPages.some((loginLayoutPage) =>
    location.pathname.includes(loginLayoutPage)
  );

  if (loggedIn && !isLoginLayoutPage) {
    return (
      <Container>
        {!isMobile ? <Navbar /> : <MobileNavbar />}

        <Content isMap={false}>{children}</Content>
        <Footer />
      </Container>
    );
  }

  return <LoginLayout>{children}</LoginLayout>;
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: white;
  flex-direction: column;
  overflow-y: scroll;
  @media ${device.mobileL} {
    overflow-y: auto;
    height: 100svh;
  }
`;

const Content = styled.div<{ isMap: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  ${({ isMap }) =>
    isMap &&
    `
    padding: 0px;
    width: 100%;
    height: 100%;
  `}
  @media ${device.mobileL} {
    padding: 20px 16px;

    ${({ isMap }) =>
      isMap &&
      `
    padding: 0px;
  `}
  }
`;
export default DefaultLayout;
