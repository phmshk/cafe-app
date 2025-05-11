import { createContext } from "react";
import { CartMealObj } from "../../types/meal";

type OrderContextType = {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  cartItems: CartMealObj[];
  setCartItems: (items: CartMealObj[]) => void;
};

export const OrderContext = createContext<OrderContextType>({
  currentSection: "",
  setCurrentSection: () => {},
  cartItems: [],
  setCartItems: () => {},
});
