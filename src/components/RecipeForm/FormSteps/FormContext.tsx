import { RecipeType } from '@shared/types';
import { Nullable } from '@utils/types';
import { createContext, Dispatch, useContext, useReducer } from 'react';
import { ImageType } from 'react-images-uploading';

export type FormState = {
  image: Nullable<string>;
  title: string;
  servings: number;
  prepTime: number;
  cookTime: number;
  requiredIngredients: string[];
  optionalIngredients: string[];
  directions: string[];
};

const FormStateContext = createContext(getInitialFormState());
const FormStateDispatchContext = createContext<Dispatch<FormStateReducerActions>>((value: FormStateReducerActions) => { });

type Props = {
  children: React.ReactNode;
  recipe?: RecipeType;
}

export function FormStateProvider({ recipe, children }: Props) {
  const [formState, dispatch] = useReducer(
    formStateReducer,
    getInitialFormState(recipe)
  );

  return (
    <FormStateContext.Provider value={formState}>
      <FormStateDispatchContext.Provider value={dispatch}>
        {children}
      </FormStateDispatchContext.Provider>
    </FormStateContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormStateContext);
}

export function useFormStateDispatch() {
  return useContext(FormStateDispatchContext);
}

type FormStateReducerActions = {
  type: 'update',
  payload: Partial<FormState>
};

function formStateReducer(formState: FormState, action: FormStateReducerActions): FormState {
  switch (action.type) {
    case 'update':
      return {
        ...formState,
        ...action.payload,
      };
  }
}

function getInitialFormState(recipe?: RecipeType): FormState {
  if (recipe) {
    return {
      image: recipe.image,
      title: recipe.title,
      servings: recipe.servings,
      prepTime: recipe.prep_time,
      cookTime: recipe.cook_time,
      requiredIngredients: recipe.required_ingredients,
      optionalIngredients: recipe.optional_ingredients || [],
      directions: recipe.directions,
    }
  }

  return {
    image: null,
    title: '',
    servings: 0,
    prepTime: 0,
    cookTime: 0,
    requiredIngredients: [],
    optionalIngredients: [],
    directions: [],
  }
}