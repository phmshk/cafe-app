import { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClick: () => void;
  children: ReactNode;
  isMobileDevice?: boolean;
  modalContentStyles?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClick,
  children,
  isMobileDevice,
  modalContentStyles,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClick();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.classList.toggle("scrolling-disabled");
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClick]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  if (!isOpen) {
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
