import { Carousel } from "@components/Carousel";
import { RecipeCard } from "@components/RecipeCard";
import { Recipe } from "@prisma/client";

type RecipeSliderType = {
  recipes: Recipe[]
}

export function RecentRecipes({ recipes }: RecipeSliderType) {
  return (
    <Carousel title="Recent Recipes" viewAll="#">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Carousel>
  )
}

export function FavoriteRecipes({ recipes }: RecipeSliderType) {
  return (
    <Carousel title="Favortie Recipes" viewAll="#">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </Carousel>
  )
}