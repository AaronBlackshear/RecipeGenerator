import { Button, ButtonLink } from '@components/Button';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <Link href="/" className="">
        <Image src="/logo/logo_full_black.png" alt="Recipe Generator" height={35} width={260} />
      </Link>

      <div className="flex items-center justify-end gap-6">
        <ButtonLink variant='primary' size="md" href="/api/auth/logout">Logout</ButtonLink>
      </div>
    </header>
  )
}
