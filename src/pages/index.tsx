import Head from 'next/head'
// Components
import { RecipeCondensed } from '@components/Recipe';

import { RecipeType } from '@components/Recipe';
import { ButtonLink } from '@components/Button';
import { useRecipes } from '@hooks';
import { Nullable } from '@utils/types';
import { Loader } from '@components/Loader';

function Content({ recipes }: ApiBootData) {
  return (
    <>
      <Head>
        <title>Recipe Generator</title>
        <meta name="description" content="Personal recipe Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex justify-end mb-5">
          <ButtonLink href="/recipes/new" variant="primary">+ Create new recipe</ButtonLink>
        </div>

        <div className="flex flex-col gap-3">
          {recipes.map(recipe => (
            <RecipeCondensed key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </main>
    </>
  )
}

export default function Page() {
  const data = useApiBootData();

  if (!data) return <Loader />

  return <Content {...data} />
}

type ApiBootData = {
  recipes: RecipeType[];
}

function useApiBootData(): Nullable<ApiBootData> {
  const { recipes, isLoading, isError } = useRecipes();

  if (isLoading || !recipes.length) return null;
  if (isError) throw new Error(isError);

  return {
    recipes,
  }
}
