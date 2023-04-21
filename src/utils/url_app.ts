import { UrlObject } from "url";

export function getRecipeEditUrl(slug: string): UrlObject {
  return {
    pathname: `/recipes/${slug}/edit`
  }
}

export function getRecipeNewUrl(): UrlObject {
  return {
    pathname: `/recipes/new`
  }
}
