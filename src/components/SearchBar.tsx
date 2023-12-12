import React, { useState } from "react";
import Image from "next/image";
import { useSearchFilterContext } from "~/contexts/SearchFilterContext";

type SearchBar = {
  filter: string;
  setFilter: (filter: string) => void;
};

const SearchBar = ({ filter, setFilter }: SearchBar) => {
  const { setSearchFilter } = useSearchFilterContext("searchFilter");

  const changeSetFilter = () => {
    setSearchFilter(filter);
  };

  return (
    <div className="flex h-9 w-full items-center justify-between rounded-full border border-[#EEEEEE] bg-light-gray sm:w-[460px] md:w-[587px]">
      <Image
        className="my-2 ml-1 hover:cursor-pointer sm:hidden"
        src="/navbar/searchButton.png"
        alt="search button"
        width={28}
        height={28}
      />

      <input
        type="text"
        className="flex-grow rounded-full bg-light-gray text-center focus:outline-none sm:m-2"
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      />

      <Image
        className="my-2 mr-1 hidden hover:cursor-pointer sm:block"
        src="/navbar/searchButton.png"
        alt="search button"
        width={28}
        height={28}
        onClick={changeSetFilter}
      />

      <Image
        className="my-2 mr-1 hover:cursor-pointer sm:hidden"
        src="/navbar/filters.png"
        alt="filters button"
        width={28}
        height={28}
      />
    </div>
  );
};

export default SearchBar;
