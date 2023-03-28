import React, { useEffect, useState } from 'react'
import { RecipeFormNav, RecipeFormStep } from '@components/RecipeForm/RecipeFormNav';
import { RecipeFormContent } from '@components/RecipeForm/RecipeFormContent';
import { StepNavigation } from './FormSteps/StepNavigation';
import { Nullable } from '@utils/types';
import { FormStateProvider, useFormState } from '@components/RecipeForm/FormSteps/FormContext';

type Props = {
  step: RecipeFormStep;
}

export type FormState = {
  image: Nullable<string>;
  title: string;
};

function Content({ step }: Props) {
  const formState = useFormState();
  const [currentStep, setCurrentStep] = useState<RecipeFormStep>(step);

  useEffect(() => {
    if (step !== currentStep) setCurrentStep(step);
  }, [step])

  return (
    <div className="flex space-x-4">
      <RecipeFormNav currentStep={currentStep} />

      <section className="flex-1 space-y-5">
        <RecipeFormContent currentStep={currentStep} />

        <StepNavigation step={currentStep} onSubmit={() => console.log(formState)} />
      </section>
    </div>
  )
}

export function RecipeForm(props: Props) {
  return (
    <FormStateProvider>
      <Content {...props} />
    </FormStateProvider>
  )
}
