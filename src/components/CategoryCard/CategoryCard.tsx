import classNames from 'classnames';
import Link from 'next/link';
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
    <Link href="#" className={classNames(
      "m-1 rounded-2xl flex justify-center items-center gap-x-2 p-4 bg-gray-12 drop-shadow-md mb-2 transition-none",
      "hover:outline outline-2 outline-blue-5 hover:bg-white"
    )}>
      <span className="text-2xl">{category.icon}</span>
      <span className="body-bold whitespace-nowrap">{category.title}</span>
    </Link>
  )
}
