import React from 'react'
import { ButtonSize, ButtonVariant, getButtonStyles } from '@components/Button';

export type ButtonBaseProps = {
  children: React.ReactNode;
  variant: ButtonVariant;
  size?: ButtonSize;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonBaseProps;

export function Button({ children, variant, size, ...props }: ButtonProps) {
  const buttonStyles = getButtonStyles({ variant, size })

  return (
    <button className={`rounded ${buttonStyles}`} {...props}>{children}</button>
  )
}
