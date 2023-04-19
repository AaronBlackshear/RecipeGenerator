import useSWR from "swr"
import { fetcher } from '@hooks/swr';
import { Maybe } from "@utils/types";

export const useRecipe = (slug?: Maybe<string>) => {
  const { data, error, isLoading } = useSWR(slug ? `/api/recipes/${slug}` : undefined, fetcher)

  return {
    recipe: data?.recipe,
    isLoading,
    isError: error
  }
}

export const useRecipes = () => {
  const { data, error, isLoading } = useSWR(`/api/recipes`, fetcher)

  return {
    recipes: data?.recipes,
    isLoading,
    isError: error
  }
}