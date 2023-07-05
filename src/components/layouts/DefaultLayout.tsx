import { useMediaQuery } from "@material-ui/core";
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
  const profileId = cookies.get("profileId");

  if (loggedIn && profileId) {
    return (
      <Container>
        {!isMobile ? <Navbar /> : <MobileNavbar />}

        <Content>{children}</Content>
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

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media ${device.mobileL} {
    padding: 20px 16px;
  }
`;
export default DefaultLayout;
