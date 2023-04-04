import React from 'react'
import { ButtonBaseProps, getButtonStyles, getFontSpacingStyles } from '@components/Button';
import Link, { LinkProps } from 'next/link';

type ButtonLinkProps = LinkProps & ButtonBaseProps;

export function ButtonLink({ children, variant, size = 'md', ...props }: ButtonLinkProps) {
  const buttonStyles = getButtonStyles({ variant, size })
  const buttonFontStyles = getFontSpacingStyles(size)

  return (
    <Link {...props} className={`flex items-center rounded-xl ${buttonStyles}`}>
      <span className={buttonFontStyles}>{children}</span>
    </Link>
  )
}
