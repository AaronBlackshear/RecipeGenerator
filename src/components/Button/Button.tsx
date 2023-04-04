import React from 'react'
import { ButtonSize, ButtonVariant, getButtonStyles, getFontSpacingStyles } from '@components/Button';
import { Icon, IconType } from '@components/Icons';

export type ButtonBaseProps = {
  children?: React.ReactNode;
  variant: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonBaseProps;

export function Button({ children, variant, size = 'md', icon, ...props }: ButtonProps) {
  const buttonStyles = getButtonStyles({ variant, size })
  const buttonFontStyles = getFontSpacingStyles(size)

  return (
    <button className={`flex items-center rounded-xl border border-gray-11 ${buttonStyles}`} {...props}>
      {icon && <Icon type={icon} size={size} />}
      {children && <span className={buttonFontStyles}>{children}</span>}
    </button>
  )
}
