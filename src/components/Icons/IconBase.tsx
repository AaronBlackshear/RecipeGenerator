import { ButtonSize } from '@components/Button';
import react from 'react';

export type IconBaseProps = {
  size: ButtonSize;
  children: React.ReactNode;
};

export function IconBase({ children, size }: IconBaseProps) {
  const iconSizeStyles = getIconSizeStyles(size);
  return (
    <div className={`flex justify-center items-center ${iconSizeStyles}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
        {children}
      </svg>
    </div>
  )
}

function getIconSizeStyles(size: ButtonSize): string {
  switch (size) {
    case 'sm':
      return 'w-4 h-4';

    case 'md':
      return 'w-8 h-8';

    case 'lg':
      return 'w-10 h-10';

    case 'noPadding':
      return 'w-8 h-8';
  }
}