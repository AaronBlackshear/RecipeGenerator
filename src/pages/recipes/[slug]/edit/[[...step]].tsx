import { RecipeForm } from '@components/RecipeForm'
import { RecipeFormStep } from '@components/RecipeForm/RecipeFormNav';
import React from 'react'
import { RecipeType } from '@components/Recipe';
import { useRecipe } from '@hooks';
import { useRouter } from 'next/router';
import { getQuerySlug } from '@utils';
import { Nullable } from '@utils/types';
import { Loader } from '@components/Loader';

export default function Page() {
  const data = useApiBootData();

  if (!data) return <Loader />

  return (
    <div>
      <RecipeForm step={data.step} recipe={data.recipe} />
    </div>
  )
}

type ApiBootData = {
  step: RecipeFormStep;
  recipe: RecipeType;
  isLoading: boolean;
  isError: boolean;
}

function useApiBootData(): Nullable<ApiBootData> {
  const { query } = useRouter();
  const { recipe, isLoading, isError } = useRecipe(query.slug ? getQuerySlug(query) : undefined);

  const step = (query.step?.[0] || 'title') as RecipeFormStep;

  if (isLoading || !recipe) return null;
  if (isError) throw new Error(isError);

  return {
    step,
    recipe,
    isLoading,
    isError,
  }
}

