import React from "react";
import Image from "next/image";
import { api } from "~/utils/api";
import { Menu } from "@headlessui/react";
import { orderOptions } from "../utils/constants";
import { useFilteringContext } from "~/hooks/useFilteringContext";

const FilterBar = () => {
  const {
    selectedOrder,
    selectedSubcategories,
    subcategories,
    searchFilter,
    setSelectedSubcategories,
    setSelectedOrder,
    setSearchFilter,
  } = useFilteringContext();

  const utils = api.useUtils();

  const callFilterBySubcategory = async (subcategory: string) => {
    const subcategoriesSelected = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter(
          (subcategoryList) => subcategoryList !== subcategory,
        )
      : [...selectedSubcategories, subcategory];
    setSelectedSubcategories(subcategoriesSelected);
    await utils.service.getFilteredServices.invalidate();
  };

  const callFilterByOrder = async (newOrderBy: string) => {
    setSelectedOrder(newOrderBy);
    await utils.service.getFilteredServices.invalidate();
  };

  return (
    <div className="flex h-9 w-full items-center justify-between rounded-full border border-[#EEEEEE] bg-light-gray">
      <Image
        className="my-2 ml-1 hover:cursor-pointer"
        src="/navbar/searchButton.png"
        alt="search button"
        width={28}
        height={28}
      />

      <input
        type="text"
        className="flex-grow rounded-full bg-light-gray text-center focus:outline-none"
        onChange={(e) => setSearchFilter(e.target.value)}
        value={searchFilter}
      />

      <Menu as="div" className="my-2 mr-1 text-sm font-light leading-5">
        <Menu.Button>
          <Image
            className=" mt-[6px] hover:cursor-pointer"
            src="/navbar/filters.png"
            alt="filters button"
            width={28}
            height={28}
          />
        </Menu.Button>

        <Menu.Items className="absolute right-0 mr-6 w-56 rounded-md bg-white p-5 shadow-xs">
          <Menu.Items>
            {subcategories.length !== 0 && (
              <div className="px-1 py-1 ">
                <h5 className="font-normal">Filtrar por sub-categoria</h5>

                {subcategories.map((subcategory, index) => (
                  <Menu.Item key={index}>
                    <div
                      onClick={() => callFilterBySubcategory(subcategory)}
                      className={`${
                        selectedSubcategories.includes(subcategory)
                          ? "text-blue-300"
                          : ""
                      } ml-4 w-full py-2 text-sm font-light leading-5 text-black hover:text-blue-300`}
                    >
                      {subcategory}
                    </div>
                  </Menu.Item>
                ))}
              </div>
            )}

            <div className="px-1 py-1 ">
              <h5 className="font-normal">Ordenar</h5>

              {orderOptions.map((order, index) => (
                <Menu.Item key={index}>
                  <div
                    onClick={() => callFilterByOrder(order.value)}
                    className={`${
                      order.value === selectedOrder ? "text-blue-300" : ""
                    } ml-4 w-full py-2 text-sm font-light leading-5 text-black hover:text-blue-300`}
                  >
                    {order.label}
                  </div>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default FilterBar;
