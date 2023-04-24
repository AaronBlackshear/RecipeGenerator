import { Button } from '@components/Button';
import { RecipePage, RecipeTemplate, downloadRecipeTemplate } from '@components/Recipe';
import { RecipeForm } from '@components/RecipeForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteRecipe } from '@hooks/recipe/mutations';
import { recipeFormSchema } from '@page_impls/RecipeFormPage/formSchema';
import { Recipe } from '@prisma/client';
import { useWindowWidth } from '@react-hook/window-size';
import { buildRecipePage, separateRecipeDirections } from '@utils/recipe';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import slugify from 'slugify';

export type FormInputs = {
  id?: string;
  title: string;
  image: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  requiredIngredients: { value: string }[];
  optionalIngredients: { value: string }[];
  directions: { value: string }[];
}

type Props = {
  recipe?: Recipe;
}

export function RecipeFormPage({ recipe }: Props) {
  const router = useRouter()

  const width = useWindowWidth({ wait: 250 });
  const form = useForm<FormInputs>({
    defaultValues: {
      ...getInitialFormState(recipe)
    },
    resolver: yupResolver(recipeFormSchema),
  });

  const [formDirty, setFormDirty] = useState<boolean>(false);

  useEffect(() => {
    setFormDirty(form.formState.isDirty)
  }, [form.formState.submitCount, form.formState.isDirty])

  const showFullPreview = width >= 1280;
  const formValues = form.watch()
  const isEditPage = !!recipe?.id;

  return (
    <div className="flex items-start gap-x-4">
      <div className="flex-1 bg-gray-12 p-2 rounded-lg space-y-2">
        <RecipeForm form={form} recipe={recipe} />

        {isEditPage && <Button variant="secondary" fullWidth disabled={formDirty || form.formState.isSubmitting} onClick={downloadTemplate}>Download Recipe</Button>}
        {isEditPage && <Button variant="redPrimary" fullWidth disabled={formDirty || form.formState.isSubmitting} onClick={deleteRecipeAction}>Delete Recipe</Button>}
      </div>

      {/* SHOW PREVIEW ON DESKTOP */}
      {showFullPreview && <RecipePreview form={form} />}

      {/* Note: Render `RecipeTemplate` before attempting to download instead of on demand because of synchronus issues with generating canvas elements  */}
      {/* Extra note: Conditionally render `RecipeTemplate` to keep generated canvas elements up-to-date with formValues */}
      {!form.formState.isDirty && (
        <div className="fixed w-0 h-0 overflow-hidden">
          <RecipeTemplate recipe={mockRecipe(formValues)} />
        </div>
      )}
    </div>
  )

  function downloadTemplate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    downloadRecipeTemplate(mockRecipe(formValues))
  }

  async function deleteRecipeAction() {
    if (!recipe?.id) return;
    await deleteRecipe(recipe.id)
    router.replace('/')
    toast.success('Deleted recipe')
  }
}

type RecipePreviewProps = {
  form: UseFormReturn<FormInputs>;
}

function RecipePreview({ form }: RecipePreviewProps) {
  const formValues = form.watch()
  const recipe = useMemo(() => mockRecipe(formValues), [formValues])
  const recipeDirectionPages = useMemo(() => separateRecipeDirections(recipe), [recipe]);

  return (
    <div className="flex flex-col gap-y-3">
      {recipeDirectionPages.length ? recipeDirectionPages.map((page, i) => (
        <RecipePage key={i} recipe={buildRecipePage(recipe, page.directions)} directionsStartIndex={page.directionsIndex} />
      )) : (
        <RecipePage recipe={recipe} />
      )}
    </div>
  )
}

function mockRecipe(formState: FormInputs): Recipe {
  return {
    id: 'mock_id',
    slug: slugify(formState.title || ''),
    userId: 'mock_user_id',
    createdAt: new Date(),
    updatedAt: new Date(),
    title: formState.title || '',
    image: formState.image || '',
    servings: formState.servings,
    prepTime: formState.prepTime,
    cookTime: formState.cookTime,
    requiredIngredients: formState.requiredIngredients.map(({ value }) => value),
    optionalIngredients: formState.optionalIngredients?.map(({ value }) => value) || [],
    directions: formState.directions.map(({ value }) => value),
  }
}

function getInitialFormState(recipe?: Recipe): FormInputs {
  if (recipe) {
    return {
      id: recipe.id,
      image: recipe.image,
      title: recipe.title,
      servings: recipe.servings,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      requiredIngredients: recipe.requiredIngredients.map(ingredient => ({ value: ingredient })),
      optionalIngredients: recipe.optionalIngredients.map(ingredient => ({ value: ingredient })),
      directions: recipe.directions.map(direction => ({ value: direction })),
    }
  }

  return {
    image: '',
    title: '',
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    requiredIngredients: [],
    optionalIngredients: [],
    directions: [],
  }
}
