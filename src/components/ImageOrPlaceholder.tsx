import React from 'react'
import Image, { ImageProps } from 'next/image'

export function ImageOrPlaceholder(props: ImageProps) {
  if (!props.src) {
    return (
      <div className="w-48 h-48 rounded overflow-hidden relative bg-gray-700" />
    )
  }

  return (
    <div className="w-48 h-48 rounded overflow-hidden relative">
      <Image {...props} fill className='object-cover' />
    </div>
  )
}
