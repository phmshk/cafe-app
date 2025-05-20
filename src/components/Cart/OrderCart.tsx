import { FC, useContext, useState } from "react";
import { OrderContext } from "../Context/OrderContext";
import {
  calcCartPrice,
  getFormattedMealPrice,
  multiplyMealPriceBy,
} from "../../utils/mealUtils";
import { CartMealObj } from "../../types/meal";
import BagIcon from "../../assets/BagIcon";

const OrderCart: FC = () => {
  const { cartItems, setCartItems } = useContext(OrderContext); //getting cart items from context
  const [checkedOut, setCheckedOut] = useState(false);

  //Setting cart items to an empty array;
  const emptyCart = () => {
    setCartItems([]);
  };

  /**
   * Function to remove item from cart.
   * @param item object of type CartMealObj
   */
  const removeItemFromCart = (item: CartMealObj): void => {
    const filteredItems = cartItems.filter(
      (cartItem) => cartItem.meal.idMeal !== item.meal.idMeal
    );
    setCartItems(filteredItems);
  };

  /**
   * Function to increase or decrease number of items in a cart.
   * @param item object of type CartMealObj
   * @param sign + or -
   * @returns void
   */
  const changeItemQty = (item: CartMealObj, sign: "+" | "-"): void => {
    const newItem =
      sign === "+"
        ? { ...item, qty: item.qty + 1 }
        : { ...item, qty: item.qty - 1 };

    if (newItem.qty < 1) {
      removeItemFromCart(item);
      return;
    }

    setCartItems(
      cartItems.map((cartItem) => {
        if (cartItem.meal.idMeal === newItem.meal.idMeal) {
          return newItem;
        }
        return cartItem;
      })
    );
  };

  const checkoutCart = () => {
    //TODO: Create real chekcout on server;
    emptyCart();
    setCheckedOut(true);
  };

  //imitation of successful checkout
  if (checkedOut) {
    const delay = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCheckedOut(false);
    };

    delay();

    return (
      <div className="relative">
        <h2>Cart</h2>
        <div className="flex flex-col items-center">
          <BagIcon className="w-60 h-60" type={"happy"} />
          <h3 className="mb-8 mt-2">Thank you for your order!</h3>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="relative">
        <h2>Cart</h2>
        <div className="flex flex-col items-center">
          <BagIcon className="w-60 h-60" type={"sad"} />
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
          onClick={emptyCart}
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
                {getFormattedMealPrice(
                  multiplyMealPriceBy(item.qty, item.meal.mealPrice!)
                )}
              </span>
              <div className="flex justify-between items-center rounded-xl bg-base-300 gap-3 py-1 px-2">
                <button
                  onClick={() => changeItemQty(item, "-")}
                  className="cursor-pointer"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => changeItemQty(item, "+")}
                  className="cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
            <hr className="mt-1" />
          </div>
        </div>
      ))}

      <hr className="mt-8" />
      <div className="flex items-center justify-between">
        <h3>Total:</h3>
        <span>{getFormattedMealPrice(calcCartPrice(cartItems))}</span>
      </div>

      <button
        onClick={checkoutCart}
        className="btn btn-outline btn-primary w-full mt-4"
      >
        Checkout
      </button>
    </div>
  );
};

export default OrderCart;
