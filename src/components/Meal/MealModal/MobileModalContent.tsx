import { FC, useRef, useEffect, useState } from "react";
import { Meal } from "../../../types/meal";
import { getMealIngredients } from "../../../utils/mealUtils";

interface MobileModalContentProps {
  meal: Meal;
  onClick: () => void;
}

const MobileModalContent: FC<MobileModalContentProps> = ({ meal, onClick }) => {
  const ingredients = getMealIngredients(meal).join(", ");
  const modalRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(1);

  const increaseCount = () => setCounter((count) => count + 1);
  const decreaseCount = () => setCounter((count) => count - 1);

  const startClosing = () => {
    if (!modalRef.current) return;

    modalRef.current.classList.add("closing");
    setTimeout(() => {
      onClick();
    }, 390);
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startY = touch.clientY;

      const handleTouchMove = (e: TouchEvent) => {
        const delta = e.touches[0].clientY - startY;
        if (delta > 50) startClosing();
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener(
        "touchend",
        () => {
          document.removeEventListener("touchmove", handleTouchMove);
        },
        { once: true }
      );
    };

    modalRef.current?.addEventListener("touchstart", handleTouchStart);

    return () => {
      modalRef.current?.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-end" onClick={startClosing}>
      <div
        ref={modalRef}
        className="mobile-modal-card card bg-base-100 w-full h-11/12 shadow-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <figure className="relative max-h-2/5">
          <button
            className="btn btn-circle absolute top-1 right-1 shadow-accent"
            onClick={startClosing}
          >
            X
          </button>
          <img
            className="w-full object-cover"
            src={meal.strMealThumb + "/medium"}
            alt={meal.strMeal}
          />
        </figure>
        <div className="card-body">
          <h3>Ingredients: </h3>
          <p className="font-medium">{ingredients}</p>
        </div>
        <div className="flex flex-col justify-between items-center gap-4 w-full p-4 rounded-2xl inset-shadow-sm">
          <div className="flex justify-between items-center w-full">
            <h2 className="card-title">{meal.strMeal}</h2>
            <p className="text-accent text-xl">
              {meal.mealPrice?.slice(0, 1) +
                "" +
                (
                  Number(meal.mealPrice?.slice(1, meal.mealPrice.length)) *
                  counter
                ).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between items-center gap-4 w-full">
            <div className="flex justify-between items-center rounded-xl w-40 h-12 bg-base-300 flex-1/4">
              <button
                className="cursor-pointer active:bg-linear-to-r from-gray-300 to-base-300 w-1/3 h-full rounded-xl text-3xl"
                onClick={decreaseCount}
              >
                -
              </button>
              <span className="text-xl">{counter}</span>
              <button
                className="cursor-pointer active:bg-linear-to-r from-base-300 to-gray-300 w-1/3 h-full rounded-xl text-2xl"
                onClick={increaseCount}
              >
                +
              </button>
            </div>
            <button className="btn btn-primary flex-3/4 rounded-xl">
              + Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileModalContent;
