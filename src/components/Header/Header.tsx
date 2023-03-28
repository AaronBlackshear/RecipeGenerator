import Link from 'next/link'
import React from 'react'

type Props = {}

export function Header({ }: Props) {
  return (
    <div className="mb-4 pt-4 px-6">
      <header className="flex justify-between max-w-3xl mx-auto border-b border-b-white pb-2">
        <Link href="/">
          <h3 className="text-white font-bold text-2xl">Recipe Generator</h3>
        </Link>

        <Link href="/api/auth/logout" className="text-white">Logout</Link>
      </header>
    </div>
  )
}