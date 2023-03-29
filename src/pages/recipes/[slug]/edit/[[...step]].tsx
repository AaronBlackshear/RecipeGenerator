import { RecipeForm } from '@components/RecipeForm'
import { RecipeFormStep, RECIPE_FORM_STEPS } from '@components/RecipeForm/RecipeFormNav';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import axios from 'axios'
import { RecipeType } from '@components/Recipe';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

type Props = {
  step: RecipeFormStep;
  recipe: RecipeType;
}

export default function Content({ step, recipe }: Props) {
  return (
    <div>
      <RecipeForm step={step} recipe={recipe} />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ params }) {
    if (!params?.slug) throw new Error('Missing slug');

    const response = await axios.get(`${process.env.BASE_URL}/api/recipes/${params.slug}`)
    const { recipe } = response.data

    return {
      props: {
        step: params?.step?.[0] || 'title',
        recipe,
      }
    }
  }
});
