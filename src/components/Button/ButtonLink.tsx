import React from 'react'
import { ButtonBaseProps, getButtonStyles } from '@components/Button';
import Link, { LinkProps } from 'next/link';

type ButtonLinkProps = LinkProps & ButtonBaseProps;

export function ButtonLink({ children, variant, size, ...props }: ButtonLinkProps) {
  const buttonStyles = getButtonStyles({ variant, size })

  return (
    <Link {...props} className={`rounded ${buttonStyles}`}>{children}</Link>
  )
}
