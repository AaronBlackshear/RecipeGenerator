import { Button } from '@components/Button';
import { RecipeType } from '@shared/types';
import { getRecipeUrl } from '@utils/url_app';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {
  recipe: RecipeType;
}

export function RecipeCard({ recipe }: Props) {
  return (
    <Link href={getRecipeUrl(recipe.slug)} className={classNames(
      "flex flex-col w-64 rounded-2xl overflow-hidden bg-gray-12 mx-1",
    )}>
      <section className="ratio ratio-square w-full rounded overflow-hidden relative">
        <Image src={recipe.image} alt={recipe.title} fill className='object-cover' />
      </section>

      <section className="p-4 space-y-2">
        <p className="caption text-gray-6">
          <span>6 servings</span>
          <span> | </span>
          <span>25min Prep</span>
          <span> | </span>
          <span>35min Cook</span>
        </p>

        <div className="w-full flex justify-between items-center space-x-2">
          <p className="body-bold text-gray-2 overflow-ellipsis whitespace-nowrap overflow-hidden">{recipe.title}</p>
          <Button variant="favorite" iconLeft="heartOutline" size="sm" onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            // TODO: Handle Favorite
          }} />
        </div>
      </section>
    </Link>
  )
}
