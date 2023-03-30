export interface RecipeType {
  _id: string;
  title: string;
  slug: string;
  image: string;
  servings: number;
  prep_time: number;
  cook_time: number;
  required_ingredients: string[];
  optional_ingredients?: string[];
  directions: string[];
}
