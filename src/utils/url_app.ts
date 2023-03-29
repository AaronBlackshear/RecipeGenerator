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

export function getRecipeFormNextStepUrl(step: RecipeFormStep, slug?: string): UrlObject {
  switch (step) {
    case 'title':
      return {
        pathname: slug ? `/recipes/${slug}/edit/metadata` : `/recipes/new/metadata`,
      }

    case 'metadata':
      return {
        pathname: slug ? `/recipes/${slug}/edit/ingredients` : `/recipes/new/ingredients`,
      }

    case 'ingredients':
      return {
        pathname: slug ? `/recipes/${slug}/edit/directions` : `/recipes/new/directions`,
      }

    case 'directions':
      return {
        pathname: slug ? `/recipes/${slug}/edit/notes` : `/recipes/new/notes`,
      }

    case 'notes':
      return {
        pathname: slug ? `/recipes/${slug}/edit/review` : `/recipes/new/review`,
      }

    case 'review':
      return {}
  }
}

export function getRecipeFormPreviousStepUrl(step: RecipeFormStep, slug?: string): UrlObject {
  switch (step) {
    case 'title':
      return {}

    case 'metadata':
      return {
        pathname: slug ? `/recipes/${slug}/edit/title` : `/recipes/new/title`,
      }

    case 'ingredients':
      return {
        pathname: slug ? `/recipes/${slug}/edit/metadata` : `/recipes/new/metadata`,
      }

    case 'directions':
      return {
        pathname: slug ? `/recipes/${slug}/edit/ingredients` : `/recipes/new/ingredients`,
      }

    case 'notes':
      return {
        pathname: slug ? `/recipes/${slug}/edit/directions` : `/recipes/new/directions`,
      }

    case 'review':
      return {
        pathname: slug ? `/recipes/${slug}/edit/notes` : `/recipes/new/notes`,
      }
  }
}