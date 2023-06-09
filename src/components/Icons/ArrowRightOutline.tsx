import React from 'react'
import { IconProps } from '@components/Icons'
import { IconBase } from '@components/Icons/IconBase';

export function ArrowRightOutline({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </IconBase>
  )
}
