import { createContext } from "react";

type OrderContextType = {
  currentSection: string;
  setCurrentSection: (section: string) => void;
};

export const OrderContext = createContext<OrderContextType>({
  currentSection: "",
  setCurrentSection: () => {},
});
