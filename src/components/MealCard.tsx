import { FC, useEffect, useState } from "react";
import Modal from "./Modal/Modal";
import MobileModalContent from "./MealModal/MobileModalContent";
import DesktopModalContent from "./MealModal/DesktopModalContent";
import { Meal } from "../types/meal";

interface MealProps {
  meal: Meal;
}

const MealCard: FC<MealProps> = ({ meal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(true);

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
            <p className="text-accent text-xl mb-0.5">{meal.mealPrice}</p>
            <div className="card-actions">
              <button
                className="btn btn-primary w-full"
                onClick={(e) => e.stopPropagation()}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        isMobileDevice={isMobileDevice}
        onClick={onClose}
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
