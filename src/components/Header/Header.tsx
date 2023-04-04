import { ButtonLink } from '@components/Button';
import { useTheme } from '@hooks'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function Header() {
  const { isDark } = useTheme();

  return (
    <header className="flex justify-between items-center px-8 py-6">
      <Link href="/" className="">
        <Image src={isDark ? "/logo/logo_full_white.svg" : "/logo/logo_full_black.svg"} alt="Recipe Generator" height={35} width={260} />
      </Link>

      <ButtonLink variant='primary' size="md" href="/api/auth/logout">Logout</ButtonLink>
    </header>
  )
}