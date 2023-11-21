import { api } from "~/utils/api";
import ServiceScroll from "./ServiceScroll";
import SubFilterBar from "./SubFilterBar";
import { ServiceType } from "@prisma/client";

type CategoriesProps = {
  category: ServiceType;
  filter?: string;
  moreThan: number;
};

const Categories = ({ category, filter, moreThan }: CategoriesProps) => {
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
            Más de {moreThan} opciones
          </p>
        </div>

        <SubFilterBar />
      </div>

      <p className="flex items-center justify-center pb-12 pt-8 text-sm font-normal leading-normal text-[#7D7D7D] sm:hidden">
        {moreThan + 1} resultados
      </p>
    </div>
  );
};

export default Categories;
