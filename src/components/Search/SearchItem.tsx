import { Combobox } from '@headlessui/react'
import { Recipe } from '@prisma/client'
import { Nullable } from '@utils/types'
import classNames from 'classnames'
import React from 'react'

export function SearchItem({ children, value }: { children: React.ReactNode, value: Nullable<Recipe> }) {
  return (
    <Combobox.Option value={value}>
      {({ active }) => (
        <p className={classNames(
          'body-small-bold px-4 py-1',
          active && 'bg-gray-11',
        )}>{children}</p>
      )}
    </Combobox.Option>
  )
}
