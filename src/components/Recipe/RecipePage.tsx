import { UpdatedRecipe } from '@shared/types';
import { DM_Serif_Display, Playfair_Display, Poppins } from 'next/font/google';
import Image from 'next/image';
import React from 'react';

const dmSerifDisplay = DM_Serif_Display({ weight: ['400'], subsets: ['latin'] });
const poppins = Poppins({ weight: ['400'], subsets: ['latin'] });
const playfairDisplay = Playfair_Display({ weight: ['400'], subsets: ['latin'] });

type Props = {
  recipe: UpdatedRecipe;
  directionsStartIndex?: number;
};

export function RecipePage({ recipe, directionsStartIndex = 0 }: Props) {
  const { image, title, servings, prepTime, cookTime, requiredIngredients, optionalIngredients, directions } = recipe;

  return (
    <div className="ratio ratio-standard w-[768px] h-[1152px]">
      <div className="flex flex-col w-full h-full bg-[#efeae7] p-10">
        <section className="flex justify-start items-center gap-x-6 mb-6">
          <div className="w-48 h-48 rounded overflow-hidden relative">
            <Image src={image} alt={title} fill className='object-cover' />
          </div>

          <div className="flex items-center flex-1 bg-white p-6 h-[150px]">
            <h1 className={`${dmSerifDisplay.className} text-4xl leading-snug`}>{title}</h1>
          </div>
        </section>

        <section className="flex flex-col flex-1 bg-[#f7f5f4] w-full p-6 pt-3">
          <div className={`${poppins.className} flex justify-between items-center pb-2 mb-2 border-b border-b-gray-400`}>
            <p className="text-base flex-1 text-left">Servings: {servings}</p>
            <p className="flex-1 text-center">Prepping Time: {prepTime} min</p>
            <p className="flex-1 text-right">Cooking Time: {cookTime} min</p>
          </div>

          <div className={`${playfairDisplay.className} flex flex-row flex-1 gap-x-8`}>
            <Section isIngredients heading='Ingredients'>
              <ul className="list-disc list-inside">
                {requiredIngredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>

              {optionalIngredients?.length ? (
                <div className="mt-8">
                  <h4 className="mb-1">Optional:</h4>
                  <ul className="list-disc list-inside">
                    {optionalIngredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Section>

            <Section heading='Directions'>
              <ol className="list-outside">
                {directions.map((direction, i) => (
                  <li key={i} className="text-base flex space-x-2">
                    <p className="w-5 text-right">{directionsStartIndex + i + 1}.</p>
                    <p className="flex-1">{direction}</p>
                  </li>
                ))}
              </ol>
            </Section>
          </div>
        </section>
      </div>
    </div>
  )
}

type SectionProps = {
  heading: string;
  isIngredients?: boolean;
  children: React.ReactNode;
}

function Section({ isIngredients, children, heading }: SectionProps) {
  return (
    <div className={isIngredients ? 'w-2/5' : 'flex-1'}>
      <h3 className={`${playfairDisplay.className} text-center text-2xl mb-6`}>{heading}</h3>

      {children}
    </div>
  )
}
