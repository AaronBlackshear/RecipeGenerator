import React from 'react'
import Image, { ImageProps } from 'next/image'

export function ImageOrPlaceholder(props: ImageProps) {
  if (!props.src) {
    return (
      <div className="w-48 h-48 rounded overflow-hidden relative bg-gray-700" data-testid="image-or-placeholder_placeholder" />
    )
  }

  return (
    <div className="w-48 h-48 rounded overflow-hidden relative" data-testid="image-or-placeholder_image-wrapper">
      <Image {...props} fill className='object-cover' data-testid="image-or-placeholder_image" />
    </div>
  )
}
