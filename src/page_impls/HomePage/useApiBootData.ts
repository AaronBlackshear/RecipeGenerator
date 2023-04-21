import { useRecipes } from "@hooks/recipe/queries";
import { RecipeType } from '@shared/types';
import { Nullable } from "@utils/types";

export type ApiBootData = {
  recentRecipes: RecipeType[];
  favoriteRecipes: RecipeType[];
}

export function useApiBootData(): Nullable<ApiBootData> {
  const { recipes, isLoading, isError } = useRecipes();

  if (isLoading || !recipes.length) return null;
  if (isError) throw new Error(isError);

  return {
    recentRecipes: recipes,
    favoriteRecipes: recipes,
  }
}
