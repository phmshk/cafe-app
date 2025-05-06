import axios, { AxiosResponse } from "axios";
import { Meal, MealApiResponse } from "../types/meal";

export async function fetchMealData(mealId: string): Promise<Meal> {
  const response: AxiosResponse<MealApiResponse> = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );

  if (!response.data.meals?.[0]) {
    throw new Error(`Meal ${mealId} does not exist.`);
  }

  return response.data.meals[0];
}

export async function fetchMealsByArea(area: string): Promise<Meal[]> {
  const response: AxiosResponse<MealApiResponse> = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  if (!response.data.meals) {
    throw new Error(`No meals found for this area: ${area}`);
  }

  return response.data.meals;
}
