import { FC, useEffect, useState } from "react";
import useMealData from "../hooks/useMealData";
import ResponsiveModal from "./Modal/ResponsiveModal";
import MobileModalContent from "./Modal/MobileModalContent";
import DesktopModalContent from "./Modal/DesktopModalContent";

interface MealProps {
  mealId: string;
}

const MealCard: FC<MealProps> = ({ mealId }) => {
  const { meal, isLoading, error } = useMealData(mealId);
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

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>An Error Occured: {error}</div>;
  if (!meal) return <div>No meal found</div>;

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
        <div className="card-body items-left text-left">
          <p className="text-accent text-xl">{meal.mealPrice}</p>
          <h2 className="card-title">{meal.strMeal}</h2>
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
      <ResponsiveModal
        isOpen={isModalOpen}
        isMobileDevice={isMobileDevice}
        onClose={onClose}
      >
        {isMobileDevice ? (
          <MobileModalContent meal={meal} onClose={onClose} />
        ) : (
          <DesktopModalContent meal={meal} />
        )}
      </ResponsiveModal>
    </>
  );
};

export default MealCard;
