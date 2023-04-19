import React from 'react'
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import { ImageUpload } from '@components/RecipeForm/ImageUpload';
import { Input, Label } from '@components/Form';
import { SubmitHandler, Controller, UseFormReturn, useFieldArray, FieldArrayWithId, Control } from 'react-hook-form';
import { Button } from '@components/Button';
import { FormInputs } from '@page_impls/RecipeFormPage';
import { capitalize } from '@utils/index';
import { InputRow } from '@components/Form';
import { createRecipe } from '@hooks/recipe/mutations';
import { RecipeType } from '@shared/types';

type Props = {
  form: UseFormReturn<FormInputs>;
}

export function RecipeForm({ form }: Props) {
  const router = useRouter();

  const triggerCreateRecipe = createRecipe()

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

    try {
      await triggerCreateRecipe({ recipe: formattedRecipe })
      router.push(`/recipes/${formattedRecipe.slug}`)
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
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
              <div className="flex items-center space-x-2 p-1">
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
              <div className="flex items-center space-x-2 p-1">
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
              <div className="flex justify-start items-center space-x-2 p-1">
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

      <Button variant="primary" type="submit" fullWidth disabled={!isValid}>Submit</Button>
    </form>
  )

  function formatRecipe(recipe: FormInputs): Partial<RecipeType> {
    if (!recipe.image) throw new Error('Missing Image!');

    return ({
      title: recipe.title,
      slug: slugify(recipe.title),
      image: recipe.image,
      servings: recipe.servings,
      prep_time: recipe.prepTime,
      cook_time: recipe.cookTime,
      required_ingredients: recipe.requiredIngredients,
      optional_ingredients: recipe?.optionalIngredients?.length ? recipe.optionalIngredients : undefined,
      directions: recipe.directions,
    })
  }
}
