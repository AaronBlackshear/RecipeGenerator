import { useRecipes } from "@hooks/recipe/queries";
import { Recipe } from "@prisma/client";
import { Nullable } from "@utils/types";

export type ApiBootData = {
  recentRecipes: Recipe[];
  favoriteRecipes: Recipe[];
}

export function useApiBootData(): Nullable<ApiBootData> {
  const { recipes, isLoading, isError } = useRecipes();

  if (isLoading || !recipes?.length) return null;
  if (isError) throw new Error(isError);

  return {
    recentRecipes: recipes,
    favoriteRecipes: recipes,
  }
}
