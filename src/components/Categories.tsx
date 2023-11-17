import ServiceScroll from "./ServiceScroll";
import SubFilterBar from "./SubFilterBar";

type CategoriesProps = {
  category: "PRESENT" | "MERCHANDISING" | "EVENT" | "CATERING";
};

const Categories = ({ category }: CategoriesProps) => {
  const categorySpanish =
    category === "PRESENT"
      ? "REGALO"
      : category === "MERCHANDISING"
      ? "MERCHANDISING"
      : category === "EVENT"
      ? "EVENTO"
      : "CATERING";

  return (
    <main className="bg-light-gray px-5 pb-32 pt-8 font-poppins sm:px-32 sm:pb-28 sm:pt-24">
      <div className="hidden flex-col sm:flex">
        <div>
          <h6 className="text-xl font-normal leading-5">{categorySpanish}</h6>

          <h4 className="pb-4 text-4xl font-medium leading-9">Food Box*</h4>

          <p className="text-lg font-normal leading-5">Más de 30 opciones*</p>
        </div>

        <SubFilterBar />
      </div>

      <ServiceScroll category={category} />
    </main>
  );
};

export default Categories;
