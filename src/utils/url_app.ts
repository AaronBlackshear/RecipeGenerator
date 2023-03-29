import { RecipeFormStep } from "@components/RecipeForm/RecipeFormNav";
import { UrlObject } from "url";
import { Maybe } from "@utils/types";

export function getRecipeEditFormUrl(slug: string, step?: Maybe<RecipeFormStep>): UrlObject {
  return {
    pathname: `/recipes/${slug}/edit${step ? `/${step}` : ''}`
  }
}

export function getRecipeNewFormUrl(step?: Maybe<RecipeFormStep>): UrlObject {
  return {
    pathname: `/recipes/new${step ? `/${step}` : ''}`
  }
}

export function getRecipeFormNextStepUrl(step: RecipeFormStep): UrlObject {
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

export function getRecipeFormPreviousStepUrl(step: RecipeFormStep): UrlObject {
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