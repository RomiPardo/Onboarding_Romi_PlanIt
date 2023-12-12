import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import useStorage from "~/hooks/useStorage";

type ContextType = {
  searchFilter?: string;
  setSearchFilter: (newValue: string | undefined) => void;
};

const SearchFilterContext = createContext<ContextType>({
  setSearchFilter: (newValue: string | undefined) => {
    return;
  },
});

type WrapperProps = {
  children: ReactNode;
};

export const SearchFilterWrapper = ({ children }: WrapperProps) => {
  const { getItem } = useStorage();
  const storedValue = getItem("searchFilter", "local");

  const [searchFilter, setSearchFilter] = useState<string | undefined>();

  useEffect(() => {
    if (storedValue) {
      setSearchFilter(storedValue);
    }
  }, [storedValue]);

  return (
    <SearchFilterContext.Provider
      value={{ searchFilter: searchFilter, setSearchFilter: setSearchFilter }}
    >
      {children}
    </SearchFilterContext.Provider>
  );
};

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
