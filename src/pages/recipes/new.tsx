import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { RecipeFormPage } from '@page_impls/RecipeFormPage';
import React from 'react'

export default withPageAuthRequired(function Page() {
  return (
    <RecipeFormPage />
  )
})
