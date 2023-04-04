import React from 'react'

export type Category = {
  icon: string;
  title: string;
}

type Props = {
  category: Category;
}

export function CategoryCard({ category }: Props) {
  return (
    <div className="m-1 rounded-2xl flex justify-center items-center gap-x-2 p-4 dark:bg-gray-1">
      <span className="text-2xl">{category.icon}</span>
      <span className="body-bold whitespace-nowrap">{category.title}</span>
    </div>
  )
}
