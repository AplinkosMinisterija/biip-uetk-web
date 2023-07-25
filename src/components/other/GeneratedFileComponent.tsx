import styled from "styled-components";
import { formLabels, inputLabels } from "../../utils/texts";
import SimpleContainer from "../containers/SimpleContainer";
import FilesToDownload from "./FileDownloadContainer";
import Loader from "./Loader";

export const GeneratedFileComponent = ({
  generatedFile
}: {
  generatedFile?: any;
}) => {
  return (
    <SimpleContainer title={formLabels.documents}>
      <FileContainer>
        {generatedFile ? (
          <FilesToDownload url={generatedFile} showFileName={true} />
        ) : (
          <InnerContainer>
            <Loader /> {inputLabels.generating}
          </InnerContainer>
        )}
      </FileContainer>
    </SimpleContainer>
  );
};

const FileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
`;

const InnerContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;
