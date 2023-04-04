import Head from 'next/head'
import { RecipeCondensed } from '@components/Recipe';
import { RecipeType } from '@components/Recipe';
import { ButtonLink } from '@components/Button';
import { Loader } from '@components/Loader';
import { Nullable } from '@utils/types';
import { useRecipes } from '@hooks';
import { Carousel } from '@components/Carousel';
import { Category, CategoryCard } from '@components/CategoryCard';

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

function Content({ recipes }: ApiBootData) {
  return (
    <>
      <Head>
        <title>Recipe Generator</title>
        <meta name="description" content="Personal recipe Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/favicon_white.svg" />
      </Head>

      <main>
        <Carousel title="Browse by Category">
          {TEMP_CATEGORIES.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </Carousel>

        <div className="flex justify-end mb-5">
          <ButtonLink href="/recipes/new" variant="primary">+ Create new recipe</ButtonLink>
        </div>

        <div className="flex flex-col gap-3">
          {recipes.map(recipe => (
            <RecipeCondensed key={recipe._id} recipe={recipe} />
          ))}
        </div>
      </main>
    </>
  )
}

export default function Page() {
  const data = useApiBootData();

  if (!data) return <Loader />

  return <Content {...data} />
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
