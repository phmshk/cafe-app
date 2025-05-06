import { FC } from "react";
import Menu from "../components/Order/Menu";
import SidePanel from "../components/SidePanel";
import Wrapper from "../components/Wrapper";
import OrderCategories from "../components/Order/OrderCategories";
import LoadingSpinner from "../components/LoadingSpinner";
import useMealsData from "../hooks/useMealsData";
import { getMealCategories } from "../utils/mealUtils";

interface OrderProps {
  mealsOrigin: string;
}

const Order: FC<OrderProps> = ({ mealsOrigin }) => {
  const { meals, isLoading, error } = useMealsData(mealsOrigin);
  const categories = [...new Set(getMealCategories(meals))];

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>An Error Occured: {error}</div>;
  }
  if (!meals) {
    return <div>No meals found</div>;
  }

  return (
    <Wrapper>
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-4 min-h-screen py-4">
        <SidePanel title="Categories">
          <OrderCategories categories={categories} />
        </SidePanel>
        <Menu meals={meals} />
        <SidePanel title="Cart">
          <div></div>
        </SidePanel>
      </div>
    </Wrapper>
  );
};

export default Order;
