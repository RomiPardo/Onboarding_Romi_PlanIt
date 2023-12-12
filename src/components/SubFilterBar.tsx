import { orderOptions } from "./listsOfValues";
import { Listbox } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import { api } from "~/utils/api";
import DropdownArrow from "./DropdownArrow";

type subFiltersBarProps = {
  subFilters: string[];
  selectedFilters: string[];
  changeFilters: Dispatch<SetStateAction<string[]>>;
  selectedOrder: string;
  changeOrder: Dispatch<SetStateAction<string>>;
};

const SubFilterBar = ({
  subFilters,
  selectedFilters,
  changeFilters,
  selectedOrder,
  changeOrder,
}: subFiltersBarProps) => {
  const utils = api.useUtils();

  const callFilterByAsset = async (filters: string[]) => {
    changeFilters(filters);
    await utils.service.getFilteredServices.invalidate();
  };

  const callFilterByOrder = async (order: string) => {
    changeOrder(order);
    await utils.service.getFilteredServices.invalidate();
  };

  return (
    <div className="hidden flex-col gap-y-4 pb-14 pt-10 sm:flex">
      <div className="flex flex-row text-sm font-light leading-5">
        {subFilters.length !== 0 && (
          <Listbox
            value={selectedFilters}
            onChange={callFilterByAsset}
            multiple
          >
            <Listbox.Button className="relative flex items-center justify-between gap-x-2 rounded-lg border bg-white px-3 py-2 text-left hover:cursor-pointer focus:outline-none">
              <p>Filtrar por sub-categoria</p>

              <DropdownArrow />
            </Listbox.Button>
            <Listbox.Options className="absolute top-96 z-50 w-44 overflow-auto rounded-b-md bg-white">
              {subFilters.map((asset) => (
                <Listbox.Option
                  key={asset}
                  value={asset}
                  className={({ selected }) =>
                    `relative cursor-default select-none px-4 py-2 hover:cursor-pointer hover:text-blue-300 ${
                      selected ? "text-blue-300" : "text-black"
                    }`
                  }
                >
                  <span className={`block truncate`}>{asset}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        )}

        <div className="flex flex-row gap-x-2 pl-3">
          {selectedFilters.map((asset, index) => (
            <div
              key={index}
              className="relative flex flex-row items-center justify-between gap-x-3 rounded-lg border bg-white px-3 py-2 text-left"
            >
              {asset}

              <div
                className="flex h-5 w-5 items-center justify-center rounded-full border border-gray hover:cursor-pointer"
                onClick={() =>
                  callFilterByAsset(
                    selectedFilters.filter((assetList) => assetList !== asset),
                  )
                }
              >
                <p>X</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-grow justify-end">
          <Listbox value={selectedOrder} onChange={callFilterByOrder}>
            <Listbox.Button className="relative flex items-center justify-between gap-x-2 rounded-lg border bg-white px-3 py-2 text-left hover:cursor-pointer focus:outline-none">
              <p>Ordenar</p>

              <DropdownArrow />
            </Listbox.Button>
            <Listbox.Options className="absolute right-32 top-96 z-50 w-44 overflow-auto rounded-b-md bg-white">
              {orderOptions.map((option, index) => (
                <Listbox.Option
                  key={index}
                  value={option.value}
                  className={({ selected }) =>
                    `relative cursor-default select-none px-4 py-2 hover:cursor-pointer hover:text-blue-300 ${
                      selected ? "text-blue-300" : "text-black"
                    }`
                  }
                >
                  <span className={`block truncate`}>{option.label}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>

      <hr className="w-full border-black" />
    </div>
  );
};

export default SubFilterBar;
