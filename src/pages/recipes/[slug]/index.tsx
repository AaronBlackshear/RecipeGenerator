import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { RecipePage } from '@page_impls/RecipeShowPage';

export default function Page() {
  return (
    <RecipePage />
  )
}

export const getServerSideProps = withPageAuthRequired();