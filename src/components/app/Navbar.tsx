import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { externalRoutes } from "../../utils/routes";
import ProfilesDropdown from "../other/ProfilesDropdown";
import AppLogo from "./AppLogo";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Header>
      <InnerContainer>
        <AppLogo />
        <TabContainer>
          {externalRoutes.map((route, index) => (
            <Tab
              isActive={location.pathname.includes(route.slug)}
              key={`menu-${index}`}
              onClick={() =>
                route.internal
                  ? navigate(route.slug)
                  : window.open(route.slug, "_blank")
              }
            >
              {route.label}
              {!!route?.icon && route?.icon}
            </Tab>
          ))}
        </TabContainer>
        <ProfilesDropdown />
      </InnerContainer>
    </Header>
  );
};

export default Menu;

const Tab = styled.div<{ isActive: boolean }>`
  font-size: 1.6rem;
  background-color: ${({ isActive }) => isActive && "#ECF6FF"};
  padding: 12px;
  border-radius: 50px;

  color: #121926;
  text-shadow: 0px 0px 0px #000;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  margin: 0px 16px;
  flex-wrap: wrap;
`;

const Header = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 65px;
  width: 100%;
  border-bottom: 1px solid #cdd5df;
  padding: 10px;
`;

const InnerContainer = styled.div`
  flex-basis: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
