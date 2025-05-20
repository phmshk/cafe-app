import { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
  children: ReactNode;
  isMobileDevice?: boolean;
  modalContentStyles?: string;
}

const Modal: FC<ModalProps> = ({
  isModalOpen,
  handleModalClose,
  children,
  isMobileDevice,
  modalContentStyles,
}) => {
  //Close modal if Esc was clicked.
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleModalClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.classList.add("scrolling-disabled");
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  //Close modal when clicking outside of modal.
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  if (!isModalOpen) {
    return null;
  }

  if (isMobileDevice) {
    return ReactDOM.createPortal(
      <div className="modal-overlay">{children}</div>,
      document.body
    );
  }

  return ReactDOM.createPortal(
    <div className="modal-overlay z-11" onClick={handleOverlayClick}>
      <div className={`modal-content ${modalContentStyles}`}>{children}</div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
