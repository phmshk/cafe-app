import { FC, useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import MobileModalContent from "./MealModal/MobileModalContent";
import DesktopModalContent from "./MealModal/DesktopModalContent";
import { Meal } from "../../types/meal";
import { OrderContext } from "../Context/OrderContext";
import { getFormattedMealPrice } from "../../utils/mealUtils";
import useModalHandler from "../../hooks/useModalHandler";
import { getCartUpdate } from "../../utils/cartUtils";

interface MealProps {
  meal: Meal;
}

const MealCard: FC<MealProps> = ({ meal }) => {
  const [isMobileDevice, setIsMobileDevice] = useState(true);
  const { cartItems, setCartItems } = useContext(OrderContext);

  const { isModalOpen, setIsModalOpen, handleModalClose } = useModalHandler();

  const addItemToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    const newCart = getCartUpdate(cartItems, meal, 1);
    setCartItems(newCart);
  };

  useEffect(() => {
    const checkDeviceType = () =>
      setIsMobileDevice(window.matchMedia("(max-width: 768px)").matches);
    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  return (
    <>
      <div
        className="card bg-base-300 shadow-sm max-w-3xs cursor-pointer rounded-2xl"
        onClick={() => setIsModalOpen(true)}
      >
        <figure className="px-5 pt-5">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-left text-left flex flex-col">
          <h2 className="card-title line-clamp-2">{meal.strMeal}</h2>
          <div className="mt-auto">
            <p className="text-accent text-xl mb-0.5">
              {getFormattedMealPrice(meal.mealPrice!)}
            </p>
            <div className="card-actions">
              <button
                className="btn btn-primary w-full"
                onClick={addItemToCart}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isModalOpen={isModalOpen}
        isMobileDevice={isMobileDevice}
        handleModalClose={handleModalClose}
      >
        {isMobileDevice ? (
          <MobileModalContent meal={meal} onClick={handleModalClose} />
        ) : (
          <DesktopModalContent meal={meal} />
        )}
      </Modal>
    </>
  );
};

export default MealCard;
