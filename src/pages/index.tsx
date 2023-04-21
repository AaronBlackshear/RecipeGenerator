import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { HomePage } from '@page_impls/HomePage';

export default function Page() {
  return (
    <HomePage />
  )
}

export const getServerSideProps = withPageAuthRequired();