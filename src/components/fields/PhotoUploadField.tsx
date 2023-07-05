import { useState } from "react";
import styled from "styled-components";
import { device } from "../../styles";
import { FileProps } from "../../types";
import { handleAlert } from "../../utils/functions";
import { inputLabels } from "../../utils/texts";
import { validateFileTypes } from "../../utils/validation";
import Icon from "../other/Icons";
import Loader from "../other/Loader";
import Modal from "../other/Modal";
import PhotoField from "./PhotoField";

export interface PhotoUploadFieldProps {
  name: string;
  photos: FileProps[] | File[] | any[];
  onChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => void;
  onImageClick?: (files: File[]) => void;
  disabled?: boolean;
  canOpenPhoto?: boolean;
  getSrc: (photo: any) => string;
  error?: string;
  showError?: boolean;
}
export const availablePhotoMimeTypes = ["image/png", "image/jpg", "image/jpeg"];

const PhotoUploadField = ({
  photos,
  name,
  onChange,
  disabled = false,
  onImageClick,
  onUpload,
  getSrc,
  canOpenPhoto = true,
  error,
  showError = true
}: PhotoUploadFieldProps) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const selectedPhoto = photos?.[selectedPhotoIndex];

  const handleSetFiles = async (currentFiles: File[]) => {
    const isValidFileTypes = validateFileTypes(currentFiles);
    if (!isValidFileTypes) return handleAlert("badFileTypes");
    if (onUpload) {
      setLoading(true);
      await onUpload(currentFiles);

      setLoading(false);
    }
  };

  const handleOpenPreviousPhoto = () => {
    const currentIndex =
      (selectedPhotoIndex - 1 + photos.length) % photos.length;

    handleOpenPhoto(currentIndex);
  };

  const handleOpenNextPhoto = () => {
    const currentIndex = (selectedPhotoIndex + 1) % photos.length;
    handleOpenPhoto(currentIndex);
  };

  const handleOpenPhoto = (currentIndex) => {
    setSelectedPhotoIndex(currentIndex);
  };
  const handleSetMainPhoto = (index) => {
    return photos
      .map((photo, photoIndex: number) => {
        return { ...photo, main: photoIndex === index };
      })
      .sort((x, y) => Number(y.main) - Number(x.main));
  };

  return (
    <Container>
      {photos.map((photo: File | FileProps | any, index: number) => {
        if (!photo) return <></>;

        return (
          <div key={`photoUploadField-${index}`}>
            <PhotoField
              getSrc={getSrc}
              photo={photo}
              photos={photos}
              onChange={onChange}
              index={index}
              disabled={disabled}
              onImageClick={() =>
                canOpenPhoto
                  ? handleOpenPhoto(index)
                  : onImageClick && onImageClick(handleSetMainPhoto(index))
              }
            />
          </div>
        );
      })}

      {loading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}

      <Modal
        visible={!!selectedPhoto}
        onClose={() => setSelectedPhotoIndex(-1)}
      >
        <InnerContainer>
          {photos.length > 1 && (
            <div onClick={handleOpenPreviousPhoto}>
              <StyledArrow name="leftArrow" />
            </div>
          )}
          <PhotoField
            getSrc={getSrc}
            isOpen={!!selectedPhoto}
            photo={selectedPhoto}
            photos={photos}
            height={600}
            onChange={onChange}
            index={"modal"}
            disabled={disabled}
          />
          {photos.length > 1 && (
            <div onClick={handleOpenNextPhoto}>
              <StyledArrow name="rightArrow" />
            </div>
          )}
        </InnerContainer>
      </Modal>

      {!disabled && (
        <StyledButton type="button" error={!!error}>
          <StyledIcon name="photo" />
          <StyledCloseIconContainer />
          <StyledInput
            disabled={disabled}
            value={undefined}
            multiple={true}
            type="file"
            accept="image/*"
            name={name}
            onChange={(e: any) => {
              handleSetFiles(Array.from(e?.target?.files));
            }}
          />
          <StyledText>{inputLabels.uploadPhotos}</StyledText>
        </StyledButton>
      )}
      {showError && !!error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

const LoaderContainer = styled.div`
  width: 133px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImg = styled.img<{ disabled: boolean }>`
  width: fit-content;
  height: 100px;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.48 : 1)};
  transition: 0.5s ease;
  backface-visibility: hidden;
  max-width: 100%;
`;

const StyledInput = styled.input``;
const StyledText = styled.div`
  color: #7a7e9f;
  font-size: 1rem;
  line-height: 10px;
  margin-top: 8px;
`;

const StyledButton = styled.button<{
  error: boolean;
}>`
  border-width: ${({ error }) => (error ? "1px" : "2px ")};
  border-color: ${({ error }) => (error ? "red" : "#d3d2d2 ")};
  border-style: ${({ error }) => (error ? "solid" : "dashed")};
  width: 133px;
  height: 100px;
  padding: 1rem;
  border-radius: 5px;
  background-color: #eeebe53d;
  position: relative;
  input {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
    width: 133px;
    height: 100px;
  }
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  font-size: 2.4rem;
  color: #697586;
`;

const StyledArrow = styled(Icon)`
  cursor: pointer;
  font-size: 3.2rem;
  color: white;
`;

const StyledCloseIconContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  z-index: 10;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

const ErrorMessage = styled.label`
  display: inline-block;
  width: 100%;
  color: ${({ theme }) => theme.colors.error};
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.4rem;
`;

export default PhotoUploadField;
