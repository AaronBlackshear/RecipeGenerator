import { RecipePage } from '@components/Recipe';
import { RecipeForm } from '@components/RecipeForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { recipeFormSchema } from '@page_impls/RecipeFormPage/formSchema';
import { Recipe } from '@prisma/client';
import { useWindowWidth } from '@react-hook/window-size';
import { buildRecipePage, separateRecipeDirections } from '@utils/recipe';
import { Nullable } from '@utils/types';
import React, { useMemo } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import slugify from 'slugify';

export type FormInputs = {
  title: string;
  image: Nullable<string>;
  servings: number;
  prepTime: number;
  cookTime: number;
  requiredIngredients: { value: string }[];
  optionalIngredients: { value: string }[];
  directions: { value: string }[];
}

type Props = {
  recipe?: Recipe;
}

export function RecipeFormPage({ recipe }: Props) {
  const width = useWindowWidth({ wait: 250 });
  const form = useForm<FormInputs>({
    defaultValues: {
      ...getInitialFormState(recipe)
    },
    resolver: yupResolver(recipeFormSchema)
  });

  const showFullPreview = width >= 1280;

  return (
    <div className="flex items-start gap-x-4">
      <div className="flex-1 bg-gray-12 p-2 rounded-lg">
        <RecipeForm form={form} />
      </div>

      {/* SHOW PREVIEW ON DESKTOP */}
      {showFullPreview && <RecipePreview form={form} />}
    </div>
  )
}

type RecipePreviewProps = {
  form: UseFormReturn<FormInputs>;
}

function RecipePreview({ form }: RecipePreviewProps) {
  const formValues = form.watch()
  const recipe = useMemo(() => mockRecipe(formValues), [formValues])
  const recipeDirectionPages = useMemo(() => separateRecipeDirections(recipe), [recipe]);

  return (
    <div className="flex flex-col gap-y-3">
      {recipeDirectionPages.length ? recipeDirectionPages.map((page, i) => (
        <RecipePage key={i} recipe={buildRecipePage(recipe, page.directions)} directionsStartIndex={page.directionsIndex} />
      )) : (
        <RecipePage recipe={recipe} />
      )}
    </div>
  )

  function mockRecipe(formState: FormInputs): Recipe {
    return {
      id: 'mock_id',
      slug: slugify(formState.title || ''),
      userId: 'mock_user_id',
      createdAt: new Date(),
      updatedAt: new Date(),
      title: formState.title || '',
      image: formState.image || '',
      servings: formState.servings,
      prepTime: formState.prepTime,
      cookTime: formState.cookTime,
      requiredIngredients: formState.requiredIngredients.map(({ value }) => value),
      optionalIngredients: formState.optionalIngredients?.map(({ value }) => value) || [],
      directions: formState.directions.map(({ value }) => value),
    }
  }
}

function getInitialFormState(recipe?: Recipe): FormInputs {
  if (recipe) {
    return {
      image: recipe.image,
      title: recipe.title,
      servings: recipe.servings,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      requiredIngredients: recipe.requiredIngredients.map(ingredient => ({ value: ingredient })),
      optionalIngredients: recipe.optionalIngredients.map(ingredient => ({ value: ingredient })),
      directions: recipe.directions.map(direction => ({ value: direction })),
    }
  }

  return {
    image: null,
    title: '',
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    requiredIngredients: [],
    optionalIngredients: [],
    directions: [],
  }
}
