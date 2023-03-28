import React, { useState } from 'react'
import { useFormState, useFormStateDispatch } from '@components/RecipeForm/FormSteps/FormContext';
import { Input } from '@components/Form';
import { Button } from '@components/Button';

type Props = {};

export function DirectionsStep({ }: Props) {
  const { directions } = useFormState();
  const dispatch = useFormStateDispatch()

  const [newDirection, setNewDirection] = useState('');

  return (
    <div>
      <section className="space-y-3">
        <h4 className="text-lg text-white">Directions</h4>

        <div className="flex justify-start items-center space-x-2">
          <Input value={newDirection} onChange={(e) => setNewDirection(e.target.value)} />

          <Button variant="primary" onClick={addDirection}>Add Direction</Button>
        </div>

        <ol className="list-decimal list-inside">
          {directions.map((direction, i) => (
            <li key={i} className="flex items-center space-x-1">
              <span className="text-white">{direction}</span>
              <span>
                <Button variant='minimal' size="sm" onClick={() => removeDirection(i)}>X</Button>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )

  function addDirection() {
    dispatch({
      type: "update", payload: {
        directions: [
          ...directions,
          newDirection,
        ]
      }
    })

    setNewDirection('')
  }

  function removeDirection(index: number) {
    dispatch({
      type: "update", payload: {
        directions: directions.filter((_, i) => i !== index)
      }
    })
  }
}


