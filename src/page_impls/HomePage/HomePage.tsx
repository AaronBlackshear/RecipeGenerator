import { FilterBar } from "@components/FilterBar";
import { RecipeCard } from "@components/RecipeCard";
import { useApiBootData } from "@page_impls/HomePage/useApiBootData";
import Head from "next/head";

export function HomePage() {
  const data = useApiBootData();

  return (
    <>
      <Head>
        <title>Recipe Generator</title>
        <meta name="description" content="Personal recipe Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/favicon_white.svg" />
      </Head>

      <main className="space-y-8">
        <FilterBar />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {data?.recentRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </>
  )
}
