import React from 'react'
import { IconProps } from '@components/Icons'
import { IconBase } from '@components/Icons/IconBase';

export function ChevronDownMiniOutline({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
    </IconBase>
  )
}
