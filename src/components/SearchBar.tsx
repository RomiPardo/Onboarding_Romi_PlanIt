import React, { useState } from "react";
import Image from "next/image";
import { api } from "~/utils/api";
import { Menu } from "@headlessui/react";
import ItemDropdown from "./DropdownItem";
import { orderOptions } from "./listsOfValues";
import { useFilteringContext } from "~/hooks/useFilteringContext";

const SearchBar = () => {
  const {
    selectedOrder = "",
    selectedAssetFilters = [],
    assets = [],
    searchFilter = "",
    setSelectedAssetFilters,
    setSelectedOrder,
    setSearchFilter,
  } = useFilteringContext();

  const utils = api.useUtils();

  const callFilterByAsset = async (asset: string) => {
    const assetsSelected = selectedAssetFilters.includes(asset)
      ? selectedAssetFilters.filter((assetList) => assetList !== asset)
      : [...selectedAssetFilters, asset];
    console.log(assetsSelected);
    setSelectedAssetFilters(assetsSelected);
    await utils.service.getFilteredServices.invalidate();
  };

  const callFilterByOrder = async (newOrderBy: string) => {
    setSelectedOrder(newOrderBy);
    await utils.service.getFilteredServices.invalidate();
  };

  return (
    <div className="flex h-9 w-full items-center justify-between rounded-full border border-[#EEEEEE] bg-light-gray sm:w-[460px] md:w-[587px]">
      <Image
        className="my-2 ml-1 hover:cursor-pointer sm:hidden"
        src="/navbar/searchButton.png"
        alt="search button"
        width={28}
        height={28}
      />

      <input
        type="text"
        className="flex-grow rounded-full bg-light-gray text-center focus:outline-none sm:m-2"
        onChange={(e) => setSearchFilter(e.target.value)}
        value={searchFilter}
      />

      <Image
        className="my-2 mr-1 hidden hover:cursor-pointer sm:block"
        src="/navbar/searchButton.png"
        alt="search button"
        width={28}
        height={28}
      />

      <Menu
        as="div"
        className="my-2 mr-1 text-sm font-light leading-5 sm:hidden"
      >
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
            {assets.length !== 0 && (
              <div className="px-1 py-1 ">
                <h5 className="font-normal">Filtrar por sub-categoria</h5>

                {assets.map((asset, index) => (
                  <Menu.Item key={index}>
                    <div
                      onClick={() => callFilterByAsset(asset)}
                      className={`${
                        selectedAssetFilters.includes(asset)
                          ? "text-blue-300"
                          : ""
                      } ml-4 w-full py-2 text-sm font-light leading-5 text-black hover:text-blue-300`}
                    >
                      {asset}
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

export default SearchBar;
