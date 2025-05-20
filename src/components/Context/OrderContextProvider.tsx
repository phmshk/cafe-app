import { FC, useState } from "react";
import { OrderContext } from "./OrderContext";
import { CartMealObj } from "../../types/meal";

interface OrderProviderProps {
  children: React.ReactNode;
}

const OrderProvider: FC<OrderProviderProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState<string>("");
  const [cartItems, setCartItems] = useState<CartMealObj[]>([]);

  return (
    <OrderContext.Provider
      value={{
        currentSection,
        setCurrentSection,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
