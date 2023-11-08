import React from "react";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-full border border-gray bg-light-gray sm:w-[587px]">
      <Image
        className="ml-2 hover:cursor-pointer sm:hidden"
        src="/navbar/searchButton.png"
        alt="search button"
      />

      <input
        type="text"
        className="flex-grow rounded-full bg-light-gray p-2 focus:outline-none sm:ml-2"
      />

      <Image
        className="mr-2 hidden hover:cursor-pointer sm:block"
        src="/navbar/searchButton.png"
        alt="search button"
      />

      <Image
        className="mr-2 hover:cursor-pointer sm:hidden"
        src="/navbar/filters.png"
        alt="filters button"
      />
    </div>
  );
};

export default SearchBar;
