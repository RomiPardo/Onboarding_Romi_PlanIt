import { Listbox } from "@headlessui/react";
import DropdownArrow from "./DropdownArrow";

type MultiSelectProps = {
  data: string[];
  selectedData: string[];
  changeSelectedData: (newData: string[]) => void;
};

const MultiSelect = ({
  data,
  selectedData,
  changeSelectedData,
}: MultiSelectProps) => (
  <Listbox value={selectedData} onChange={changeSelectedData} multiple>
    <Listbox.Button className="relative flex items-center justify-between gap-x-2 rounded-lg border bg-white px-3 py-2 text-left hover:cursor-pointer focus:outline-none">
      <p>Filtrar por sub-categoria</p>

      <DropdownArrow />
    </Listbox.Button>
    <Listbox.Options className="absolute top-96 z-50 w-44 overflow-auto rounded-b-md bg-white">
      {data.map((item) => (
        <Listbox.Option
          key={item}
          value={item}
          className={({ selected }) =>
            `relative cursor-default select-none px-4 py-2 hover:cursor-pointer hover:text-blue-300 ${
              selected ? "text-blue-300" : "text-black"
            }`
          }
        >
          <span className="block truncate">{item}</span>
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </Listbox>
);

export default MultiSelect;
