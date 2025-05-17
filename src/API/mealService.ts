import axios, { AxiosResponse } from "axios";
import { Meal, MealApiResponse } from "../types/meal";

/**
 * Async Function to fetch full info about particular meal by its id
 * @param mealId Meal id as string from https://www.themealdb.com/
 * @returns Meal object as Promise<Meal>
 */
export async function fetchMealData(mealId: string): Promise<Meal> {
  const response: AxiosResponse<MealApiResponse> = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );

  if (!response.data.meals?.[0]) {
    throw new Error(`Meal ${mealId} does not exist.`);
  }

  return response.data.meals[0];
}

/**
 * Async Function to fetch all meals belonging to specified area
 * @param area Location of meals as string e.g. "American", "British", "Canadian", "Italian" etc. full list at https://www.themealdb.com/api/json/v1/1/list.php?a=list
 * @returns Array of meals belonging to specified area as Promise<Meal[]>
 */
export async function fetchMealsByArea(area: string): Promise<Meal[]> {
  const response: AxiosResponse<MealApiResponse> = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  if (!response.data.meals) {
    throw new Error(`No meals found for this area: ${area}`);
  }

  return response.data.meals;
}
