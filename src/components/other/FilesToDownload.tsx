import styled from "styled-components";
import { buttonsTitles } from "../../utils/texts";
import Icon from "./Icons";

export interface FilesToDownloadProps {
  url: string;
  showFileName?: boolean;
}

const getPathSuffix = (raw: string) => {
  try {
    return new URL(raw).pathname.toLowerCase();
  } catch (_) {
    return raw.toLowerCase().split("?")[0];
  }
};

const isExternalUrl = (raw: string) => {
  try {
    const parsed = new URL(raw, window.location.origin);
    return parsed.origin !== window.location.origin;
  } catch (_) {
    return false;
  }
};

// Generated extracts arrive as .pdf, .zip (Geodatabase), or .geojson —
// label the button accordingly so users know what they're downloading
// before clicking. Anything else falls back to a generic "Atsisiųsti".
const downloadLabelByExt: Record<string, string> = {
  ".pdf": buttonsTitles.downloadPdf,
  ".zip": buttonsTitles.downloadGdb,
  ".geojson": buttonsTitles.downloadGeoJson,
};

const getDownloadLabel = (url: string) => {
  const path = getPathSuffix(url);
  const ext = Object.keys(downloadLabelByExt).find((e) => path.endsWith(e));
  return ext ? downloadLabelByExt[ext] : buttonsTitles.download;
};

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
