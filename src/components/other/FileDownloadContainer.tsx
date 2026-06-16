import styled from "styled-components";
import Icon from "./Icons";
import { getDownloadLabel } from "./downloadLabel";

export interface FileDownloadProps {
  url: string;
  showFileName?: boolean;
}

const isExternalUrl = (raw: string) => {
  try {
    const parsed = new URL(raw, window.location.origin);
    return parsed.origin !== window.location.origin;
  } catch (_) {
    return false;
  }
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
          <DownloadContainer
            href={url}
            download
            target={isExternalUrl(url) ? "_blank" : undefined}
            rel={isExternalUrl(url) ? "noopener noreferrer" : undefined}
          >
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
