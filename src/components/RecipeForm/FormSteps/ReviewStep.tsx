import React from 'react'
import { useFormState, useFormStateDispatch } from '@components/RecipeForm/FormSteps/FormContext';
import { Recipe } from '@components/Recipe/Recipe';
import { RecipeType } from '@components/Recipe';
import slugify from 'slugify';

export function ReviewStep() {
  const recipe = useFormState();

  return (
    <div>
      <Recipe recipe={mockRecipe()} />
    </div>
  )

  function mockRecipe(): RecipeType {
    return {
      _id: 'temp_id',
      slug: slugify(recipe.title),
      title: recipe.title,
      image: recipe.image || '',
      servings: recipe.servings,
      prep_time: recipe.prepTime,
      cook_time: recipe.cookTime,
      required_ingredients: recipe.requiredIngredients,
      optional_ingredients: recipe.optionalIngredients,
      directions: recipe.directions,
      notes: recipe.notes,
    }
  }
}
