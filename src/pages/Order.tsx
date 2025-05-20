import { FC, useEffect, useState } from "react";
import useMealsData from "../hooks/useMealsData";
import { SortedMealsObj } from "../types/meal";
import { getMealCategories, sortMealsByCategory } from "../utils/mealUtils";
import Wrapper from "../components/Wrapper";
import SidePanel from "../components/SidePanel";
import OrderCategories from "../components/Order/OrderCategories";
import Menu from "../components/Order/Menu";

interface OrderProps {
  mealsOrigin: string;
}

const Order: FC<OrderProps> = ({ mealsOrigin }) => {
  const { meals, isLoading, error } = useMealsData(mealsOrigin);
  const [sortedMeals, setSortedMeals] = useState<SortedMealsObj>({});
  const [categories, setCategories] = useState<string[]>([]);

  //Runs every time meals array updates
  useEffect(() => {
    if (meals) {
      setSortedMeals(sortMealsByCategory(meals));
      setCategories([...new Set(getMealCategories(meals))]);
    }
  }, [meals]);

  /**
   * Function to use to scroll into a specified section on the page with the same Id as clicked area
   * @param e Click event
   * @param category Id of section corresponting to the name of clicked area
   */
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
          </div>
        </Wrapper>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16 mb-4 ">
        <Wrapper>
          <div className="mt-32 mb-4 h-[calc(100dvh-5rem)]">
            An Error Occured: {error}
          </div>
        </Wrapper>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="flex gap-8 py-4 relative">
        <SidePanel title="Categories">
          <OrderCategories
            categories={categories}
            scrollIntoSection={scrollIntoSection}
          />
        </SidePanel>
        <Menu
          origin={mealsOrigin}
          meals={sortedMeals}
          categories={categories}
        />
      </div>
    </Wrapper>
  );
};

export default Order;
