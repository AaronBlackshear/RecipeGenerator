import React from 'react'

type Props = {
  children: React.ReactNode;
}

export function InputRow({ children }: Props) {
  return (
    <div className="flex flex-row justify-between space-x-4 w-full">
      {children}
    </div>
  )
}
