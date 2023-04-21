import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@components/Button';
import { Input, InputRow, Label } from '@components/Form';
import { ImageUpload } from '@components/RecipeForm/ImageUpload';
import { createRecipe, updateRecipe } from '@hooks/recipe/mutations';
import { FormInputs } from '@page_impls/RecipeFormPage';
import { NewRecipe } from '@shared/types';
import { capitalize } from '@utils/index';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Controller, SubmitHandler, UseFormReturn, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import slugify from 'slugify';

type Props = {
  form: UseFormReturn<FormInputs>;
}

export function RecipeForm({ form }: Props) {
  const router = useRouter();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { handleSubmit, control, formState: { errors, isValid } } = form;
  const { fields: requiredIngredientFields, append: appendRequiredIngredient, remove: removeRequiredIngredient } = useFieldArray({
    control,
    name: "requiredIngredients",
  });
  const { fields: optionalIngredientFields, append: appendOptionalIngredient, remove: removeOptionalIngredient } = useFieldArray({
    control,
    name: "optionalIngredients",
  });
  const { fields: directionFields, append: appendDirection, remove: removeDirection } = useFieldArray({
    control,
    name: "directions",
  });

  const onSubmit: SubmitHandler<FormInputs> = async (formInputs) => {
    const formattedRecipe = formatRecipe(formInputs);
    setIsSubmitting(true)

    try {
      if (formInputs.id) {
        await updateRecipe({ id: formInputs.id, ...formattedRecipe })
        toast.success('Recipe Updated!')
      } else {
        await createRecipe(formattedRecipe)
        router.push('/')
      }
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
    setIsSubmitting(false)
  }

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex space-x-5 items-end">
        <div className="flex flex-col space-y-2">
          <ImageUpload form={form} />

          {!!errors.image?.message && <p className="caption text-red-3">{capitalize(errors.image.message)}</p>}
        </div>

        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input label="Title" state={errors.title && 'error'} {...field} />}
        />
      </section>

      <InputRow>
        <Controller
          name="servings"
          control={control}
          render={({ field }) => <Input label="Servings" state={errors.servings && 'error'} type="number" min={0} fullWidth {...field} />}
        />

        <Controller
          name="prepTime"
          control={control}
          render={({ field }) => <Input label="Prep Time (in minutes)" state={errors.prepTime && 'error'} type="number" min={0} fullWidth {...field} />}
        />

        <Controller
          name="cookTime"
          control={control}
          render={({ field }) => <Input label="Cook Time (in minutes)" state={errors.cookTime && 'error'} type="number" min={0} fullWidth {...field} />}
        />
      </InputRow>

      <InputRow>
        <div className="w-full">
          <Label>Required Ingredients</Label>
          <div className="flex flex-col space-y-2 mb-3">
            {requiredIngredientFields.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-1">
                <Controller
                  key={item.id}
                  name={`requiredIngredients.${index}.value`}
                  control={control}
                  render={({ field }) => <Input label="Ingredient" state={errors.requiredIngredients && 'error'} fullWidth {...field} />}
                />
                <Button variant="icon" iconLeft="trashOutline" size='noPadding' onClick={(e) => {
                  e.preventDefault()
                  removeRequiredIngredient(index)
                }} />
              </div>
            ))}
          </div>

          <Button variant="secondary" size="sm" onClick={(e) => {
            e.preventDefault();
            appendRequiredIngredient({ value: '' })
          }}>
            Add Ingredient
          </Button>
        </div>

        <div className="w-full">
          <Label>Optional Ingredients</Label>
          <div className="flex flex-col space-y-2 mb-3">
            {optionalIngredientFields.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 p-1">
                <Controller
                  key={item.id}
                  name={`optionalIngredients.${index}.value`}
                  control={control}
                  render={({ field }) => <Input label="Ingredient" state={errors.optionalIngredients && 'error'} fullWidth {...field} />}
                />
                <Button variant="icon" iconLeft="trashOutline" size='noPadding' onClick={(e) => {
                  e.preventDefault()
                  removeOptionalIngredient(index)
                }} />
              </div>
            ))}
          </div>

          <Button variant="secondary" size="sm" onClick={(e) => {
            e.preventDefault();
            appendOptionalIngredient({ value: '' })
          }}>
            Add Ingredient
          </Button>
        </div>
      </InputRow>

      <InputRow>
        <div className="w-full">
          <Label>Directions</Label>
          <div className="flex flex-col space-y-2 mb-3">
            {directionFields.map((item, index) => (
              <div key={index} className="flex justify-start items-center space-x-2 p-1">
                <Controller
                  key={item.id}
                  name={`directions.${index}.value`}
                  control={control}
                  render={({ field }) => <Input label="Direction" state={errors.directions && 'error'} fullWidth {...field} />}
                />
                <Button variant="icon" iconLeft="trashOutline" size='noPadding' onClick={(e) => {
                  e.preventDefault()
                  removeDirection(index)
                }} />
              </div>
            ))}
          </div>

          <Button variant="secondary" size="sm" onClick={(e) => {
            e.preventDefault();
            appendDirection({ value: '' })
          }}>
            Add Direction
          </Button>
        </div>
      </InputRow>

      <Button variant="primary" type="submit" fullWidth disabled={!isValid || isSubmitting}>Submit</Button>
    </form>
  )

  function formatRecipe(recipe: FormInputs): NewRecipe {
    if (!recipe.image) throw new Error('Missing Image!');
    if (!user?.sub) throw new Error('Missing User ID!');

    return ({
      userId: user.sub,
      title: recipe.title,
      slug: slugify(recipe.title),
      image: recipe.image,
      servings: recipe.servings,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      requiredIngredients: recipe.requiredIngredients.map(({ value }) => value),
      optionalIngredients: recipe.optionalIngredients.map(({ value }) => value),
      directions: recipe.directions.map(({ value }) => value),
    })
  }
}
