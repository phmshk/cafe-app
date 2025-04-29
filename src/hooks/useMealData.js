import axios from "axios";
import { useEffect, useState } from "react";

function useMealData(mealId) {
  const [meal, setMeal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeal(mealId) {
      try {
        const result = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const mealData = result.data.meals?.[0];
        if (!mealData) {
          throw new Error("Meal not found.");
        }
        setMeal(mealData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (mealId) {
      fetchMeal(mealId);
    }
  }, [mealId]);

  return { meal, isLoading, error };
}

export default useMealData;
