import { CartMealObj, Meal } from "../types/meal";

export const getCartUpdate = (
  prev: CartMealObj[],
  meal: Meal,
  increaseBy: number
) => {
  const existingItem = prev.find((item) => item.meal.idMeal === meal.idMeal);

  if (existingItem) {
    return prev.map((item) =>
      item.meal.idMeal === meal.idMeal
        ? { ...item, qty: item.qty + increaseBy }
        : item
    );
  } else {
    return [...prev, { meal, qty: increaseBy }];
  }
};
