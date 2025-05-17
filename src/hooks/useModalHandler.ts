import { useState } from "react";

/**
 * Hook to use when modal is used.
 * @returns State of modal, function to change it and function to close modal
 */
function useModalHandler() {
  const [isModalOpen, setIsModalOpen] = useState(false); //state to monitor if modal is opened
  const handleModalClose = () => {
    setIsModalOpen(false);
    document.body.classList.remove("scrolling-disabled"); //remove class disabling page scrolling
  };

  return { isModalOpen, setIsModalOpen, handleModalClose };
}

export default useModalHandler;
