import { CartMealObj, Meal, SortedMealsObj } from "../types/meal";
import { faker } from "@faker-js/faker";

/**
 * Function to get number of ingredients <= 20 from provided object of type Meal.
 * @param meal Meal object to get ingredients from
 * @param maxCount Number of ingredients to get from an object (max. - 20)
 * @returns Array of ingredients as strings.
 */
export function getMealIngredients(
  meal: Meal,
  maxCount: number = 20
): String[] {
  const mealIngredients: String[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    //adding only existing ingredients, no emty strings etc.
    if (ingredient) {
      mealIngredients.push(ingredient);
    }
  }

  //if more than 20 ingredients, return only first 20.
  if (mealIngredients.length > maxCount) {
    return mealIngredients.slice(0, maxCount);
  }

  return mealIngredients;
}

/**
 * Function to set random price between 5 and 15 for provided meal object
 * @param meal Object of type Meal
 * @returns The same object with price property
 */
export function setMealPrice(meal: Meal): Meal {
  return {
    ...meal,
    mealPrice: Number(
      faker.commerce.price({
        min: 5,
        max: 15,
        dec: 2,
      })
    ),
  };
}

/**
 * Function to get sorted array of meal categories.
 * @param meals Array of meal objects
 * @returns Sorted array of meal categories from provided array of objects.
 */
export function getMealCategories(meals: Meal[]): string[] {
  const categories = meals.map((meal) => meal.strCategory);
  //filtering duplicates
  const filteredCategories = [...new Set(categories)].sort();

  return filteredCategories;
}

/**
 * Function to sort meals by category and save them in an object of type (key: category): [array of corresponding meals].
 * @param meals Array of meal objects
 * @returns Object containing categories with arrays of corresponding meals.
 */
export function sortMealsByCategory(meals: Meal[]): SortedMealsObj {
  const sortedObj: SortedMealsObj = {};
  meals.forEach((meal) => {
    //if category already present in the object, adds meal to existing array, otherwise creates new field and assigns new array to it
    if (sortedObj[meal.strCategory]) {
      sortedObj[meal.strCategory] = [...sortedObj[meal.strCategory], meal];
    } else {
      sortedObj[meal.strCategory] = [meal];
    }
  });
  return sortedObj;
}

/**
 * Function to get multiplied meal price.
 * @param x Integer to multiply by
 * @param mealPrice
 * @returns Meal price multiplied by number
 */
export function multiplyMealPriceBy(x: number, mealPrice: number): number {
  return mealPrice * x;
}

/**
 * Function to calculate the total price of the meals in the cart.
 * @param cart Array of CartMeal objects {meal: Meal, qty: number}
 * @returns Total price of the meals in the cart
 */
export function calcCartPrice(cart: CartMealObj[]): number {
  let sum = 0;
  cart.forEach((item) => {
    sum += multiplyMealPriceBy(item.qty, item.meal.mealPrice!);
  });

  return Number(sum.toFixed(2));
}

/**
 * Function to get formatted price of the meal in EUR
 * @param price Price of the meal
 * @returns Formatted price of the meal as string
 */
export function getFormattedMealPrice(price: number): string {
  const intl = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  });

  return intl.format(price);
}
