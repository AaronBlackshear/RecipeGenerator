import { RecipeFormStep } from "@components/RecipeForm/RecipeFormNav";
import { UrlObject } from "url";
import { Nullable } from "@utils/types";

export function getRecipeFormStep(step: RecipeFormStep): UrlObject {
  return {
    pathname: `/recipes/new/${step}`
  }
}

export function getNextRecipeFormStep(step: RecipeFormStep): UrlObject {
  switch (step) {
    case 'title':
      return {
        pathname: `/recipes/new/metadata`
      }

    case 'metadata':
      return {
        pathname: `/recipes/new/ingredients`
      }

    case 'ingredients':
      return {
        pathname: `/recipes/new/directions`
      }

    case 'directions':
      return {
        pathname: `/recipes/new/notes`
      }

    case 'notes':
      return {
        pathname: `/recipes/new/review`
      }

    case 'review':
      return {}
  }
}

export function getPreviousRecipeFormStep(step: RecipeFormStep): UrlObject {
  switch (step) {
    case 'title':
      return {}

    case 'metadata':
      return {
        pathname: `/recipes/new/title`
      }

    case 'ingredients':
      return {
        pathname: `/recipes/new/metadata`
      }

    case 'directions':
      return {
        pathname: `/recipes/new/ingredients`
      }

    case 'notes':
      return {
        pathname: `/recipes/new/directions`
      }

    case 'review':
      return {
        pathname: `/recipes/new/notes`
      }
  }
}