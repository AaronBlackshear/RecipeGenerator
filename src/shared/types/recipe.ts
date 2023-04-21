import { Recipe } from "@prisma/client";

export type NewRecipe = Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>