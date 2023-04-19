import React, { useMemo } from 'react'
import slugify from 'slugify'
import { useWindowWidth } from '@react-hook/window-size'
import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Recipe } from '@components/Recipe'
import { RecipeForm } from '@components/RecipeForm'
import { buildRecipePage, separateRecipeDirections } from '@utils/recipe'
import { RecipeType } from '@shared/types'
import { Nullable } from '@utils/types';
import { recipeFormSchema } from '@page_impls/RecipeFormPage/formSchema';

export type FormInputs = {
  title: string;
  image: Nullable<string>;
  servings: number;
  prepTime: number;
  cookTime: number;
  requiredIngredients: { value: string }[];
  optionalIngredients?: { value: string }[];
  directions: { value: string }[];
}

type Props = {
  recipe?: RecipeType;
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
  const recipeDirectionPages = useMemo(() => separateRecipeDirections(recipe), [formValues]);

  return (
    <div className="flex flex-col gap-y-3">
      {recipeDirectionPages.length ? recipeDirectionPages.map((page, i) => (
        <Recipe recipe={buildRecipePage(recipe, page.directions)} directionsStartIndex={page.directionsIndex} />
      )) : (
        <Recipe recipe={recipe} />
      )}
    </div>
  )

  function mockRecipe(formState: FormInputs): RecipeType {
    return {
      _id: 'mock_id',
      slug: slugify(formState.title || ''),
      title: formState.title || '',
      image: formState.image || '',
      servings: formState.servings,
      prep_time: formState.prepTime,
      cook_time: formState.cookTime,
      required_ingredients: formState.requiredIngredients,
      optional_ingredients: formState.optionalIngredients,
      directions: formState.directions,
    }
  }
}

function getInitialFormState(recipe?: RecipeType): FormInputs {
  if (recipe) {
    return {
      image: recipe.image,
      title: recipe.title,
      servings: recipe.servings,
      prepTime: recipe.prep_time,
      cookTime: recipe.cook_time,
      requiredIngredients: recipe.required_ingredients,
      optionalIngredients: recipe.optional_ingredients || undefined,
      directions: recipe.directions,
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
