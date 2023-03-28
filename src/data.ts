export interface RecipeType {
  id: string;
  title: string;
  slug: string;
  image: string;
  servings: number;
  prep_time: number;
  cook_time: number;
  required_ingredients: string[];
  optional_ingredients?: string[];
  directions: string[];
  notes?: string;
}

export const recipes: RecipeType[] = [
  {
    id: '123asd',
    title: 'Cream Biscuts & Sausage Gravy',
    slug: 'cream-biscuts-and-sausage-gravy',
    image: 'https://via.placeholder.com/600x400',
    servings: 2,
    prep_time: 5,
    cook_time: 15,
    required_ingredients: [
      'Flour',
      'Baking Powder',
      'Salt',
      'Breakfast Sausage',
      'Heavy Cream',
    ],
    optional_ingredients: [
      'foo',
      'bar',
    ],
    directions: [
      'Ad magna labore commodo nostrud consequat magna duis laborum.',
      'Cillum occaecat voluptate aliqua adipisicing ex veniam voluptate minim velit anim reprehenderit.',
      'Consectetur dolore cupidatat dolor id Lorem sunt irure reprehenderit aliquip amet ea sint.',
      'Ex reprehenderit dolore esse sunt quis laboris non qui incididunt Lorem adipisicing proident.',
      'Ipsum labore ut do irure dolore aliqua labore do ea duis minim est tempor.'
    ],
    notes: 'Deserunt proident laborum nisi ad ullamco exercitation quis commodo eu. Dolor nulla veniam esse et sint laborum dolore ipsum labore ullamco culpa est. Fugiat cillum laborum irure proident est. Proident labore non dolore cillum voluptate.'
  },
  {
    id: '234dfg',
    title: 'Laborum ut anim aliqua ullamco',
    slug: 'laborum-ut-anim-aliqua-ullamco',
    image: 'https://via.placeholder.com/600x400',
    servings: 3,
    prep_time: 10,
    cook_time: 25,
    required_ingredients: [
      'Foo',
      'Bar',
    ],
    optional_ingredients: [
      'Baz',
    ],
    directions: [
      'Ad magna labore commodo nostrud consequat magna duis laborum.',
      'Cillum occaecat voluptate aliqua adipisicing ex veniam voluptate minim velit anim reprehenderit.',
      'Consectetur dolore cupidatat dolor id Lorem sunt irure reprehenderit aliquip amet ea sint.',
      'Ex reprehenderit dolore esse sunt quis laboris non qui incididunt Lorem adipisicing proident.',
      'Ipsum labore ut do irure dolore aliqua labore do ea duis minim est tempor.'
    ],
    notes: 'Deserunt proident laborum nisi ad ullamco exercitation quis commodo eu. Dolor nulla veniam esse et sint laborum dolore ipsum labore ullamco culpa est. Fugiat cillum laborum irure proident est. Proident labore non dolore cillum voluptate.'
  },
  {
    id: '456fgh',
    title: 'Duis elit adipisicing sunt',
    slug: 'duis-elit-adipisicing-sunt',
    image: 'https://via.placeholder.com/600x400',
    servings: 4,
    prep_time: 25,
    cook_time: 75,
    required_ingredients: [
      'Foo',
      'Bar',
    ],
    optional_ingredients: [
      'Baz',
    ],
    directions: [
      'Ad magna labore commodo nostrud consequat magna duis laborum.',
      'Cillum occaecat voluptate aliqua adipisicing ex veniam voluptate minim velit anim reprehenderit.',
      'Consectetur dolore cupidatat dolor id Lorem sunt irure reprehenderit aliquip amet ea sint.',
      'Ex reprehenderit dolore esse sunt quis laboris non qui incididunt Lorem adipisicing proident.',
      'Ipsum labore ut do irure dolore aliqua labore do ea duis minim est tempor.'
    ],
    notes: 'Deserunt proident laborum nisi ad ullamco exercitation quis commodo eu. Dolor nulla veniam esse et sint laborum dolore ipsum labore ullamco culpa est. Fugiat cillum laborum irure proident est. Proident labore non dolore cillum voluptate.'
  },
]