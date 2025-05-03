import { FC } from "react";
import MealCard from "./MealCard";
import LoadingSpinner from "./LoadingSpinner";
import useMealsData from "../hooks/useMealsData";

interface MenuProps {
  mealsOrigin: string;
}

const Menu: FC<MenuProps> = ({ mealsOrigin }) => {
  const { meals, isLoading, error } = useMealsData(mealsOrigin);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>An Error Occured: {error}</div>;
  if (!meals) return <div>No meal found</div>;

  return (
    <div className="p-4 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {meals.map(({ idMeal }) => (
          <MealCard key={idMeal} mealId={idMeal} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
