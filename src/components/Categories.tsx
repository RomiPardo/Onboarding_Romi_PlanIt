import { api } from "~/utils/api";
import ServiceScroll from "./ServiceScroll";
import SubFilterBar from "./SubFilterBar";
import { ServiceType } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

type CategoriesProps = {
  category: ServiceType;
  moreThan: number;
  assetFilteringInfo: {
    selectedAssetFilters: string[];
    setSelectedAssetFilters: Dispatch<SetStateAction<string[]>>;
    selectedOrder: string;
    setSelectedOrder: Dispatch<SetStateAction<string>>;
    assets: string[];
  };
};

const Categories = ({
  category,
  moreThan,
  assetFilteringInfo,
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

          <p className="text-lg font-normal leading-5">
            {moreThan >= 2 ? (
              <span>Más de {moreThan} opciones</span>
            ) : moreThan === 1 ? (
              <span>Se encontraron {moreThan + 1} resultados</span>
            ) : moreThan === 0 ? (
              <span>Se encontró {moreThan + 1} resultado</span>
            ) : (
              <span>No se encontraron resultados</span>
            )}
          </p>
        </div>

        <SubFilterBar {...assetFilteringInfo} />
      </div>

      <p className="flex items-center justify-center pb-12 pt-8 text-sm font-normal leading-normal text-[#7D7D7D] sm:hidden">
        {moreThan + 1 > 1 ? (
          <span>{moreThan + 1} resultados</span>
        ) : moreThan + 1 === 1 ? (
          <span>{moreThan + 1} resultado</span>
        ) : (
          <span>No se encontraron resultados</span>
        )}
      </p>
    </div>
  );
};

export default Categories;
