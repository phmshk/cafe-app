import useMealData from "../hooks/useMealData";
import getMealIngredients from "../utils/getMealIngredients";

function Meal({ mealId }) {
  const { meal, isLoading, error } = useMealData(mealId);

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div>An Error Occured: {error.message}</div>;
  if (!meal) return <div>No meal found</div>;

  const ingredients = getMealIngredients(meal, 3);

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
}

export default Meal;
