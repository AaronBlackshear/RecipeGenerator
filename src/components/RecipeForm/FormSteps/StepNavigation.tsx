import { Button, ButtonLink } from '@components/Button'
import { getNextRecipeFormStep, getPreviousRecipeFormStep } from '@utils/url_app'
import React from 'react'
import { RecipeFormStep } from '../RecipeFormNav'

type Props = {
  step: RecipeFormStep;
  onSubmit: () => void;
}

export function StepNavigation({ step, onSubmit }: Props) {
  return (
    <div className="flex justify-end space-x-3">
      {step !== 'title' && <ButtonLink href={getPreviousRecipeFormStep(step)} variant="secondary">Previous Step</ButtonLink>}
      {step !== 'review' ? (
        <ButtonLink href={getNextRecipeFormStep(step)} variant="primary">Next Step</ButtonLink>
      ) : (
        <Button variant="primary" onClick={onSubmit}>Submit</Button>
      )}
    </div>
  )
}
