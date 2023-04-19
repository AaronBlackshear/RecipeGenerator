import * as yup from "yup";

export const recipeFormSchema = yup.object({
  title: yup.string().required(),
  image: yup.string().required(),
  servings: yup.number().min(1).required().positive().integer(),
  prepTime: yup.number().min(1).required().positive().integer(),
  cookTime: yup.number().min(1).required().positive().integer(),
  requiredIngredients: yup.array().of(yup.object().shape({ value: yup.string() }).required()).required(),
  optionalIngredients: yup.array().of(yup.object().shape({ value: yup.string() }).required()).optional(),
  directions: yup.array().of(yup.object().shape({ value: yup.string() }).required()).required(),
}).required();
