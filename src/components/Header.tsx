import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal/Modal";
import { FC, useContext, useEffect, useState } from "react";
import OrderCart from "./Cart/OrderCart";
import { OrderContext } from "./Context/OrderContext";
import { calcCartPrice, getFormattedMealPrice } from "../utils/mealUtils";
import useModalHandler from "../hooks/useModalHandler";

const Header: FC = () => {
  const { cartItems } = useContext(OrderContext); //getting cart items from context
  const { isModalOpen, setIsModalOpen, handleModalClose } = useModalHandler();

  const [cartPrice, setCartPrice] = useState(0); //state to monitor total cart price

  //runs on every update of cart
  useEffect(() => {
    const cartPrice = calcCartPrice(cartItems);
    setCartPrice(cartPrice);
  }, [cartItems]);

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <div className="flex gap-8 justify-between items-center ml-8">
        <div>
          <a href="#" className="text-xl cursor-pointer">
            {/* Header logo */}
            DH
          </a>
        </div>
        <input
          type="text"
          placeholder="Search in the restaurant menu"
          className="input input-bordered w-48 md:w-64"
        />
      </div>
      <div className="flex gap-4 mr-8">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-outline relative"
          onClick={() => setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faCartShopping} />
          {" " + getFormattedMealPrice(cartPrice)}
        </div>
        <Modal
          isModalOpen={isModalOpen}
          handleModalClose={handleModalClose}
          modalContentStyles="absolute top-16 right-28 max-w-1/4"
        >
          <OrderCart />
        </Modal>
        <div role="button" className="btn btn-outline">
          Log In
        </div>
      </div>
    </div>
  );
};

export default Header;
