import React from 'react'
import { MagnifyingGlassOutline } from '@components/Icons/MagnifyingGlassOutline'
import { ButtonSize } from '@components/Button';

export type IconProps = {
  size: ButtonSize;
};

export type IconType = 'magnifyingGlassIcon';

type Props = {
  type: IconType;
  size: ButtonSize;
};

export function Icon({ type, size = "md" }: Props): JSX.Element {
  switch (type) {
    case 'magnifyingGlassIcon':
      return <MagnifyingGlassOutline size={size} />
  }
}
