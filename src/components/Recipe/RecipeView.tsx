import { Recipe } from '@components/Recipe';
import { RecipeType } from '@shared/types';
import React, { useEffect } from 'react'
import { toCanvas } from 'html-to-image';

const CHARACTER_LIMIT = 1100;

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

type SplitRecipeMetadata = {
  directions: string[];
  directionsIndex: number;
}[]

function separateRecipeDirections(recipe: RecipeType): SplitRecipeMetadata {
  const { directions } = recipe;

  const pages: SplitRecipeMetadata = [];
  directions.forEach((direction, i) => {
    if (pages.length === 0) {
      pages.push({ directions: [direction], directionsIndex: 0 });
      return;
    }
    const lastPage = pages[pages.length - 1];
    if (getCharacterCount(lastPage.directions) + direction.length < CHARACTER_LIMIT) {
      lastPage.directions.push(direction)
      return;
    }
    pages.push({ directions: [direction], directionsIndex: i });
  })

  return pages;
}

function getCharacterCount(arr: string[]) {
  return arr.reduce((acc, x) => {
    return acc + x.length;
  }, 0)
}

function buildRecipePage(recipe: RecipeType, pageDirections: string[]): RecipeType {
  return {
    ...recipe,
    directions: pageDirections,
  }
}
