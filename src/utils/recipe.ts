import { UpdatedRecipe } from "@shared/types";

const CHARACTER_LIMIT = 1100;
const MAX_STEPS_PER_PAGE = 10;

type SplitRecipeMetadata = {
  directions: string[];
  directionsIndex: number;
}[]

export function separateRecipeDirections(recipe: UpdatedRecipe): SplitRecipeMetadata {
  const { directions } = recipe;

  const pages: SplitRecipeMetadata = [];
  directions.forEach((direction, i) => {
    if (pages.length === 0) {
      pages.push({ directions: [direction], directionsIndex: 0 });
      return;
    }
    const lastPage = pages[pages.length - 1];

    const withinCharacterLimit = getCharacterCount(lastPage.directions) + direction.length < CHARACTER_LIMIT;
    const withinMaxPageStep = lastPage.directions.length < MAX_STEPS_PER_PAGE;
    if (withinCharacterLimit && withinMaxPageStep) {
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

export function buildRecipePage(recipe: UpdatedRecipe, pageDirections: string[]): UpdatedRecipe {
  return {
    ...recipe,
    directions: pageDirections,
  }
}
