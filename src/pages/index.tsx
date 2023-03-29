import Head from 'next/head'
import axios from 'axios'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
// Components
import { RecipeCondensed } from '@components/Recipe';

import { RecipeType } from '@components/Recipe';
import { ButtonLink } from '@components/Button';

type Props = {
  recipes: RecipeType[];
}

export default function Home({ recipes }: Props) {
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
            <RecipeCondensed key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps() {
    const response = await axios.get(`${process.env.BASE_URL}/api/recipes`)
    const { recipes } = await response.data;
    return {
      props: {
        recipes,
      }
    };
  }
});