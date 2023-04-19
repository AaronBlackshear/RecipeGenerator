import { UrlObject } from "url";

export function getRecipeEditFormUrl(slug: string): UrlObject {
  return {
    pathname: `/recipes/${slug}/edit`
  }
}

export function getRecipeNewUrl(): UrlObject {
  return {
    pathname: `/recipes/new`
  }
}

export function getRecipeUrl(slug: string) {
  return `/recipes/${slug}`
}