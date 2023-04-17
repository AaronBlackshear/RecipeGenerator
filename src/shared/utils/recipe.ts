import { RecipeType } from "@shared/types";
import { isArrayOf } from "@shared/utils";

export function validateRecipeFormat(recipe: RecipeType): boolean {
  return (
    (!!recipe.title && typeof recipe.title === 'string') &&
    (!!recipe.slug && typeof recipe.title === 'string') &&
    (!!recipe.image && typeof recipe.title === 'string') &&
    (!!recipe.servings && typeof recipe.title === 'number' && recipe.servings > 0) &&
    (!!recipe.prep_time && typeof recipe.title === 'number' && recipe.prep_time > 0) &&
    (!!recipe.cook_time && typeof recipe.title === 'number' && recipe.cook_time > 0) &&
    (!!recipe.required_ingredients && isArrayOf(recipe.required_ingredients, "string")) &&
    (!!recipe.directions && isArrayOf(recipe.directions, "string"))
  )
}