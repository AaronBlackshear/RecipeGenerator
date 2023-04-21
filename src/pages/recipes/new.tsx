import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { RecipeFormPage } from '@page_impls/RecipeFormPage';
import React from 'react';

export default function Page() {
  return (
    <RecipeFormPage />
  )
}

export const getServerSideProps = withPageAuthRequired();
