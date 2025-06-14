import { FC, useContext, useState } from "react";
import { Meal } from "../../../types/meal";
import {
  getFormattedMealPrice,
  getMealIngredients,
  multiplyMealPriceBy,
} from "../../../utils/mealUtils";
import { OrderContext } from "../../Context/OrderContext";
import { getCartUpdate } from "../../../utils/cartUtils";

interface DesktopModalContentProps {
  meal: Meal;
}
const DesktopModalContent: FC<DesktopModalContentProps> = ({ meal }) => {
  const ingredients = getMealIngredients(meal).join(", ");
  const [counter, setCounter] = useState(1);

  const increaseCount = () => setCounter((count) => count + 1);
  const decreaseCount = () => setCounter((count) => count - 1);

  const { cartItems, setCartItems } = useContext(OrderContext);

  const handleCart = () => {
    const newCart = getCartUpdate(cartItems, meal, counter);
    setCartItems(newCart);
    setCounter(1);
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure className="max-w-80">
        <img src={meal.strMealThumb + "/large"} alt={meal.strMeal} />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl">{meal.strMeal}</h2>
        <div className="flex justify-start items-center gap-4 max-w-xl">
          <p className="text-accent text-xl grow-0 w-24">
            {meal.mealPrice
              ? getFormattedMealPrice(
                  multiplyMealPriceBy(counter, meal.mealPrice)
                )
              : "No price found for this item"}
          </p>
          <div className="flex justify-between items-center rounded-xl w-40 h-12 bg-base-300">
            <button
              disabled={counter < 2}
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
          <button
            onClick={handleCart}
            className="btn btn-outline btn-primary rounded-xl"
          >
            + Add to Cart
          </button>
        </div>
        <h3>Ingredients:</h3>
        <p className="font-medium">{ingredients}</p>
      </div>
    </div>
  );
};

export default DesktopModalContent;
