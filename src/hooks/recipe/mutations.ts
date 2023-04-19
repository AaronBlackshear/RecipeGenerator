import useSWRMutation from 'swr/mutation'
import { creator } from '@hooks/swr';

export const useCreateRecipe = () => {
  const { trigger } = useSWRMutation(`/api/recipes/new`, creator)

  return trigger;
}
