import React from 'react'
import { IconProps } from '@components/Icons'
import { IconBase } from '@components/Icons/IconBase';

export function ArrowLeftOutline({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </IconBase>
  )
}
