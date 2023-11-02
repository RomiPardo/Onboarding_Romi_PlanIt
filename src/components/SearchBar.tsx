import React from "react";

const SearchBar = () => {
  return (
    <div className="bg-light-gray flex w-full items-center justify-between rounded-full border border-gray sm:w-[587px]">
      <img className="ml-2 sm:hidden" src="/navbar/searchButton.png" />

      <input
        type="text"
        className="bg-light-gray flex-grow rounded-full p-2 focus:outline-none sm:ml-2"
      />

      <img className="mr-2 hidden sm:block" src="/navbar/searchButton.png" />

      <img className="mr-2 sm:hidden" src="/navbar/filters.png" />
    </div>
  );
};

export default SearchBar;
