import { Recipe } from '@prisma/client';
import { getRecipeEditUrl } from '@utils/url_app';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: Props) {
  return (
    <Link href={getRecipeEditUrl(recipe.slug)} className={classNames(
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
          <span>{recipe.servings} servings</span>
          <span> | </span>
          <span>{recipe.prepTime} min Prep</span>
          <span> | </span>
          <span>{recipe.cookTime} min Cook</span>
        </p>
      </section>
    </Link>
  )
}
