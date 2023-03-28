export type ButtonVariant = 'primary' | 'secondary' | 'minimal' | 'redPrimary';
export type ButtonSize = 'sm' | 'base';

type GetButtonStylesProps = {
  variant: ButtonVariant;
  size?: ButtonSize;
}

export function getButtonStyles({ variant, size = 'base' }: GetButtonStylesProps) {
  return `${getVariantStyles(variant)} ${getSizeStyles(size)}`
}

function getVariantStyles(variant: ButtonVariant): string {
  switch (variant) {
    case 'primary':
      return 'bg-blue-600 text-white';

    case 'secondary':
      return 'bg-white text-blue-600'

    case 'minimal':
      return 'bg-transparent text-white';

    case 'redPrimary':
      return 'bg-red-600 text-white';
  }
}

function getSizeStyles(size: ButtonSize): string {
  switch (size) {
    case 'sm':
      return 'px-3 py-1';

    case 'base':
      return 'px-4 py-2'
  }
}