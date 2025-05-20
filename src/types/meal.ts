export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
  mealPrice?: number;
}

export interface MealApiResponse {
  meals: Meal[] | null;
}

export type SortedMealsObj = {
  [key: string]: Meal[];
};

export type CartMealObj = {
  meal: Meal;
  qty: number;
};
