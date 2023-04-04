import { Button, ButtonLink } from '@components/Button'
import { getRecipeEditFormUrl, getRecipeNewFormUrl } from '@utils/url_app';
import { useRouter } from 'next/router';
import React from 'react'

export type RecipeFormStep = 'title' | 'metadata' | 'ingredients' | 'directions' | 'review';

export const RECIPE_FORM_STEPS: RecipeFormStep[] = [
  'title',
  'metadata',
  'ingredients',
  'directions',
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
  const { pathname, query } = useRouter();

  const isEditPath = pathname.includes('/edit')
  const slug = (Array.isArray(query.slug) ? query.slug[0] : query.slug)

  const href = isEditPath && slug ? getRecipeEditFormUrl(slug, step) : getRecipeNewFormUrl(step)

  return (
    <li className={`${isActive ? 'opacity-100' : 'opacity-50'}`}>
      <ButtonLink href={href} variant="link" size="sm">
        <span className="capitalize">{step}</span>
      </ButtonLink>
    </li>
  )
}
