import { Listbox } from "@headlessui/react";
import DropdownArrow from "./DropdownArrow";

type SelectItemsType = {
  label: string;
  value: string;
};

type SelectProps = {
  data: SelectItemsType[];
  selectedData: string;
  changeSelectedData: (newData: string) => void;
};

const Select = ({ data, selectedData, changeSelectedData }: SelectProps) => (
  <Listbox value={selectedData} onChange={changeSelectedData}>
    <Listbox.Button className="relative flex items-center justify-between gap-x-2 rounded-lg border bg-white px-3 py-2 text-left hover:cursor-pointer focus:outline-none">
      <p>Ordenar</p>

      <DropdownArrow />
    </Listbox.Button>
    <Listbox.Options className="absolute right-32 top-96 z-50 w-44 overflow-auto rounded-b-md bg-white">
      {data.map((item, index) => (
        <Listbox.Option
          key={index}
          value={item.value}
          className={({ selected }) =>
            `relative cursor-default select-none px-4 py-2 hover:cursor-pointer hover:text-blue-300 ${
              selected ? "text-blue-300" : "text-black"
            }`
          }
        >
          <span className="block truncate">{item.label}</span>
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </Listbox>
);

export default Select;
