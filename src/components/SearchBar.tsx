import React from "react";
import Image from "next/image";
import { useFilteringContext } from "~/hooks/useFilteringContext";

const SearchBar = () => {
  const { searchFilter, setSearchFilter } = useFilteringContext();

  return (
    <div className="flex h-9 w-[460px] items-center justify-between rounded-full border border-[#EEEEEE] bg-light-gray md:w-[587px]">
      <input
        type="text"
        className="m-2 flex-grow rounded-full bg-light-gray text-center focus:outline-none"
        onChange={(e) => setSearchFilter(e.target.value)}
        value={searchFilter}
      />

      <Image
        className="my-2 mr-1 block hover:cursor-pointer"
        src="/navbar/searchButton.png"
        alt="search button"
        width={28}
        height={28}
      />
    </div>
  );
};

export default SearchBar;
