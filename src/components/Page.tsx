import React from 'react'
import { Header } from '@components/Header';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';

type Props = {
  children: React.ReactNode;
}

export function Page({ children }: Props) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (!user && !isLoading) router.push('/api/auth/login')

  return (
    <div className="w-full h-full min-h-screen bg-white dark:bg-offBlack">
      <Header />

      <div className="px-8 pb-10 mt-8 mx-auto">
        {children}
      </div>
    </div>
  )
}
