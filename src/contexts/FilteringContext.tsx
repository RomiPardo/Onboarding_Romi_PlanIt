import { createContext, useState, ReactNode, useEffect } from "react";
import useStorage from "~/hooks/useStorage";

type ContextType = {
  searchFilter: string;
  setSearchFilter: (newValue: string) => void;
  selectedSubcategoriesFilters: string[];
  setSelectedSubcategoriesFilters: (subcategoriesSelected: string[]) => void;
  selectedOrder: string;
  setSelectedOrder: (newOrderBy: string) => void;
  subcategories: string[];
  setSubcategories: (newSubcategories: string[]) => void;
};

export const FilteringContext = createContext<ContextType>({
  setSearchFilter: (newValue: string) => {
    return;
  },
  searchFilter: "",
  setSelectedSubcategoriesFilters: (newValue: string[]) => {
    return;
  },
  selectedSubcategoriesFilters: [],
  setSelectedOrder: (newValue: string) => {
    return;
  },
  selectedOrder: "",
  setSubcategories: (newValue: string[]) => {
    return;
  },
  subcategories: [],
});

type WrapperProps = {
  children: ReactNode;
};

export const FilteringContextProvider = ({ children }: WrapperProps) => {
  const { getItem } = useStorage();
  const selectedSubcategoriesFiltersStoredValue = getItem(
    "selectedSubcategoriesFilters",
    "local",
  );
  const selectedOrderStoredValue = getItem("selectedOrder", "local");
  const searchFilterStoredValue = getItem("searchFilter", "local");
  const subcategoriesStoredValue = getItem("subcategories", "local");

  const [selectedSubcategoriesFilters, setSelectedSubcategoriesFilters] =
    useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [subcategories, setSubcategories] = useState<string[]>([]);

  useEffect(() => {
    if (selectedSubcategoriesFiltersStoredValue) {
      setSelectedSubcategoriesFilters(
        JSON.parse(selectedSubcategoriesFiltersStoredValue) as string[],
      );
    }
  }, [selectedSubcategoriesFiltersStoredValue]);

  useEffect(() => {
    if (subcategoriesStoredValue) {
      setSubcategories(JSON.parse(subcategoriesStoredValue) as string[]);
    }
  }, [subcategoriesStoredValue]);

  useEffect(() => {
    if (selectedOrderStoredValue) {
      setSelectedOrder(selectedOrderStoredValue);
    }
  }, [selectedOrderStoredValue]);

  useEffect(() => {
    if (searchFilterStoredValue) {
      setSearchFilter(searchFilterStoredValue);
    }
  }, [searchFilterStoredValue]);

  return (
    <FilteringContext.Provider
      value={{
        searchFilter: searchFilter,
        setSearchFilter: setSearchFilter,
        selectedSubcategoriesFilters: selectedSubcategoriesFilters,
        setSelectedSubcategoriesFilters: setSelectedSubcategoriesFilters,
        selectedOrder: selectedOrder,
        setSelectedOrder: setSelectedOrder,
        subcategories: subcategories,
        setSubcategories: setSubcategories,
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
};
