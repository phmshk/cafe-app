import { fetchMealsByArea } from "../API/mealService";
import { Meal } from "../types/meal";
import useFetchData from "./useFetchData";

type UseMealsDataResult = {
  meals: Meal[] | null;
  isLoading: boolean;
  error: string | null;
};

function useMealsData(area: string): UseMealsDataResult {
  const { data, isLoading, error } = useFetchData(fetchMealsByArea, area);

  return { meals: data, isLoading, error };
}
export default useMealsData;
