import { FC, useContext } from "react";
import { OrderContext } from "../Context/OrderContext";
import { calcCartPrice, multiplyMealPriceBy } from "../../utils/mealUtils";

const OrderCart: FC = () => {
  const { cartItems } = useContext(OrderContext);

  return (
    <div className="relative">
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
                  ? multiplyMealPriceBy(item.qty, item.meal.mealPrice)
                  : "No price found for this item"}
              </span>
              <span>x{item.qty}</span>
            </div>
            <hr />
          </div>
        </div>
      ))}
      <hr className="mt-4" />
      <div className="flex items-center justify-between">
        <h3>Total:</h3>
        <span>{calcCartPrice(cartItems)}</span>
      </div>
    </div>
  );
};

export default OrderCart;
