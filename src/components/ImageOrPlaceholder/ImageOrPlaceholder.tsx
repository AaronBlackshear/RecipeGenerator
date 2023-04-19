import React from 'react'
import Image, { ImageProps } from 'next/image'
import { Icon } from '@components/Icons'

export function ImageOrPlaceholder(props: ImageProps) {
  if (!props.src) {
    return (
      <div className="image-placeholder relative w-full h-full rounded overflow-hidden text-gray-8 bg-gray-10 flex justify-center items-center" data-testid="image-or-placeholder_placeholder">
        <Icon type="photoSolid" size="lg" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full rounded overflow-hidden" data-testid="image-or-placeholder_image-wrapper">
      <Image {...props} fill className='object-cover' data-testid="image-or-placeholder_image" />
    </div>
  )
}
