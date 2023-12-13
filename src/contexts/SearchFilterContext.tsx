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

export const SearchFilterContext = createContext<ContextType>({
  setSearchFilter: (newValue: string | undefined) => {
    return;
  },
});

type WrapperProps = {
  children: ReactNode;
};

export const SearchFilterContextProvider = ({ children }: WrapperProps) => {
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
