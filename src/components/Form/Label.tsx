import React from 'react'

type Props = {
  children: React.ReactNode;
}

export function Label({ children }: Props) {
  return (
    <p className="text-gray-3 mb-1">{children}</p>
  )
}
