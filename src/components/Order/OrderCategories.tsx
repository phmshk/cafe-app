import { vi } from "@faker-js/faker";
import { FC } from "react";

interface OrderCategoriesProps {
  categories: string[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>, str: string) => void;
  visibleCategory: string;
}

const OrderCategories: FC<OrderCategoriesProps> = ({
  categories,
  onClick,
  visibleCategory,
}) => {
  return (
    <nav>
      <ul>
        {categories.map((category) => {
          const visible =
            category.toLocaleLowerCase() === visibleCategory
              ? "bg-base-100"
              : "";
          return (
            <li key={category}>
              <button
                className={`my-2 text-left p-2 rounded-xl w-full cursor-pointer hover:bg-base-100 overflow-y-auto ${visible}`}
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
