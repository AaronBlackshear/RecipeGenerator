import { Button, ButtonLink } from '@components/Button'
import React from 'react'

export type RecipeFormStep = 'title' | 'metadata' | 'ingredients' | 'directions' | 'notes' | 'review';

export const RECIPE_FORM_STEPS: RecipeFormStep[] = [
  'title',
  'metadata',
  'ingredients',
  'directions',
  'notes',
  'review',
]

type Props = {
  currentStep: RecipeFormStep;
};

export function RecipeFormNav({ currentStep }: Props) {
  return (
    <nav>
      <ul className="space-y-2">
        {RECIPE_FORM_STEPS.map(step => (
          <RecipeFormNavItem key={step} step={step} isActive={currentStep === step} />
        ))}
      </ul>
    </nav>
  )
}

type RecipeFormNavItemProps = {
  isActive?: boolean;
  step: RecipeFormStep;
}

function RecipeFormNavItem({ isActive = false, step }: RecipeFormNavItemProps) {
  return (
    <li className={`${isActive ? 'opacity-100' : 'opacity-50'}`}>
      <ButtonLink href={`/recipes/new/${step}`} variant="minimal" size="sm">
        <span className="capitalize">{step}</span>
      </ButtonLink>
    </li>
  )
}
