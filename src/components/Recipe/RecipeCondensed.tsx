import { Recipe } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  recipe: Recipe;
}

export function RecipeCondensed({ recipe }: Props) {
  return (
    <Link href={`/recipes/${recipe.slug}`}>
      <div className="flex flex-row gap-x-2 rounded bg-slate-800 p-2">
        <div className="w-14 h-14 rounded overflow-hidden relative">
          <Image src={recipe.image} alt={recipe.title} fill className='object-cover' />
        </div>

        <section className="flex flex-col justify-center items-start">
          <p className="text-white text-base">{recipe.title}</p>
          <div className="text-gray-400 text-sm">
            <span>{recipe.servings} servings</span>
            <span> | </span>
            <span>{recipe.prepTime}</span>
            <span> | </span>
            <span>{recipe.cookTime}</span>
          </div>
        </section>
      </div>
    </Link>
  )
}
