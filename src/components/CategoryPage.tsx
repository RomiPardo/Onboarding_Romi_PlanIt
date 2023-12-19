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

  if (error) {
    toast.error("Sucedio un error inesperado al obtener los servicios");
    return (
      <Layout>
        <></>
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
