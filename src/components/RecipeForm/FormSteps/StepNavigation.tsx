import { Button, ButtonLink } from '@components/Button'
import { getRecipeFormNextStepUrl, getRecipeFormPreviousStepUrl } from '@utils/url_app'
import { useRouter } from 'next/router'
import React from 'react'
import { RecipeFormStep } from '../RecipeFormNav'

type Props = {
  step: RecipeFormStep;
  onSubmit: () => void;
}

export function StepNavigation({ step, onSubmit }: Props) {
  const { query } = useRouter();

  const slug = (Array.isArray(query.slug) ? query.slug[0] : query.slug)

  return (
    <div className="flex justify-end space-x-3">
      {step !== 'title' && <ButtonLink href={getRecipeFormPreviousStepUrl(step, slug)} variant="secondary">Previous Step</ButtonLink>}
      {step !== 'review' ? (
        <ButtonLink href={getRecipeFormNextStepUrl(step, slug)} variant="primary">Next Step</ButtonLink>
      ) : (
        <Button variant="primary" onClick={onSubmit}>Submit</Button>
      )}
    </div>
  )
}
