import React from 'react'
import { MagnifyingGlassOutline } from '@components/Icons/MagnifyingGlassOutline'
import { SunOutline } from '@components/Icons/SunOutline'
import { MoonOutline } from '@components/Icons/MoonOutline'
import { ArrowLeftOutline } from '@components/Icons/ArrowLeftOutline'
import { ArrowRightOutline } from '@components/Icons/ArrowRightOutline'
import { ButtonSize } from '@components/Button';

export type IconProps = {
  size: ButtonSize;
};

export type IconType =
  'magnifyingGlassIcon' |
  'sunOutline' |
  'moonOutline' |
  'arrowLeftOutline' |
  'arrowRightOutline';

type Props = {
  type: IconType;
  size: ButtonSize;
};

export function Icon({ type, size = "md" }: Props): JSX.Element {
  switch (type) {
    case 'magnifyingGlassIcon':
      return <MagnifyingGlassOutline size={size} />

    case 'sunOutline':
      return <SunOutline size={size} />

    case 'moonOutline':
      return <MoonOutline size={size} />

    case 'arrowLeftOutline':
      return <ArrowLeftOutline size={size} />

    case 'arrowRightOutline':
      return <ArrowRightOutline size={size} />
  }
}
