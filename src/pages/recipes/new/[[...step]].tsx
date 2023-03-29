import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { RecipeForm } from '@components/RecipeForm'
import { RecipeFormStep, RECIPE_FORM_STEPS } from '@components/RecipeForm/RecipeFormNav';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'

type Props = {
  step: RecipeFormStep;
}

export default withPageAuthRequired(function Page({ step }: Props) {
  return (
    <div>
      <RecipeForm step={step} />
    </div>
  )
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      step: params?.step?.[0] || 'title',
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = RECIPE_FORM_STEPS.map((step) => ({
    params: { step: [step] }
  })).concat([{ params: { step: [] } }])

  return {
    paths,
    fallback: false,
  }
}