function getMealIngredients(meal, count = 20) {
  const mealIngredients = [];
  if (!meal) return mealIngredients;
  for (let i = 1; i <= 20; i++) {
    const ingredient = "strIngredient" + i;
    if (meal[ingredient]) {
      mealIngredients.push(meal[ingredient]);
    }
  }
  if (mealIngredients.length > count) {
    return mealIngredients.slice(0, count);
  }

  return mealIngredients;
}

export default getMealIngredients;
