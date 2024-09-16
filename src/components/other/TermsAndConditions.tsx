import styled from 'styled-components';

export interface TermsAndConditionsProps {
  url: string;
  urlText: string;
}

const TermsAndConditions = ({ url, urlText }: TermsAndConditionsProps) => {
  return (
    <Container>
      Su{' '}
      <Url target="_blank" href={url}>
        {urlText}
      </Url>{' '}
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
