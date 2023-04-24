import { RecipePage } from '@components/Recipe';
import { UpdatedRecipe } from '@shared/types';
import { buildRecipePage, separateRecipeDirections } from '@utils/recipe';
import download from 'downloadjs';
import { toCanvas, toJpeg } from 'html-to-image';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

type Props = {
  recipe: UpdatedRecipe;
};

export function RecipeTemplate({ recipe }: Props) {
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
          }
        })
    })
  }, [recipe])

  return (
    <div className="flex flex-col gap-y-3">
      {recipeDirectionPages.map((page, i) => (
        <React.Fragment key={page.directionsIndex}>
          <div data-recipe-content={i + 1}>
            <RecipePage recipe={buildRecipePage(recipe, page.directions)} directionsStartIndex={page.directionsIndex} />
          </div>
          <div data-canvas-container={i + 1} className="canvas-container" />
        </React.Fragment>
      ))}
    </div>
  )
}

export async function downloadRecipeTemplate(recipe: UpdatedRecipe) {
  // Convert HTML to image format
  const htmlElements = document.querySelectorAll('[data-canvas-container]');
  if (!htmlElements.length) throw new Error('Missing HTML Content');

  await htmlElements.forEach(async (elem: any, i) => {
    const recipeFileName = htmlElements.length > 1 ? `${recipe.slug}-recipe-page-${i + 1}` : `${recipe.slug}-recipe`;

    elem.style.width = '768px';
    toJpeg(elem).then(dataUrl => {
      download(dataUrl, recipeFileName);
      elem.style.width = '100%';
    })
  })

  toast.success('Recipe downloaded')
}