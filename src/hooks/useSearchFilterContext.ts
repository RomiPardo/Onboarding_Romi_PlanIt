import { useContext } from "react";
import { SearchFilterContext } from "~/contexts/SearchFilterContext";

export const useSearchFilterContext = (key: string) => {
  const context = useContext(SearchFilterContext);

  if (!context) {
    throw new Error(
      "useSearchFilterContext debe ser utilizado dentro de un SearchFilterProvider",
    );
  }

  const setter = (searchFilter: string | undefined) => {
    searchFilter
      ? localStorage.setItem(key, searchFilter)
      : localStorage.removeItem(key);
    context.setSearchFilter(searchFilter);
  };

  return { searchFilter: context.searchFilter, setSearchFilter: setter };
};
