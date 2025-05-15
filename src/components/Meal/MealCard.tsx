import { FC, useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import MobileModalContent from "./MealModal/MobileModalContent";
import DesktopModalContent from "./MealModal/DesktopModalContent";
import { CartMealObj, Meal } from "../../types/meal";
import { OrderContext } from "../Context/OrderContext";
import { getFormattedMealPrice } from "../../utils/mealUtils";

interface MealProps {
  meal: Meal;
}

const MealCard: FC<MealProps> = ({ meal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  const { cartItems, setCartItems } = useContext(OrderContext);

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const getCartUpdate = (prev: CartMealObj[]) => {
      const existingItem = prev.find(
        (item) => item.meal.idMeal === meal.idMeal
      );

      if (existingItem) {
        return prev.map((item) =>
          item.meal.idMeal === meal.idMeal
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prev, { meal, qty: 1 }];
      }
    };
    const newCart = getCartUpdate(cartItems);
    setCartItems(newCart);
  };

  useEffect(() => {
    const checkDeviceType = () =>
      setIsMobileDevice(window.matchMedia("(max-width: 768px)").matches);
    checkDeviceType();
    window.addEventListener("resize", checkDeviceType);
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  const onClose = () => {
    document.body.classList.toggle("scrolling-disabled");
    setIsModalOpen(false);
  };

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
              <button className="btn btn-primary w-full" onClick={handleCart}>
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        isMobileDevice={isMobileDevice}
        handleModalClose={onClose}
      >
        {isMobileDevice ? (
          <MobileModalContent meal={meal} onClick={onClose} />
        ) : (
          <DesktopModalContent meal={meal} />
        )}
      </Modal>
    </>
  );
};

export default MealCard;
