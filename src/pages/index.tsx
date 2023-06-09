import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { HomePage } from '@page_impls/HomePage';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Recipe Generator</title>
        <meta name="description" content="Personal recipe Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/favicon_white.svg" />
      </Head>
      <HomePage />
    </>
  )
}

export const getServerSideProps = withPageAuthRequired();