import { createContext, useState, ReactNode, useEffect } from "react";
import useStorage from "~/hooks/useStorage";

type ContextType = {
  searchFilter?: string;
  setSearchFilter: (newValue: string | undefined) => void;
  selectedAssetFilters?: string[];
  setSelectedAssetFilters: (assetsSelected: string[] | undefined) => void;
  selectedOrder?: string;
  setSelectedOrder: (newOrderBy: string | undefined) => void;
  assets?: string[];
  setAssets: (newAssets: string[] | undefined) => void;
};

export const FilteringContext = createContext<ContextType>({
  setSearchFilter: (newValue: string | undefined) => {
    return;
  },
  setSelectedAssetFilters: (newValue: string[] | undefined) => {
    return;
  },
  setSelectedOrder: (newValue: string | undefined) => {
    return;
  },
  setAssets: (newValue: string[] | undefined) => {
    return;
  },
});

type WrapperProps = {
  children: ReactNode;
};

export const FilteringContextProvider = ({ children }: WrapperProps) => {
  const { getItem } = useStorage();
  const selectedAssetFiltersStoredValue = getItem(
    "selectedAssetFilters",
    "local",
  );
  const selectedOrderStoredValue = getItem("selectedOrder", "local");
  const searchFilterStoredValue = getItem("searchFilter", "local");
  const assetsStoredValue = getItem("assets", "local");

  const [selectedAssetFilters, setSelectedAssetFilters] = useState<
    string[] | undefined
  >([]);
  const [selectedOrder, setSelectedOrder] = useState<string | undefined>("");
  const [searchFilter, setSearchFilter] = useState<string | undefined>("");
  const [assets, setAssets] = useState<string[] | undefined>([]);

  useEffect(() => {
    if (selectedAssetFiltersStoredValue) {
      setSelectedAssetFilters(
        JSON.parse(selectedAssetFiltersStoredValue) as string[],
      );
    }
  }, [selectedAssetFiltersStoredValue]);

  useEffect(() => {
    if (assetsStoredValue) {
      setAssets(JSON.parse(assetsStoredValue) as string[]);
    }
  }, [assetsStoredValue]);

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
        selectedAssetFilters: selectedAssetFilters,
        setSelectedAssetFilters: setSelectedAssetFilters,
        selectedOrder: selectedOrder,
        setSelectedOrder: setSelectedOrder,
        assets: assets,
        setAssets: setAssets,
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
};
