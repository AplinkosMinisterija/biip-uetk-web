import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getPublicUrl } from "../../utils/functions";

const AppLogo = () => {
  const navigate = useNavigate();
  return (
    <LogoContainer onClick={() => navigate("/")}>
      <Logo src={getPublicUrl("logo.svg")} />
    </LogoContainer>
  );
};

export default AppLogo;

const Logo = styled.img`
  width: 180px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  cursor: pointer;
`;
