export interface RecipeType {
  _id: string;
  title: string;
  slug: string;
  image: string;
  servings: number;
  prep_time: number;
  cook_time: number;
  required_ingredients: { value: string }[];
  optional_ingredients?: { value: string }[];
  directions: { value: string }[];
}
