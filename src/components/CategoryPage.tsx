import { ServiceType } from "@prisma/client";
import { toast } from "react-toastify";
import Layout from "~/components/Layout";
import ServiceScroll from "~/components/ServiceScroll";
import { useFilteringContext } from "~/hooks/useFilteringContext";
import { api } from "~/utils/api";

type PageFormatProps = {
  category: ServiceType;
};

const CategoryPage = ({ category }: PageFormatProps) => {
  const { setSubcategories, clearAll } = useFilteringContext();

  const { error, data } = api.service.getAllSubcategoriesFromCategory.useQuery({
    category,
  });

  if (error ?? !data) {
    return (
      <Layout>
        <p className="w-full pt-52 text-center sm:pt-10">
          Intente de nuevo mas tarde
        </p>
      </Layout>
    );
  }

  setSubcategories(data?.filters ?? undefined);

  return (
    <Layout onClick={() => clearAll()}>
      <ServiceScroll category={category} />
    </Layout>
  );
};

export default CategoryPage;
