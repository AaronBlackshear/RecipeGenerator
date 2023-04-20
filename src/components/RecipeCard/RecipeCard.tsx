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
      "flex h-20 rounded-2xl overflow-hidden bg-gray-12 justify-start items-center",
    )}>
      <section className="ratio ratio-square h-full w-20 overflow-hidden relative">
        <Image src={recipe.image} alt={recipe.title} fill className='object-cover' />
      </section>

      <section className="p-2 space-y-1">
        <div className="flex justify-between items-center space-x-2">
          <p className="body-bold text-gray-2">
            {recipe.title}
          </p>
        </div>

        <p className="caption text-gray-6">
          <span>6 servings</span>
          <span> | </span>
          <span>25min Prep</span>
          <span> | </span>
          <span>35min Cook</span>
        </p>
      </section>
    </Link>
  )
}
