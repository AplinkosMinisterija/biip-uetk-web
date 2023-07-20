import styled from "styled-components";
import { url } from "../../utils/texts";

export interface NotFoundProps {
  url?: string;
  urlLabel?: string;
  label: string;
}

const TermsAndConditions = () => {
  return (
    <Container>
      Su{" "}
      <Url target="_blank" href={url.termsAndConditions}>
        duomenų teikimo sąlygomis susipažinau
      </Url>{" "}
      ir sutinku.
    </Container>
  );
};

const Container = styled.div`
  font-size: 1.4rem;
  color: #4b5565;
`;

export const Url = styled.a`
  text-decoration: underline;
  font-size: 1.4rem;
  color: #121926;
`;

export default TermsAndConditions;
