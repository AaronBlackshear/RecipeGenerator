import { Recipe } from "@prisma/client";

export type NewRecipe = Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>
export type UpdatedRecipe = Omit<Recipe, 'createdAt' | 'updatedAt'>