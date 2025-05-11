import { FC, useEffect, useState } from "react";
import Menu from "../components/Order/Menu";
import SidePanel from "../components/SidePanel";
import Wrapper from "../components/Wrapper";
import OrderCategories from "../components/Order/OrderCategories";
import useMealsData from "../hooks/useMealsData";
import { getMealCategories, sortMealsByCategory } from "../utils/mealUtils";
import { SortedMealsObj } from "../types/meal";
import OrderCart from "../components/Cart/OrderCart";

interface OrderProps {
  mealsOrigin: string;
}

const Order: FC<OrderProps> = ({ mealsOrigin }) => {
  const { meals, isLoading, error } = useMealsData(mealsOrigin);
  const [sortedMeals, setSortedMeals] = useState<SortedMealsObj>({});
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (meals) {
      setSortedMeals(sortMealsByCategory(meals));
      setCategories([...new Set(getMealCategories(meals))]);
    }
  }, [meals]);

  const scrollIntoSection = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: string
  ) => {
    if (e.currentTarget.innerText.toLocaleLowerCase() === category) {
      document.getElementById(category)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="mt-16 mb-4 ">
        <Wrapper>
          <div className="flex gap-4 py-4 relative">
            <div className="skeleton p-4 rounded-2xl w-64 h-[calc(100dvh-5rem)]"></div>
            <div className="skeleton p-4 rounded-2xl w-full"></div>
            <div className="skeleton p-4 rounded-2xl w-64 h-[calc(100dvh-5rem)]"></div>
          </div>
        </Wrapper>
      </div>
    );
  }
  if (error) {
    return <div className="mt-16 mb-4">An Error Occured: {error}</div>;
  }
  if (!meals || meals.length === 0) {
    return <div className="mt-16 mb-4">No meals found</div>;
  }

  return (
    <div className="mt-16 mb-4">
      <Wrapper>
        <div className="flex gap-4 py-4 relative">
          <SidePanel title="Categories">
            <OrderCategories
              categories={categories}
              onClick={scrollIntoSection}
            />
          </SidePanel>
          <Menu
            origin={mealsOrigin}
            meals={sortedMeals}
            categories={categories}
          />
          <SidePanel title="Cart">
            <OrderCart items={meals} />
          </SidePanel>
        </div>
      </Wrapper>
    </div>
  );
};

export default Order;
