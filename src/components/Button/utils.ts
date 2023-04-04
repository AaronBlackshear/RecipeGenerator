import classNames from "classnames";

export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'redPrimary' | 'redSecondary';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'noPadding';

type GetButtonStylesProps = {
  variant: ButtonVariant;
  size: ButtonSize;
}

export function getButtonStyles({ variant, size }: GetButtonStylesProps) {
  return `${getVariantStyles(variant)} ${getSizeStyles(size)}`
}

function getVariantStyles(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return 'bg-blue-5 hover:bg-blue-6 focus:outline-4 focus:outline-blue-10 outline-offset-0 disabled:bg-blue-8 outline-none text-white';

    case 'secondary':
      return classNames(
        'bg-transparent',
        'text-blue-5 dark:text-gray-8',
        'border border-gray-8 outline-none outline-offset-0',
        'hover:text-blue-6 dark:hover:text-blue-8 hover:border-blue-6 dark:hover:border-blue-8 focus:text-blue-3 dark:focus:text-blue-6 focus:border-blue-3 dark:focus:border-blue-6 focus:outline-blue-3 dark:focus:outline-blue-6 focus:outline-1',
        'disabled:border-gray-11 disabled:text-blue-8'
      )

    case 'link':
      return 'text-blue-5 hover:text-blue-6 focus:border-blue-6 focus:border-b outline-none rounded-none disabled:text-blue-8';

    case 'redPrimary':
      return 'bg-red-5 hover:bg-red-6 focus:outline-4 focus:outline-red-10 outline-offset-0 disabled:bg-red-8 outline-none text-white';

    case 'redSecondary':
      return 'bg-transparent text-red-5 border border-gray-11 outline-none outline-offset-0 hover:text-red-6 hover:border-red-6 focus:text-red-3 focus:border-red-3 focus:outline-red-3 focus:outline-1 disabled:border-gray-11 disabled:text-red-8'
  }
}

function getSizeStyles(size: ButtonSize): string {
  switch (size) {
    case 'sm':
      return 'p-2 button-sm';

    case 'md':
      return 'p-2 button-md'

    case 'lg':
      return 'px-4 py-2 button-lg'

    case 'noPadding':
      return 'p-0 button-md'
  }
}

export function getFontSpacingStyles(size: ButtonSize): string {
  switch (size) {
    case 'sm':
      return 'px-2';

    case 'md':
      return 'p-2'

    case 'lg':
      return 'p-2'

    case 'noPadding':
      return 'p-0'
  }
}