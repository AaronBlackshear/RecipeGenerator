import Head from 'next/head'
import { RecipeType } from '@components/Recipe';
import { Loader } from '@components/Loader';
import { Nullable } from '@utils/types';
import { useRecipes } from '@hooks/recipes';
import { Carousel } from '@components/Carousel';
import { Category, CategoryCard } from '@components/CategoryCard';
import { RecipeCard } from '@components/RecipeCard';

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

      <main className="space-y-8">
        <Carousel title="Browse by Category" viewAll="#">
          {TEMP_CATEGORIES.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </Carousel>

        <Carousel title="Recent Recipes" viewAll="#">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </Carousel>

        <Carousel title="Favorite Recipes" viewAll="#">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </Carousel>
      </main>
    </>
  )
}

export default function Page() {
  const data = useApiBootData();

  if (!data) return <Loader />

  return <Content {...data} />
}

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await axios.get('http://localhost:1337/api/recipes', {
//     headers: {
//       "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`,
//     }
//   })
//   console.log(res.data);

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//     },
//   }
// }

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
