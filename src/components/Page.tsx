import React from 'react'
import { Header } from '@components/Header';

type Props = {
  children: React.ReactNode;
}

export function Page({ children }: Props) {
  return (
    <div className="w-full h-full min-h-screen bg-gray-900">
      <Header />
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  )
}
