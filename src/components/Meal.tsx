import { FC } from "react";
import useMealData from "../hooks/useMealData";
import { getMealIngredients } from "../utils/mealUtils";

interface MealProps {
  mealId: string;
}

const Meal: FC<MealProps> = ({ mealId }) => {
  const { meal, isLoading, error } = useMealData(mealId);
  const ingredients = getMealIngredients(meal, 4);

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>An Error Occured: {error}</div>;
  if (!meal) return <div>No meal found</div>;

  return (
    <div className="card card-side bg-base-100 shadow-sm max-w-md flex">
      <figure className="flex-1/3">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
      </figure>
      <div className="card-body flex-2/3">
        <h2 className="card-title text-2xl">{meal.strMeal}</h2>
        <div>
          <h3>Ingredients:</h3>
          <p>{ingredients.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default Meal;
