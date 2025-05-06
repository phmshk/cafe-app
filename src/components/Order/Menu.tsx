import { FC } from "react";
import MealCard from "../MealCard";
import { Meal } from "../../types/meal";

interface MenuProps {
  meals: Meal[];
}

const Menu: FC<MenuProps> = ({ meals }) => {
  return (
    <div className="p-4 rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
