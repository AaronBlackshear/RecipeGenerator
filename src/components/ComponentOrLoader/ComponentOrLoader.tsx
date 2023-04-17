import { Loader } from '@components/Loader'
import { Nullable } from '@utils/types'
import React from 'react'

type Props<T> = {
  data: Nullable<T>;
  Component: React.ComponentType<T>;
}

export function ComponentOrLoader<T>({ data, Component }: Props<T>): JSX.Element {
  if (!data) return (
    <div className="w-full p-4 flex justify-center items-center">
      <Loader />
    </div>
  )

  return <Component {...data} />
}
