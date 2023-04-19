import { RecipeType } from "@shared/types";

const CHARACTER_LIMIT = 1100;
const MAX_STEPS_PER_PAGE = 10;

type SplitRecipeMetadata = {
  directions: { value: string }[];
  directionsIndex: number;
}[]

export function separateRecipeDirections(recipe: RecipeType): SplitRecipeMetadata {
  const { directions } = recipe;

  const pages: SplitRecipeMetadata = [];
  directions.forEach((direction, i) => {
    if (pages.length === 0) {
      pages.push({ directions: [{ value: direction.value }], directionsIndex: 0 });
      return;
    }
    const lastPage = pages[pages.length - 1];

    const withinCharacterLimit = getCharacterCount(lastPage.directions) + direction.value.length < CHARACTER_LIMIT;
    const withinMaxPageStep = lastPage.directions.length < MAX_STEPS_PER_PAGE;
    if (withinCharacterLimit && withinMaxPageStep) {
      lastPage.directions.push({ value: direction.value })
      return;
    }
    pages.push({ directions: [{ value: direction.value }], directionsIndex: i });
  })

  return pages;
}

function getCharacterCount(arr: { value: string }[]) {
  return arr.reduce((acc, x) => {
    return acc + x.value.length;
  }, 0)
}

export function buildRecipePage(recipe: RecipeType, pageDirections: { value: string }[]): RecipeType {
  return {
    ...recipe,
    directions: pageDirections,
  }
}
