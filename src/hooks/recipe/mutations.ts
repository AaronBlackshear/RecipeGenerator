import { createFetcher } from '@hooks/swr';
import useSWRMutation from 'swr/mutation';

export const useCreateRecipe = () => {
  const { trigger } = useSWRMutation(`/api/recipes/new`, createFetcher)

  return trigger;
}
