import { ButtonLink } from '@components/Button'
import { Search } from '@components/Search'
import { getRecipeNewUrl } from '@utils/url_app'
import React from 'react'

export function FilterBar() {
  return (
    <div className="w-full flex justify-between">
      <Search />

      <div className="">
        <ButtonLink href={getRecipeNewUrl()} variant="secondary">New Recipe</ButtonLink>
      </div>
    </div>
  )
}
