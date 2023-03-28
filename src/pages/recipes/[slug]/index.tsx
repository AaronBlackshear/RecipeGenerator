import { Recipe } from '@components/Recipe';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react'
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { RecipeType } from '../../../data';
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.slug) throw new Error('Missing slug');

  const response = await axios.get(`${process.env.BASE_URL}/api/recipes/${params.slug}`, {
    url: 'http://localhost:3000'
  })
  const { recipe } = response.data
  return {
    props: {
      recipe,
    }
  };
}
