import { api } from "~/utils/api";
import ServiceScroll from "./ServiceScroll";
import SubFilterBar from "./SubFilterBar";
import { ServiceType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type CategoriesProps = {
  category: ServiceType;
  filter?: string;
  moreThan: number;
  subFilters: string[];
  selectedFilters: string[];
  changeFilters: Dispatch<SetStateAction<string[]>>;
  selectedOrder: string;
  changeOrder: Dispatch<SetStateAction<string>>;
};

const Categories = ({
  category,
  filter,
  moreThan,
  subFilters,
  selectedFilters,
  changeFilters,
  selectedOrder,
  changeOrder,
}: CategoriesProps) => {
  const categorySpanish =
    category === "PRESENT"
      ? "REGALOS"
      : category === "MERCHANDISING"
      ? "MERCHANDISING"
      : category === "EVENT"
      ? "EVENTOS"
      : "CATERING";

  return (
    <div>
      <div className="hidden flex-col sm:flex">
        <div>
          <h6 className="text-xl font-normal leading-5">{categorySpanish}</h6>

          <h4 className="pb-4 text-4xl font-medium leading-9">{filter}</h4>

          <p className="text-lg font-normal leading-5">
            {moreThan > 2 ? (
              <span>Más de {moreThan} opciones</span>
            ) : moreThan === 2 ? (
              <span>Se encontraron {moreThan + 1} resultados</span>
            ) : moreThan === 1 ? (
              <span>Se encontró {moreThan + 1} resultado</span>
            ) : (
              <span>No se encontraron resultados</span>
            )}
          </p>
        </div>

        <SubFilterBar
          subFilters={subFilters}
          selectedFilters={selectedFilters}
          changeFilters={changeFilters}
          selectedOrder={selectedOrder}
          changeOrder={changeOrder}
        />
      </div>

      <p className="flex items-center justify-center pb-12 pt-8 text-sm font-normal leading-normal text-[#7D7D7D] sm:hidden">
        {moreThan !== 0 ? (
          <span>{moreThan + 1} resultados</span>
        ) : (
          <span>No se encontraron resultados</span>
        )}
      </p>
    </div>
  );
};

export default Categories;
