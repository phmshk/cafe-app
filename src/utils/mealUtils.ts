import { Meal } from "../types/meal";
import { faker } from "@faker-js/faker";

export function getMealIngredients(
  meal: Meal | null,
  maxCount: number = 20
): String[] {
  const mealIngredients: String[] = [];

  if (!meal) return mealIngredients;

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      mealIngredients.push(ingredient);
    }
  }

  if (mealIngredients.length > maxCount) {
    return mealIngredients.slice(0, maxCount);
  }

  return mealIngredients;
}

export function setMealPrice(meal: Meal): Meal {
  return {
    ...meal,
    mealPrice: faker.commerce.price({
      min: 5,
      max: 15,
      dec: 2,
      symbol: "€",
    }),
  };
}

export function getMealCategories(meals: Meal[]): string[] {
  return meals.map((meal) => meal.strCategory);
}
