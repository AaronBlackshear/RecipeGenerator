import { useRecipe } from "@hooks/recipe/queries";
import { RecipeType } from "@shared/types";
import { getQuerySlug } from "@utils/query";
import { Nullable } from "@utils/types";
import { useRouter } from "next/router";

export type ApiBootData = {
  recipe: RecipeType;
}

export function useApiBootData(): Nullable<ApiBootData> {
  const { query } = useRouter();
  const { recipe, isLoading, isError } = useRecipe(query.slug ? getQuerySlug(query) : undefined);

  if (isLoading || !recipe) return null;
  if (isError) throw new Error(isError);

  return {
    recipe,
  }
}
