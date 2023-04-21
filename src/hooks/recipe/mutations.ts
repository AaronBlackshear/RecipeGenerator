import { NewRecipe, UpdatedRecipe } from '@shared/types';
import axios from 'axios';

export const createRecipe = (recipe: NewRecipe) => {
  return axios.post(`/api/recipes/new`, { recipe });
}

export const updateRecipe = (recipe: UpdatedRecipe) => {
  return axios.post(`/api/recipes/${recipe.id}/edit`, { recipe });
}
