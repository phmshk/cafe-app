import { FC, useContext } from "react";
import { OrderContext } from "../Context/OrderContext";

interface OrderCategoriesProps {
  categories: string[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>, str: string) => void;
}

const OrderCategories: FC<OrderCategoriesProps> = ({ categories, onClick }) => {
  const { currentSection } = useContext(OrderContext);

  return (
    <nav>
      <ul>
        {categories.map((category) => {
          const currentSectionStyle =
            currentSection === category.toLocaleLowerCase()
              ? "bg-base-100"
              : "";
          return (
            <li key={category}>
              <button
                className={`my-2 text-left p-2 rounded-xl w-full cursor-pointer hover:bg-base-100 overflow-y-auto ${currentSectionStyle}`}
                onClick={(e) => onClick(e, category.toLocaleLowerCase())}
              >
                {category}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default OrderCategories;
