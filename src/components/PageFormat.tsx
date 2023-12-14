import { ServiceType } from "@prisma/client";
import { toast } from "react-toastify";
import Layout from "~/components/Layout";
import ServiceScroll from "~/components/ServiceScroll";
import { useFilteringContext } from "~/hooks/useFilteringContext";
import { api } from "~/utils/api";

type PageFormatProps = {
  category: ServiceType;
};

const PageFormat = ({ category }: PageFormatProps) => {
  const { setAssets, clearAll } = useFilteringContext();

  const { error, data } = api.service.getAllAssetsFromCategory.useQuery({
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

  setAssets(data?.filters ?? undefined);

  return (
    <Layout onClick={() => clearAll()}>
      <ServiceScroll category={category} />
    </Layout>
  );
};

export default PageFormat;
