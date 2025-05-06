import { fetchMealData } from "../API/mealService";
import { Meal } from "../types/meal";
import { setMealPrice } from "../utils/mealUtils";
import useFetchData from "./useFetchData";

type UseMealDataResult = {
  meal: Meal | null;
  isLoading: boolean;
  error: string | null;
};

function useMealData(mealId: string): UseMealDataResult {
  const loadMealData = async (id: string) => {
    const mealData = await fetchMealData(id);
    const mealWithPrice = setMealPrice(mealData);
    return mealWithPrice;
  };
  const { data, isLoading, error } = useFetchData(loadMealData, mealId);

  return { meal: data, isLoading, error };
}

export default useMealData;
