import React from 'react'
import { MagnifyingGlassOutline } from '@components/Icons/MagnifyingGlassOutline'
import { SunOutline } from '@components/Icons/SunOutline'
import { MoonOutline } from '@components/Icons/MoonOutline'
import { ArrowLeftOutline } from '@components/Icons/ArrowLeftOutline'
import { ArrowRightOutline } from '@components/Icons/ArrowRightOutline'
import { HeartOutline } from '@components/Icons/HeartOutline'
import { HeartSolid } from '@components/Icons/HeartSolid'
import { ArrowUpTrayOutline } from '@components/Icons/ArrowUpTrayOutline'
import { XMarkOutline } from '@components/Icons/XMarkOutline'
import { PhotoSolid } from '@components/Icons/PhotoSolid'
import { ChevronUpMiniOutline } from '@components/Icons/ChevronUpMiniOutline'
import { ChevronDownMiniOutline } from '@components/Icons/ChevronDownMiniOutline'
import { TrashOutline } from '@components/Icons/TrashOutline'
import { ButtonSize } from '@components/Button';

export type IconProps = {
  size: ButtonSize;
};

export type IconType =
  'magnifyingGlassIcon' |
  'sunOutline' |
  'moonOutline' |
  'arrowLeftOutline' |
  'arrowRightOutline' |
  'heartOutline' |
  'heartSolid' |
  'arrowUpTrayOutline' |
  'xMarkOutline' |
  'photoSolid' |
  'chevronUpMiniOutline' |
  'chevronDownMiniOutline' |
  'trashOutline';

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

    case 'heartOutline':
      return <HeartOutline size={size} />

    case 'heartSolid':
      return <HeartSolid size={size} />

    case 'arrowUpTrayOutline':
      return <ArrowUpTrayOutline size={size} />

    case 'xMarkOutline':
      return <XMarkOutline size={size} />

    case 'photoSolid':
      return <PhotoSolid size={size} />

    case 'chevronUpMiniOutline':
      return <ChevronUpMiniOutline size={size} />

    case 'chevronDownMiniOutline':
      return <ChevronDownMiniOutline size={size} />

    case 'trashOutline':
      return <TrashOutline size={size} />
  }
}
