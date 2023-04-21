import { Input } from '@components/Form';
import { Combobox } from '@headlessui/react';
import { useApiBootData } from '@page_impls/HomePage/useApiBootData';
import { Recipe } from '@prisma/client';
import { Nullable } from '@utils/types';
import { getRecipeUrl } from '@utils/url_app';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export function Search() {
  const router = useRouter();

  // TEMP
  const data = useApiBootData();

  const [selectedValue, setSelectedValue] = useState<Nullable<Recipe>>(null);
  const [searchValue, setSearchValue] = useState<string>();

  return (
    <Combobox value={selectedValue} onChange={(recipe) => {
      setSelectedValue(recipe);
      // TODO: Add case for no recipe options
      if (recipe) router.push(getRecipeUrl(recipe.slug))
    }}>
      <div className="relative w-full max-w-xs">
        <Combobox.Input
          as={Input}
          label="Search"
          value={selectedValue?.title || searchValue}
          onChange={(event) => {
            setSelectedValue(null)
            setSearchValue(event.target.value)
          }}
        />
        <Combobox.Options className="absolute z-10 top-16 w-full bg-gray-12 drop-shadow-md rounded-2xl py-4 list-none">
          {data?.recentRecipes.map((recipe) => (
            <Combobox.Option key={recipe.id} value={recipe}>
              {({ active }) => (
                <p className={classNames(
                  'body-small-bold px-4 py-1',
                  active && 'bg-gray-11',
                )}>{recipe.title}</p>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}
