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
    if (newOrderBy) {
      localStorage.setItem("selectedOrder", newOrderBy);
      context.setSelectedOrder(newOrderBy);
    } else {
      localStorage.removeItem("selectedOrder");
      context.setSelectedOrder("");
    }
  };

  const setNewSearchFilter = (newSearchFilter: string | undefined) => {
    if (newSearchFilter) {
      localStorage.setItem("searchFilter", newSearchFilter);
      context.setSearchFilter(newSearchFilter);
    } else {
      localStorage.removeItem("searchFilter");
      context.setSearchFilter("");
    }
  };

  const setNewSubcategories = (newSubcategories: string[] | undefined) => {
    if (typeof window !== "undefined") {
      if (newSubcategories) {
        localStorage.setItem("subcategories", JSON.stringify(newSubcategories));
        context.setSubcategories(newSubcategories);
      } else {
        localStorage.removeItem("subcategories");
        context.setSubcategories([]);
      }
    }
  };

  const setNewSelectedSubcategories = (
    newSelectedSubcategories: string[] | undefined,
  ) => {
    if (newSelectedSubcategories) {
      localStorage.setItem(
        "selectedSubcategoriesFilters",
        JSON.stringify(newSelectedSubcategories),
      );
      context.setSelectedSubcategoriesFilters(newSelectedSubcategories);
    } else {
      localStorage.removeItem("selectedSubcategoriesFilters");
      context.setSelectedSubcategoriesFilters([]);
    }
  };

  const clearAll = () => {
    localStorage.removeItem("selectedSubcategoriesFilters");
    localStorage.removeItem("subcategories");
    localStorage.removeItem("searchFilter");
    localStorage.removeItem("selectedOrder");
    context.setSelectedSubcategoriesFilters([]);
    context.setSearchFilter("");
    context.setSubcategories([]);
    context.setSelectedOrder("");
  };

  return {
    searchFilter: context.searchFilter,
    setSearchFilter: setNewSearchFilter,
    selectedSubcategories: context.selectedSubcategoriesFilters,
    setSelectedSubcategories: setNewSelectedSubcategories,
    selectedOrder: context.selectedOrder,
    setSelectedOrder: setNewOrderBy,
    subcategories: context.subcategories,
    setSubcategories: setNewSubcategories,
    clearAll,
  };
};
