import { Meal, SortedMealsObj } from "../types/meal";
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
  const categories = meals.map((meal) => meal.strCategory);
  const filteredCategories = [...new Set(categories)].sort();
  return filteredCategories;
}

export function sortMealsByCategory(meals: Meal[]) {
  const sortedObj: SortedMealsObj = {};
  meals.forEach((meal) => {
    if (sortedObj[meal.strCategory]) {
      sortedObj[meal.strCategory] = [...sortedObj[meal.strCategory], meal];
    } else {
      sortedObj[meal.strCategory] = [meal];
    }
  });
  return sortedObj;
}
