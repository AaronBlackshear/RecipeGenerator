import { RecipeForm } from '@components/RecipeForm'
import { RecipeFormStep } from '@components/RecipeForm/RecipeFormNav';
import React from 'react'
import { RecipeType } from '@shared/types';
import { useRecipe } from '@hooks/recipes';
import { useRouter } from 'next/router';
import { getQuerySlug } from '@utils/query';
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
  }
}

