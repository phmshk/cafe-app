import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal/Modal";
import { FC, useState } from "react";
import SidePanel from "./SidePanel";

const Header: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClick = () => {
    setIsModalOpen(false);
    document.body.classList.toggle("scrolling-disabled");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="flex gap-8 justify-between items-center">
        <div>
          <a href="#" className="text-xl cursor-pointer">
            DH
          </a>
        </div>
        <input
          type="text"
          placeholder="Search in the restaurant menu"
          className="input input-bordered w-48 md:w-64"
        />
      </div>
      <div className="flex gap-4 mr-4">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline relative"
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faCartShopping} /> 0.00
        </div>
        <Modal
          isOpen={isModalOpen}
          onClick={onClick}
          modalContentStyles="absolute top-16 right-28 max-w-1/5"
        >
          <SidePanel title="Cart">
            <div></div>
          </SidePanel>
        </Modal>
        <div role="button" className="btn btn-outline">
          Log In
        </div>
      </div>
    </div>
  );
};

export default Header;
