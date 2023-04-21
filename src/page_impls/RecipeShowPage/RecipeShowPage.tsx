import { Button, ButtonLink } from '@components/Button';
import { Loader } from '@components/Loader';
import { RecipeView } from '@components/Recipe';
import { useApiBootData } from '@page_impls/RecipeShowPage/useApiBootData';
import { getRecipeEditUrl } from '@utils/url_app';
import axios from 'axios';
import download from 'downloadjs';
import { toPng } from 'html-to-image';
import { useRouter } from 'next/router';
import React from 'react';

export function RecipePage() {
  const router = useRouter();

  const data = useApiBootData();

  if (!data) return <Loader />

  const { recipe } = data;

  return (
    <div className="pb-12">
      <section className="flex justify-end mb-5 space-x-3">
        <Button variant="redPrimary" onClick={() => deleteRecipe(recipe.id)}>
          Delete
        </Button>

        <ButtonLink variant="secondary" href={getRecipeEditUrl(recipe.slug)}>
          Edit
        </ButtonLink>

        <Button variant="primary" onClick={downloadRecipeTemplate}>
          Download
        </Button>
      </section>

      <RecipeView recipe={recipe} />
    </div>
  )

  async function downloadRecipeTemplate() {
    // Convert HTML to image format
    const htmlElements = document.querySelectorAll('[data-canvas-container]');
    if (!htmlElements.length) throw new Error('Missing HTML Content');

    htmlElements.forEach(async (elem: any, i) => {
      const recipeFileName = htmlElements.length > 1 ? `${recipe.slug}-recipe-page-${i + 1}` : `${recipe.slug}-recipe`;

      elem.style.width = '768px';
      const dataUrl = await toPng(elem)
      download(dataUrl, recipeFileName);
      elem.style.width = '100%';
    })
  }

  async function deleteRecipe(id: string) {
    await axios.delete(`/api/recipes/${id}/delete`)
    router.replace('/')
  }
}
