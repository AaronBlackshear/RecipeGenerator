export type ButtonVariant = 'primary' | 'secondary' | 'minimal' | 'link' | 'redPrimary';
export type ButtonSize = 'sm' | 'md' | 'lg';

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
      return 'bg-blue-5 text-white';

    case 'secondary':
      return 'bg-transparent text-blue-5 border border-gray-11'

    case 'minimal':
      return 'bg-transparent text-gray-11 border border-gray-11';

    case 'link':
      return 'text-blue-6';

    case 'redPrimary':
      return 'bg-red-600 text-white';
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
  }
}