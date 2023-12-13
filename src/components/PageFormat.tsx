import { ServiceType } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";
import Layout from "~/components/Layout";
import ServiceScroll from "~/components/ServiceScroll";
import useFilteredServices from "~/hooks/useFilteredServices";
import { useSearchFilterContext } from "~/hooks/useSearchFilterContext";
import { api } from "~/utils/api";

type PageFormatProps = {
  category: ServiceType;
};

const PageFormat = ({ category }: PageFormatProps) => {
  const { searchFilter, setSearchFilter } =
    useSearchFilterContext("searchFilter");

  const [selectedAssetFilters, setSelectedAssetFilters] = useState<string[]>(
    [],
  );
  const [selectedOrder, setSelectedOrder] = useState<string>("");

  const { error: error1, data } = api.service.getAllAssetsFromCategory.useQuery(
    {
      category,
    },
  );

  const {
    services,
    error: error2,
    fetchNextPage,
    hasNextPage,
    moreThan,
  } = useFilteredServices(
    category,
    selectedOrder,
    selectedAssetFilters,
    searchFilter ?? "",
  );

  if (error1 ?? error2) {
    toast.error("Sucedio un error inesperado al obtener los servicios");
    return (
      <Layout>
        <></>
      </Layout>
    );
  }

  return (
    <Layout
      onClick={() => setSearchFilter(undefined)}
      assetFilteringInfo={{
        selectedAssetFilters,
        setSelectedAssetFilters,
        selectedOrder,
        setSelectedOrder,
        assets: data?.filters ?? [],
      }}
    >
      <ServiceScroll
        category={category}
        assetFilteringInfo={{
          selectedAssetFilters,
          setSelectedAssetFilters,
          selectedOrder,
          setSelectedOrder,
          assets: data?.filters ?? [],
        }}
        scrollData={{ services, moreThan, hasNextPage, fetchNextPage }}
      />
    </Layout>
  );
};

export default PageFormat;
