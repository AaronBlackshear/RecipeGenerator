import { Carousel } from "@components/Carousel";
import { RecipeType } from '@shared/types';
import { RecipeCard } from "@components/RecipeCard";

type RecipeSliderType = {
  recipes: RecipeType[]
}

export function RecentRecipes({ recipes }: RecipeSliderType) {
  return (
    <Carousel title="Recent Recipes" viewAll="#">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </Carousel>
  )
}

export function FavoriteRecipes({ recipes }: RecipeSliderType) {
  return (
    <Carousel title="Favortie Recipes" viewAll="#">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </Carousel>
  )
}