import { Recipe } from '@components/Recipe';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react'
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { RecipeType } from '@components/Recipe';
import { Button, ButtonLink } from '@components/Button';
import { useRouter } from 'next/router';
import { getRecipeEditFormUrl } from '@utils/url_app';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

type Props = {
  recipe: RecipeType;
};

export default function Content({ recipe }: Props) {
  const router = useRouter();

  return (
    <div className="pb-12">
      <section className="flex justify-end mb-5 space-x-3">
        <Button variant="redPrimary" onClick={() => deleteRecipe(recipe._id)}>
          Delete
        </Button>

        <ButtonLink variant="secondary" href={getRecipeEditFormUrl(recipe.slug)}>
          Edit
        </ButtonLink>

        <Button variant="primary" onClick={downloadRecipeTemplate}>
          Download
        </Button>
      </section>

      <Recipe recipe={recipe} />
    </div>
  )

  async function downloadRecipeTemplate() {
    // Convert HTML to image format
    const htmlElement = document.getElementById('canvas-container');
    if (!htmlElement) throw new Error('Missing HTML Content');
    htmlElement.style.width = '768px';
    const dataUrl = await toPng(htmlElement)
    download(dataUrl, `${recipe.slug}-recipe`);
    htmlElement.style.width = '100%';
  }

  async function deleteRecipe(id: string) {
    await axios.delete(`/api/recipes/${id}/delete`)
    router.replace('/')
  }
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ params }) {
    if (!params?.slug) throw new Error('Missing slug');

    const response = await axios.get(`${process.env.BASE_URL}/api/recipes/${params.slug}`)
    const { recipe } = response.data
    return {
      props: {
        recipe,
      }
    };
  }
});
