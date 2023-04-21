import { Recipe } from "@prisma/client";

export function validateRecipeFormat(recipe: Recipe): boolean {
  return (
    (!!recipe.title && typeof recipe.title === 'string') &&
    (!!recipe.slug && typeof recipe.slug === 'string') &&
    (!!recipe.image && typeof recipe.image === 'string') &&
    (!!recipe.servings && typeof recipe.servings === 'number' && recipe.servings > 0) &&
    (!!recipe.prepTime && typeof recipe.prepTime === 'number' && recipe.prepTime > 0) &&
    (!!recipe.cookTime && typeof recipe.cookTime === 'number' && recipe.cookTime > 0) &&
    (!!recipe.requiredIngredients && Array.isArray(recipe.requiredIngredients) && recipe.requiredIngredients.every((value) => (!!value && typeof value === "string"))) &&
    (!!recipe.directions && Array.isArray(recipe.directions) && recipe.directions.every((value) => (!!value && typeof value === "string")))
  )
}