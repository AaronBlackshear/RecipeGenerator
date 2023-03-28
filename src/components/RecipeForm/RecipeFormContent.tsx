import React from 'react'
import { RecipeFormStep } from '@components/RecipeForm/RecipeFormNav';
import { TitleStep, MetadataStep, IngredientsStep, DirectionsStep, NotesStep, ReviewStep } from '@components/RecipeForm/FormSteps';

type Props = {
  currentStep: RecipeFormStep;
};

export function RecipeFormContent({ currentStep }: Props): JSX.Element {
  switch (currentStep) {
    case 'title':
      return <TitleStep />;

    case 'metadata':
      return <MetadataStep />;

    case 'ingredients':
      return <IngredientsStep />;

    case 'directions':
      return <DirectionsStep />;

    case 'notes':
      return <NotesStep />;

    case 'review':
      return <ReviewStep />;
  }
}
