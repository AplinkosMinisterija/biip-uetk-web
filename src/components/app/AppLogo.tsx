import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icon from "../other/Icons";

const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <LogoContainer onClick={() => navigate("/")}>
      <Icon width="220px" height="39.54px" name="logo" />
    </LogoContainer>
  );
};

export default AppLogo;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
`;
