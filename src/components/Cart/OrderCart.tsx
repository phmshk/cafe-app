import { FC, useContext } from "react";
import { Meal } from "../../types/meal";
import { OrderContext } from "../Context/OrderContext";

interface OrderCartProps {
  items: Meal[];
}

const OrderCart: FC<OrderCartProps> = () => {
  const { cartItems } = useContext(OrderContext);

  return (
    <div className="relative">
      <button className="cursor-pointer hover:bg-base-100 px-3 py-1 rounded-xl">
        Clear
      </button>
      {cartItems.map((item) => (
        <div key={item.meal.idMeal}>
          <p>{item.meal.strMeal}</p>
          <span>
            {item.meal.mealPrice?.slice(0, 1) +
              "" +
              (
                Number(
                  item.meal.mealPrice?.slice(1, item.meal.mealPrice.length)
                ) * item.qty
              ).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default OrderCart;
