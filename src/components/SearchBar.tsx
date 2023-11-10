import React from "react";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="flex h-9 w-full items-center justify-between rounded-full border border-gray bg-light-gray">
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
      />

      <Image
        className="my-2 mr-1 hidden hover:cursor-pointer sm:block"
        src="/navbar/searchButton.png"
        alt="search button"
        width={28}
        height={28}
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
