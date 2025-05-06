import { FC } from "react";

interface OrderCategoriesProps {
  categories: string[];
}

const OrderCategories: FC<OrderCategoriesProps> = ({ categories }) => {
  return (
    <>
      <ul className="bg-base-300">
        {categories.map((category) => (
          <li key={category} className="m-4 cursor-pointer">
            {category}
          </li>
        ))}
      </ul>
    </>
  );
};

export default OrderCategories;
