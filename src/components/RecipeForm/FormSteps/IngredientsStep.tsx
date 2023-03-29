import { Button } from '@components/Button';
import { Input } from '@components/Form';
import React, { useState } from 'react'
import { useFormState, useFormStateDispatch } from '@components/RecipeForm/FormSteps/FormContext';

export function IngredientsStep() {
  const { requiredIngredients, optionalIngredients } = useFormState();
  const dispatch = useFormStateDispatch();

  const [newRequiredIngredient, setNewRequiredIngredient] = useState('')
  const [newOptionalIngredient, setNewOptionalIngredient] = useState('')

  return (
    <div>
      <section className="space-y-3">
        <Title>Required Ingredients</Title>

        <div className="flex justify-start items-center space-x-2">
          <Input value={newRequiredIngredient} onChange={(e) => setNewRequiredIngredient(e.target.value)} />

          <Button variant="primary" onClick={() => addIngredient()}>Add Ingredient</Button>
        </div>

        <ul className="list-inside list-disc">
          {requiredIngredients.map((ingredient, i) => (
            <li key={`${ingredient}_${i}`} className="flex items-center space-x-1">
              <span className="text-white">{ingredient}</span>
              <span>
                <Button variant='minimal' size="sm" onClick={() => removeIngredient(i)}>X</Button>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <Title>Optional Ingredients</Title>

        <div className="flex justify-start items-center space-x-2">
          <Input value={newOptionalIngredient} onChange={(e) => setNewOptionalIngredient(e.target.value)} />

          <Button variant="primary" onClick={() => addIngredient(true)}>Add Ingredient</Button>
        </div>

        <ul className="list-inside list-disc">
          {optionalIngredients.map((ingredient, i) => (
            <li key={`${ingredient}_${i}`} className="flex items-center space-x-1">
              <span className="text-white">{ingredient}</span>
              <span>
                <Button variant='minimal' size="sm" onClick={() => removeIngredient(i, true)}>X</Button>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )

  function addIngredient(isOptional?: boolean) {
    dispatch({
      type: "update", payload: {
        [isOptional ? 'optionalIngredients' : 'requiredIngredients']: [
          ...(isOptional ? optionalIngredients : requiredIngredients),
          isOptional ? newOptionalIngredient : newRequiredIngredient
        ]
      }
    })

    if (isOptional) setNewOptionalIngredient('')
    else setNewRequiredIngredient('')
  }

  function removeIngredient(index: number, isOptional?: boolean) {
    dispatch({
      type: "update", payload: {
        [isOptional ? 'optionalIngredients' : 'requiredIngredients']: (isOptional ? optionalIngredients : requiredIngredients).filter((_, i) => i !== index)
      }
    })
  }
}

type TitleProps = {
  children: React.ReactNode;
}

function Title({ children }: TitleProps) {
  return (
    <h4 className="text-lg text-white">{children}</h4>
  )
}
