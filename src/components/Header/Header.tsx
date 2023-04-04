import { Button, ButtonLink } from '@components/Button';
import { useTheme } from '@hooks'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center px-8 py-6">
      <Link href="/" className="">
        <Image src={isDark ? "/logo/logo_full_white.svg" : "/logo/logo_full_black.svg"} alt="Recipe Generator" height={35} width={260} />
      </Link>

      <div className="flex items-center justify-end gap-6">
        <Button variant="minimal" icon={isDark ? 'sunOutline' : 'moonOutline'} onClick={toggleTheme} />
        <ButtonLink variant='primary' size="md" href="/api/auth/logout">Logout</ButtonLink>
      </div>
    </header>
  )
}