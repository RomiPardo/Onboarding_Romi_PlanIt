import { orderOptions } from "../utils/constants";
import { api } from "~/utils/api";
import { useFilteringContext } from "~/hooks/useFilteringContext";
import MultiSelect from "./MultiSelect";
import Select from "./Select";
import CloseButton from "./CloseButton";

const SubFilterBar = () => {
  const {
    selectedOrder,
    selectedSubcategories,
    subcategories,
    setSelectedSubcategories,
    setSelectedOrder,
  } = useFilteringContext();

  const utils = api.useUtils();

  const callFilterBySubcategory = async (filters: string[]) => {
    setSelectedSubcategories(filters);
    await utils.service.getFilteredServices.invalidate();
  };

  const callFilterByOrder = async (order: string) => {
    setSelectedOrder(order);
    await utils.service.getFilteredServices.invalidate();
  };

  return (
    <div className="hidden flex-col gap-y-4 pb-14 pt-10 sm:flex">
      <div className="flex flex-row text-sm font-light leading-5">
        {subcategories.length !== 0 && (
          <MultiSelect
            data={subcategories}
            selectedData={selectedSubcategories}
            changeSelectedData={callFilterBySubcategory}
          />
        )}

        {selectedSubcategories.length !== 0 && (
          <div className="flex flex-row gap-x-2 pl-3">
            {selectedSubcategories.map((category, index) => (
              <div
                key={index}
                className="relative flex flex-row items-center justify-between gap-x-3 rounded-lg border bg-white px-3 py-2 text-left"
              >
                {category}

                <CloseButton
                  onClick={() =>
                    callFilterBySubcategory(
                      selectedSubcategories.filter(
                        (subcategoryList) => subcategoryList !== category,
                      ),
                    )
                  }
                />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-grow justify-end">
          <Select
            data={orderOptions}
            selectedData={selectedOrder}
            changeSelectedData={callFilterByOrder}
          />
        </div>
      </div>

      <hr className="w-full border-black" />
    </div>
  );
};

export default SubFilterBar;
