import { useEffect, useState } from "react";
import { fetchMealData, fetchMealsByArea } from "../API/mealService";
import { Meal } from "../types/meal";
import { setMealPrice } from "../utils/mealUtils";

type UseMealsDataResult = {
  meals: Meal[];
  isLoading: boolean;
  error: string | null;
};

function useMealsData(area: string): UseMealsDataResult {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadMeals = async (area: string) => {
    const meals = await fetchMealsByArea(area);
    return meals;
  };
  const loadMealData = async (id: string) => {
    const mealData = await fetchMealData(id);
    const mealWithPrice = setMealPrice(mealData);
    return mealWithPrice;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await loadMeals(area);
        const fullData = await Promise.all(
          data.map(async (meal) => {
            const result = await loadMealData(meal.idMeal);
            return result;
          })
        );
        setMeals(fullData);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  return { meals, isLoading, error };
}
export default useMealsData;
