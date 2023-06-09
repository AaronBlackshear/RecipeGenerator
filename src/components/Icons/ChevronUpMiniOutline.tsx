import React from 'react'
import { IconProps } from '@components/Icons'
import { IconBase } from '@components/Icons/IconBase';

export function ChevronUpMiniOutline({ size }: IconProps) {
  return (
    <IconBase size={size}>
      <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
    </IconBase>
  )
}
