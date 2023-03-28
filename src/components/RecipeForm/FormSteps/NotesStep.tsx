import React from 'react'
import { useFormState, useFormStateDispatch } from '@components/RecipeForm/FormSteps/FormContext';
import { Label, Textarea } from '@components/Form';

export function NotesStep() {
  const { notes } = useFormState();
  const dispatch = useFormStateDispatch();

  return (
    <div className="flex flex-col space-y-3">
      <Textarea label={<Label>Notes</Label>} value={notes} onChange={(e) => dispatch({ type: 'update', payload: { notes: e.target.value } })} />
    </div>
  )
}
