import React from 'react'
import { useFormState, useFormStateDispatch } from '@components/RecipeForm/FormSteps/FormContext';
import { Input, Label } from '@components/Form';

type Props = {};

export function MetadataStep({ }: Props) {
  const { servings, prepTime, cookTime } = useFormState();
  const dispatch = useFormStateDispatch()

  return (
    <div className="flex flex-col space-y-3">
      <Input label={<Label>Servings</Label>} type="number" value={servings} min={0} onChange={(e) => dispatch({ type: 'update', payload: { servings: parseInt(e.target.value) } })} />
      <Input label={<Label>Prep time (in minutes)</Label>} type="number" value={prepTime} min={0} onChange={(e) => dispatch({ type: 'update', payload: { prepTime: parseInt(e.target.value) } })} />
      <Input label={<Label>Cook time (in minutes)</Label>} type="number" value={cookTime} min={0} onChange={(e) => dispatch({ type: 'update', payload: { cookTime: parseInt(e.target.value) } })} />
    </div>
  )
}
