import { Carousel } from "@components/Carousel";
import { Category, CategoryCard } from "@components/CategoryCard";
import { ComponentOrLoader } from "@components/ComponentOrLoader";
import { useApiBootData } from "@page_impls/HomePage/useApiBootData";
import Head from "next/head";
import { RecentRecipes, FavoriteRecipes } from "@page_impls/HomePage/RecipeSliders";

const TEMP_CATEGORIES: Category[] = [
  { icon: "🥕", title: "Soups" },
  { icon: "🥕", title: "Sandwhiches" },
  { icon: "🥕", title: "Burgers" },
  { icon: "🥕", title: "Beef" },
  { icon: "🥕", title: "Pork" },
  { icon: "🥕", title: "Fish" },
  { icon: "🥕", title: "Seafood" },
  { icon: "🥕", title: "Appetizers" },
  { icon: "🥕", title: "Desserts" },
  { icon: "🥕", title: "Vegtables" },
  { icon: "🥕", title: "Sweets" },
  { icon: "🥕", title: "Family Favs" },
]

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
        <Carousel title="Browse by Category" viewAll="#">
          {TEMP_CATEGORIES.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </Carousel>

        <ComponentOrLoader data={data ? { recipes: data.recentRecipes } : null} Component={RecentRecipes} />

        <ComponentOrLoader data={data ? { recipes: data.recentRecipes } : null} Component={FavoriteRecipes} />
      </main>
    </>
  )
}
