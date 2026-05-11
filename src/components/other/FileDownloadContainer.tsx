import styled from "styled-components";
import { buttonsTitles } from "../../utils/texts";
import Icon from "./Icons";

export interface FileDownloadProps {
  url: string;
  showFileName?: boolean;
}

const getDownloadLabel = (url: string) => {
  const lower = url.toLowerCase();
  if (lower.endsWith(".geojson") || lower.endsWith(".json")) {
    return buttonsTitles.downloadGeoJson;
  }
  if (lower.endsWith(".pdf")) {
    return buttonsTitles.downloadPdf;
  }
  return buttonsTitles.download;
};

const FileDownloadContainer = ({ url, showFileName }: FileDownloadProps) => {
  if (url) {
    return (
      <>
        {showFileName && <FileName>{url.replace(/^.*[\\/]/, "")}</FileName>}

        <Container
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <DownloadContainer target={"_blank"} href={url} download>
            {getDownloadLabel(url)}
            <StyledIcon name={"download"} />
          </DownloadContainer>
        </Container>
      </>
    );
  } else {
    return null;
  }
};

const Container = styled.div`
  cursor: pointer;
  font-size: 1.6rem;
`;

const FileName = styled.div`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DownloadContainer = styled.a`
  display: flex;
  justify-content: flex-start;
  color: inherit;
  text-decoration: none;
  &:hover {
    opacity: 50%;
  }
`;

const StyledIcon = styled(Icon)`
  margin: 2px 5px 0 5px;
  font-weight: 900;
`;

export default FileDownloadContainer;
