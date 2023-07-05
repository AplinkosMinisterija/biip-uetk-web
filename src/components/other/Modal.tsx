import React, { useEffect } from "react";
import styled from "styled-components";
import { ChildrenType } from "../../types";
interface ModalProps {
  visible: boolean;
  onClose?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ChildrenType;
}

const Modal = ({ visible, children, onClose }: ModalProps) => {
  const handleCloseOnEscape = (event) => {
    if (event.key === "Escape") {
      onClose && onClose(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleCloseOnEscape);
    return () => window.removeEventListener("keydown", handleCloseOnEscape);
  }, [visible]);

  if (!visible) {
    return <React.Fragment />;
  }

  return (
    <ModalContainer
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        onClose && onClose(false);
      }}
    >
      {children}
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #0b1b607a;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 1001;
`;

export default Modal;
