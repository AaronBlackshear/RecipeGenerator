import { Recipe } from '@components/Recipe';
import { RecipeType } from '@shared/types';
import React, { useEffect } from 'react'
import { toCanvas } from 'html-to-image';
import { buildRecipePage, separateRecipeDirections } from '@utils/recipe';

type Props = {
  recipe: RecipeType;
};

export function RecipeView({ recipe }: Props) {
  const recipeDirectionPages = separateRecipeDirections(recipe);

  useEffect(() => {
    const recipeContentPageElements = document.querySelectorAll('[data-recipe-content]');
    const canvasContainerPageElements = document.querySelectorAll('[data-canvas-container]');

    if (!recipeContentPageElements.length || !canvasContainerPageElements.length) return;

    recipeContentPageElements.forEach((recipeContent: any, i) => {
      toCanvas(recipeContent, {
        width: 768,
        height: 1152,
      })
        .then(function (canvas) {
          const canvasPage = canvasContainerPageElements[i]
          if (!canvasPage.innerHTML) {
            canvasPage.append(canvas)
            recipeContent.remove()
          }
        });
    })
  }, [recipe])

  return (
    <div className="flex flex-col gap-y-3">
      {recipeDirectionPages.map((page, i) => (
        <>
          <div data-recipe-content={i + 1}>
            <Recipe recipe={buildRecipePage(recipe, page.directions)} directionsStartIndex={page.directionsIndex} />
          </div>
          <div data-canvas-container={i + 1} className="canvas-container" />
        </>
      ))}
    </div>
  )
}