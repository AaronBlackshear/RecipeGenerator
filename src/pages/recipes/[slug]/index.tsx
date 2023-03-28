import { Recipe } from '@components/Recipe';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { RecipeType, recipes } from '../../../data';
import { Button } from '@components/Button';

type Props = {
  recipe: RecipeType;
};

export default function Content({ recipe }: Props) {
  return (
    <div className="pb-12">
      <section className="flex justify-end mb-5">
        <Button variant="primary" onClick={downloadRecipeTemplate}>
          Download
        </Button>
      </section>

      <Recipe recipe={recipe} />
    </div>
  )

  async function downloadRecipeTemplate() {
    // Convert HTML to image format
    const htmlElement = document.getElementById('recipe-container');
    if (!htmlElement) throw new Error('Missing HTML Content');
    const dataUrl = await toPng(htmlElement)
    download(dataUrl, `${recipe.slug}-recipe`);
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.slug) throw new Error('Missing slug');

  return {
    props: {
      recipe: recipes.find((recipe) => recipe.slug === params.slug),
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: recipes.map((recipe) => ({
      params: { slug: recipe.slug }
    })),
    fallback: false,
  }
}
