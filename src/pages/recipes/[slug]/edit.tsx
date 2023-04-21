import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { ComponentOrLoader } from '@components/ComponentOrLoader';
import { useRecipe } from '@hooks/recipe/queries';
import { RecipeFormPage } from '@page_impls/RecipeFormPage';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Page() {
  const { query } = useRouter();
  const { isLoading, recipe } = useRecipe(query.slug as string)

  return (
    <>
      <Head>
        <title>Recipe Generator</title>
        <meta name="description" content="Personal recipe Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/favicon_white.svg" />
      </Head>
      <ComponentOrLoader data={!isLoading ? { recipe } : null} Component={RecipeFormPage} />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired();