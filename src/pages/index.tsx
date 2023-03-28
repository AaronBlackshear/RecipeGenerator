import Head from 'next/head'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
// Components
import { RecipeCondensed } from '@components/Recipe';

import { recipes } from '../data';
import { ButtonLink } from '@components/Button';

type Props = {}

export default function Home({ }: Props) {
  const { error } = useUser();

  if (error) throw new Error(error.message);

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
            <RecipeCondensed key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired();