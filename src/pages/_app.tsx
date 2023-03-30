import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Page } from '@components/Page'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </UserProvider>
  )
}

export const getServerSideProps = withPageAuthRequired();
