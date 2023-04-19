import { RecipeType } from "@shared/types";

export function validateRecipeFormat(recipe: RecipeType): boolean {
  return (
    (!!recipe.title && typeof recipe.title === 'string') &&
    (!!recipe.slug && typeof recipe.slug === 'string') &&
    (!!recipe.image && typeof recipe.image === 'string') &&
    (!!recipe.servings && typeof recipe.servings === 'number' && recipe.servings > 0) &&
    (!!recipe.prep_time && typeof recipe.prep_time === 'number' && recipe.prep_time > 0) &&
    (!!recipe.cook_time && typeof recipe.cook_time === 'number' && recipe.cook_time > 0) &&
    (!!recipe.required_ingredients && Array.isArray(recipe.required_ingredients) && recipe.required_ingredients.every(({ value }) => (!!value && typeof value === "string"))) &&
    (!!recipe.directions && Array.isArray(recipe.directions) && recipe.directions.every(({ value }) => (!!value && typeof value === "string")))
  )
}