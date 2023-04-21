import { fetcher } from '@lib/fetcher';
import { Recipe } from '@prisma/client';
import { Nullable } from '@utils/types';
import useSWR from "swr";

export const useRecipe = (slug: Nullable<string>) => {
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

export const useRecipes = ({ search }: { search?: string } = {}): UseRecipes => {
  const url = `/api/recipes${search ? `?search=${encodeURI(search)}` : ''}`

  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    recipes: data?.recipes,
    isLoading,
    isError: error
  }
}