import React from 'react'

type Props = {
  children: React.ReactNode;
}

export function Label({ children }: Props) {
  return (
    <p className="text-white">{children}</p>
  )
}
