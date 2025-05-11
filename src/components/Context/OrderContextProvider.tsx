import { FC, useState } from "react";
import { OrderContext } from "./OrderContext";

interface OrderProviderProps {
  children: React.ReactNode;
}

const OrderProvider: FC<OrderProviderProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState("");

  return (
    <OrderContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
