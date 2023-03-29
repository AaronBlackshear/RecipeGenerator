import React, { useEffect, useState } from 'react'
import axios from 'axios';
import slugify from 'slugify';
import { RecipeFormNav, RecipeFormStep } from '@components/RecipeForm/RecipeFormNav';
import { RecipeFormContent } from '@components/RecipeForm/RecipeFormContent';
import { StepNavigation } from './FormSteps/StepNavigation';
import { FormStateProvider, useFormState, FormState } from '@components/RecipeForm/FormSteps/FormContext';
import { RecipeType } from '@components/Recipe';
import { useRouter } from 'next/router';

type Props = {
  step: RecipeFormStep;
  recipe?: RecipeType;
}

function Content({ step, recipe }: Props) {
  const router = useRouter()
  const formState = useFormState();
  const [currentStep, setCurrentStep] = useState<RecipeFormStep>(step);

  console.log(formState);


  useEffect(() => {
    if (step !== currentStep) setCurrentStep(step);
  }, [step])

  return (
    <div className="flex space-x-4">
      <RecipeFormNav currentStep={currentStep} />

      <section className="flex-1 space-y-5">
        <RecipeFormContent currentStep={currentStep} />

        <StepNavigation step={currentStep} onSubmit={submitRecipe} />
      </section>
    </div>
  )

  async function submitRecipe() {
    const formattedRecipe = formatRecipe(formState);
    if (recipe?._id) {
      // Update recipe
      await axios.put(`/api/recipes/${recipe?._id}/edit`, {
        recipe: formattedRecipe,
      })
    } else {
      // Create recipe
      await axios.post('/api/recipes/new', {
        recipe: formattedRecipe,
      })
    }

    router.push(`/recipes/${formattedRecipe.slug}`)
  }

  function formatRecipe(recipe: FormState): Partial<RecipeType> {
    if (!recipe.image) throw new Error('Missing Image!');

    return ({
      title: recipe.title,
      slug: slugify(recipe.title),
      image: recipe.image,
      servings: recipe.servings,
      prep_time: recipe.prepTime,
      cook_time: recipe.cookTime,
      required_ingredients: recipe.requiredIngredients,
      optional_ingredients: recipe.optionalIngredients.length ? recipe.optionalIngredients : undefined,
      directions: recipe.directions,
      notes: recipe.notes ? recipe.notes : undefined,
    })
  }
}

export function RecipeForm({ recipe, ...props }: Props) {
  return (
    <FormStateProvider recipe={recipe}>
      <Content {...props} />
    </FormStateProvider>
  )
}
