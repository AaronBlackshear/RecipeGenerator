import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes"
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { Page } from '@components/Page'
import { Nunito_Sans } from 'next/font/google'
import '@/styles/globals.css'

const nunitoSans = Nunito_Sans({ weight: ["300", "400", "600", "700", "800"], subsets: ['latin'], style: ['normal', 'italic'], })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <div className={nunitoSans.className}>
        <UserProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </UserProvider>
      </div>
    </ThemeProvider>
  )
}

export const getServerSideProps = withPageAuthRequired();
