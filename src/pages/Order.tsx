import { FC, useEffect, useState } from "react";
import Menu from "../components/Order/Menu";
import SidePanel from "../components/SidePanel";
import Wrapper from "../components/Wrapper";
import OrderCategories from "../components/Order/OrderCategories";
import LoadingSpinner from "../components/LoadingSpinner";
import useMealsData from "../hooks/useMealsData";
import { getMealCategories, sortMealsByCategory } from "../utils/mealUtils";
import { SortedMealsObj } from "../types/meal";

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

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>An Error Occured: {error}</div>;
  }
  if (!meals || meals.length === 0) {
    return <div>No meals found</div>;
  }

  return (
    <Wrapper>
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 py-4">
        <SidePanel title="Categories">
          <OrderCategories categories={categories} />
        </SidePanel>
        <Menu
          origin={mealsOrigin}
          meals={sortedMeals}
          categories={categories}
        />
        <SidePanel title="Cart">
          <div></div>
        </SidePanel>
      </div>
    </Wrapper>
  );
};

export default Order;
