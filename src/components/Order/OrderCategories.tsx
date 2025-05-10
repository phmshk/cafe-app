import { FC } from "react";

interface OrderCategoriesProps {
  categories: string[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>, str: string) => void;
}

const OrderCategories: FC<OrderCategoriesProps> = ({ categories, onClick }) => {
  return (
    <nav>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category}>
              <button
                className={`my-2 text-left p-2 rounded-xl w-full cursor-pointer hover:bg-base-100 overflow-y-auto`}
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
