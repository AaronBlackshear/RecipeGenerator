import { Input } from '@components/Form';
import { SearchItem } from '@components/Search/SearchItem';
import { Combobox } from '@headlessui/react';
import { useRecipes } from '@hooks/recipe/queries';
import { Recipe } from '@prisma/client';
import { Nullable } from '@utils/types';
import { getRecipeNewUrl, getRecipeUrl } from '@utils/url_app';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';

export function Search() {
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<Nullable<Recipe>>(null);
  const [searchValue, setSearchValue] = useState<string>();

  const data = useRecipes({ search: searchValue });

  const debouncedChangeHandler = useMemo(
    () => debounce(((event: React.ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)), 300)
    , []);

  return (
    <Combobox value={selectedValue} onChange={(recipe) => {
      setSelectedValue(recipe);
      if (recipe) router.push(getRecipeUrl(recipe.slug))
      else router.push(getRecipeNewUrl())
    }}>
      <div className="relative w-full max-w-xs">
        <Combobox.Input
          as={Input}
          label="Search"
          value={selectedValue?.title || inputValue}
          onChange={(event) => {
            setSelectedValue(null)
            setInputValue(event.target.value)

            debouncedChangeHandler(event)
          }}
        />
        <Combobox.Options className="absolute z-10 top-16 w-full bg-gray-12 drop-shadow-md rounded-2xl py-4 list-none">
          {data?.recipes?.length > 0 ? (
            data?.recipes?.map((recipe) => (
              <SearchItem value={recipe}>
                {recipe.title}
              </SearchItem>
            ))
          ) : (
            <SearchItem value={null}>+ Create new recipe</SearchItem>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}
