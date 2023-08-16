import styled from "styled-components";
import * as Texts from "../../utils/texts";
import Icon from "./Icons";

export interface FilesToDownloadProps {
  url: string;
  showFileName?: boolean;
}

const FilesToDownload = ({ url, showFileName }: FilesToDownloadProps) => {
  if (!url) return <></>;

  return (
    <>
      {showFileName && <FileName>{url.replace(/^.*[/]/, "")}</FileName>}

      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DownloadContainer href={url} download>
          {Texts.buttonsTitles.download}
          <StyledIcon name={"download"} />
        </DownloadContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  cursor: pointer;
  font-size: 1.6rem;
`;

const FileName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
`;

const DownloadContainer = styled.a`
  display: flex;
  justify-content: flex-start;
  color: inherit;
  text-decoration: none;
  font-size: 1.4rem;
  &:hover {
    opacity: 50%;
  }
`;

const StyledIcon = styled(Icon)`
  margin: 0 5px 0 5px;
  font-weight: 900;
`;

export default FilesToDownload;
