import { FilterBar } from "@components/FilterBar";
import { RecipeCard } from "@components/RecipeCard";
import { useApiBootData } from "@page_impls/HomePage/useApiBootData";

export function HomePage() {
  const data = useApiBootData();

  return (
    <main className="space-y-8">
      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {data?.recentRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </main>
  )
}
