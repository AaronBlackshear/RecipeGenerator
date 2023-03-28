import { Nullable } from '@utils/types';
import { createContext, Dispatch, useContext, useReducer } from 'react';
import { ImageType } from 'react-images-uploading';

export type FormState = {
  image: Nullable<ImageType>;
  title: string;
  servings: number,
  prepTime: number,
  cookTime: number,
};

const FormStateContext = createContext(getInitialFormState());
const FormStateDispatchContext = createContext<Dispatch<FormStateReducerActions>>((value: FormStateReducerActions) => { });

type Props = {
  children: React.ReactNode;
}

export function FormStateProvider({ children }: Props) {
  const [formState, dispatch] = useReducer(
    formStateReducer,
    initialFormState
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

const initialFormState = getInitialFormState();

function getInitialFormState(): FormState {
  return {
    image: null,
    title: '',
    servings: 0,
    prepTime: 0,
    cookTime: 0,
  }
}