import useSWR from "swr"
import { fetcher } from '@hooks';
import { Maybe } from "@utils/types";

export const useRecipe = (slug?: Maybe<string>) => {
  const { data, error, isLoading } = useSWR(slug ? `/api/recipes/${slug}` : undefined, fetcher)

  return {
    recipe: data?.recipe,
    isLoading,
    isError: error
  }
}