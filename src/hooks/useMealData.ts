import { useEffect, useState } from "react";
import { fetchMealData } from "../API/mealService";
import { Meal } from "../types/meal";

interface UseMealDataResult {
  meal: Meal | null;
  isLoading: boolean;
  error: string | null;
}

function useMealData(mealId: string): UseMealDataResult {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMeal() {
      try {
        const mealData = await fetchMealData(mealId);
        setMeal(mealData);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    }

    if (mealId) {
      loadMeal();
    }
  }, [mealId]);

  return { meal, isLoading, error };
}

export default useMealData;
