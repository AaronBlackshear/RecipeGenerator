import { useRecipe } from "@hooks/recipe/queries";
import { Recipe } from "@prisma/client";
import { getQuerySlug } from "@utils/query";
import { Nullable } from "@utils/types";
import { useRouter } from "next/router";

export type ApiBootData = {
  recipe: Recipe;
}

export function useApiBootData(): Nullable<ApiBootData> {
  const { query } = useRouter();
  const { recipe, isLoading, isError } = useRecipe(getQuerySlug(query) || '');

  if (isLoading || !recipe) return null;
  if (isError) throw new Error(isError);

  return {
    recipe,
  }
}
