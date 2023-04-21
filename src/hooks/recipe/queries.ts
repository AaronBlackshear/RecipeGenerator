import { fetcher } from '@lib/fetcher';
import { Recipe } from '@prisma/client';
import { Maybe } from "@utils/types";
import useSWR from "swr";

export const useRecipe = (slug?: Maybe<string>) => {
  const { data, error, isLoading } = useSWR(slug ? `/api/recipes/${slug}` : undefined, fetcher)

  return {
    recipe: data?.recipe,
    isLoading,
    isError: error
  }
}

type UseRecipes = {
  recipes: Recipe[];
  isLoading: boolean;
  isError: any;
}

export const useRecipes = (): UseRecipes => {
  const { data, error, isLoading } = useSWR(`/api/recipes`, fetcher)

  console.log(data);


  return {
    recipes: data?.recipes,
    isLoading,
    isError: error
  }
}