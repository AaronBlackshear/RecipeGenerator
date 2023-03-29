import { RecipeType } from '@components/Recipe';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react'
import { DM_Serif_Display, Poppins, Playfair_Display } from 'next/font/google'
import { toCanvas } from 'html-to-image';

const dmSerifDisplay = DM_Serif_Display({ weight: ['400'], subsets: ['latin'] });
const poppins = Poppins({ weight: ['400'], subsets: ['latin'] });
const playfairDisplay = Playfair_Display({ weight: ['400'], subsets: ['latin'] });

type Props = {
  recipe: RecipeType;
};

export function Recipe({ recipe }: Props) {
  const canvasRef = useRef<HTMLInputElement>(null);
  const recipeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (recipeRef.current === null || canvasRef.current === null) return;
    toCanvas(recipeRef.current, {
      width: 768,
      height: 1152,
    })
      .then(function (canvas) {
        if (!canvasRef.current?.innerHTML) {
          canvasRef.current?.append(canvas)
          recipeRef.current?.remove()
        }
      });
  }, [recipe])

  const { image, title, servings, prep_time, cook_time, required_ingredients, optional_ingredients, directions, notes } = recipe;

  return (
    <>
      <div ref={recipeRef} id="recipe-container" className="ratio-standard w-[768px] h-[1152px]">
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
              <p className="flex-1 text-center">Prepping Time: {prep_time} min</p>
              <p className="flex-1 text-right">Cooking Time: {cook_time} min</p>
            </div>

            <div className={`${playfairDisplay.className} flex flex-row flex-1 gap-x-8`}>
              <Section isIngredients heading='Ingredients'>
                <ul className="list-disc list-inside">
                  {required_ingredients.map((ingredient) => (
                    <li>{ingredient}</li>
                  ))}
                </ul>

                {optional_ingredients?.length ? (
                  <div className="mt-8">
                    <h4 className="mb-1">Optional:</h4>
                    <ul className="list-disc list-inside">
                      {optional_ingredients.map(ingredient => (
                        <li>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </Section>

              <Section heading='Directions'>
                <ol className="list-decimal list-outside">
                  {directions.map((direction) => (
                    <li className="text-base">{direction}</li>
                  ))}
                </ol>
              </Section>
            </div>

            {notes && (
              <div className={`${playfairDisplay.className} flex flex-col gap-y-1 px-3 py-1 border border-gray-400`}>
                <h4 className="text-lg">NOTES</h4>
                <p className="text-sm">{notes}</p>
              </div>
            )}
          </section>
        </div>
      </div>

      <div ref={canvasRef} id="canvas-container" className="canvas-container"></div>
    </>
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
