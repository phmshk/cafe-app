import { FC, useContext } from "react";
import { OrderContext } from "../Context/OrderContext";
import {
  calcCartPrice,
  getFormattedMealPrice,
  multiplyMealPriceBy,
} from "../../utils/mealUtils";
import SadBagIcon from "../../assets/SadBagIcon";

const OrderCart: FC = () => {
  const { cartItems, setCartItems } = useContext(OrderContext);

  if (cartItems.length === 0) {
    return (
      <div className="relative">
        <h2>Cart</h2>
        <div className="flex flex-col items-center">
          <SadBagIcon className="w-60 h-60" />
          <h3 className="mb-8 mt-2">Your cart ist empty</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h2>Cart</h2>
        <button
          onClick={() => setCartItems([])}
          className="cursor-pointer rounded-2xl py-1 px-2 hover:bg-base-300"
        >
          Empty the cart
        </button>
      </div>
      {cartItems.map((item) => (
        <div key={item.meal.idMeal} className="flex gap-2 mt-4 items-center">
          <img
            src={item.meal.strMealThumb + "/small"}
            alt={item.meal.strMeal}
            className="w-14 h-14 rounded-2xl"
          />
          <div className=" w-full">
            <p className="overflow-hidden line-clamp-1">{item.meal.strMeal}</p>
            <div className="flex items-center justify-between">
              <span>
                {item.meal.mealPrice
                  ? getFormattedMealPrice(
                      multiplyMealPriceBy(item.qty, item.meal.mealPrice)
                    )
                  : "No price found for this item"}
              </span>

              <span>x{item.qty}</span>
            </div>
            <hr />
          </div>
        </div>
      ))}

      <hr className="mt-8" />
      <div className="flex items-center justify-between">
        <h3>Total:</h3>
        <span>{getFormattedMealPrice(calcCartPrice(cartItems))}</span>
      </div>
    </div>
  );
};

export default OrderCart;
