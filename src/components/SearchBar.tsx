import React from "react";

const SearchBar = () => {
  return (
    <div className="flex w-full items-center justify-between rounded-full border border-light-gray bg-light-gray sm:w-[587px]">
      <img
        className="ml-2 hover:cursor-pointer sm:hidden"
        src="/navbar/searchButton.png"
      />

      <input
        type="text"
        className="flex-grow rounded-full bg-light-gray p-2 focus:outline-none sm:ml-2"
      />

      <img
        className="mr-2 hidden hover:cursor-pointer sm:block"
        src="/navbar/searchButton.png"
      />

      <img
        className="mr-2 hover:cursor-pointer sm:hidden"
        src="/navbar/filters.png"
      />
    </div>
  );
};

export default SearchBar;
