import React from 'react'
import { IconProps } from '@components/Icons'
import { IconBase } from '@components/Icons/IconBase';

export function XMarkOutline({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </IconBase>
  )
}
