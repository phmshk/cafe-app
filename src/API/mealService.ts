import axios, { AxiosResponse } from "axios";
import { Meal, MealApiResponse } from "../types/meal";

export async function fetchMealData(mealId: string): Promise<Meal> {
  const response: AxiosResponse<MealApiResponse> = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );

  if (!response.data.meals?.[0]) {
    throw new Error("Meal not found.");
  }

  return response.data.meals[0];
}
