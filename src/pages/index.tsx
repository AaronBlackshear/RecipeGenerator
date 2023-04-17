import Head from 'next/head'
import { RecipeType } from '@components/Recipe';
import { Nullable } from '@utils/types';
import { useRecipes } from '@hooks';
import { Carousel } from '@components/Carousel';
import { Category, CategoryCard } from '@components/CategoryCard';
import { RecipeCard } from '@components/RecipeCard';
import { ComponentOrLoader } from '@components/ComponentOrLoader';

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

export default function Content() {
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

        <ComponentOrLoader data={data} Component={RecentRecipes} />

        <ComponentOrLoader data={data} Component={RecentRecipes} />
      </main>
    </>
  )
}

type ApiBootData = {
  recipes: RecipeType[];
}

function useApiBootData(): Nullable<ApiBootData> {
  const { recipes, isLoading, isError } = useRecipes();

  if (isLoading || !recipes.length) return null;
  if (isError) throw new Error(isError);

  return {
    recipes,
  }
}

// TODO: Refactor
function RecentRecipes({ recipes }: ApiBootData) {
  return (
    <Carousel title="Recent Recipes" viewAll="#">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} />
      ))}
    </Carousel>
  )
}
