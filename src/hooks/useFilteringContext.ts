import { useContext } from "react";
import { FilteringContext } from "~/contexts/FilteringContext";

export const useFilteringContext = () => {
  const context = useContext(FilteringContext);

  if (!context) {
    throw new Error(
      "useFilteringContext debe ser utilizado dentro de un FilteringProvider",
    );
  }

  const setNewOrderBy = (newOrderBy: string | undefined) => {
    newOrderBy
      ? localStorage.setItem("selectedOrder", newOrderBy)
      : localStorage.removeItem("selectedOrder");

    context.setSelectedOrder(newOrderBy);
  };

  const setNewSearchFilter = (newSearchFilter: string | undefined) => {
    newSearchFilter
      ? localStorage.setItem("searchFilter", newSearchFilter)
      : localStorage.removeItem("searchFilter");

    context.setSearchFilter(newSearchFilter);
  };

  const setNewAssets = (newAssets: string[] | undefined) => {
    newAssets
      ? localStorage.setItem("assets", JSON.stringify(newAssets))
      : localStorage.removeItem("assets");

    context.setAssets(newAssets);
  };

  const setNewSelectedAssets = (newSelectedAssets: string[] | undefined) => {
    newSelectedAssets
      ? localStorage.setItem(
          "selectedAssetFilters",
          JSON.stringify(newSelectedAssets),
        )
      : localStorage.removeItem("selectedAssetFilters");

    context.setSelectedAssetFilters(newSelectedAssets);
  };

  const clearAll = () => {
    localStorage.removeItem("selectedAssetFilters");
    localStorage.removeItem("assets");
    localStorage.removeItem("searchFilter");
    localStorage.removeItem("searchFilter");
    context.setSelectedAssetFilters(undefined);
    context.setSearchFilter(undefined);
    context.setAssets(undefined);
    context.setSelectedOrder(undefined);
  };

  return {
    searchFilter: context.searchFilter,
    setSearchFilter: setNewSearchFilter,
    selectedAssetFilters: context.selectedAssetFilters,
    setSelectedAssetFilters: setNewSelectedAssets,
    selectedOrder: context.selectedOrder,
    setSelectedOrder: setNewOrderBy,
    assets: context.assets,
    setAssets: setNewAssets,
    clearAll,
  };
};
