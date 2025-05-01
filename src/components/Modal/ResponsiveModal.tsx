import { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isMobileDevice: boolean;
}

const ResponsiveModal: FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  children,
  isMobileDevice,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.classList.toggle("scrolling-disabled");
    }

    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
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
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default ResponsiveModal;
