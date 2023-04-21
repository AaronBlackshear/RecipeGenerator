import { NewRecipe } from '@shared/types';
import axios from 'axios';

export const createRecipe = (recipe: NewRecipe) => {
  return axios.post(`/api/recipes/new`, { recipe });
}
