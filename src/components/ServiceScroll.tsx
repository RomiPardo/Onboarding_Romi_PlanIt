import ServiceCard from "../components/ServiceCard";
import InfiniteScroll from "react-infinite-scroll-component";
import ShimmerServiceScroll from "./ShimmerServiceScroll";
import Toast from "./Toast";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import useFilteredServices from "~/hooks/useFilteredServices";
import { Provider, ServiceType } from "@prisma/client";
import Categories from "./Categories";
import { useState } from "react";
import { api } from "~/utils/api";

type ServiceScrollProps = {
  category: ServiceType;
  searchFilter: string;
};

const ServiceScroll = ({ category, searchFilter }: ServiceScrollProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>("");

  const {
    services,
    error: error1,
    fetchNextPage,
    hasNextPage,
    moreThan,
  } = useFilteredServices(
    category,
    selectedOrder,
    selectedFilters,
    searchFilter ?? "",
  );

  const { error: error2, data } = api.service.getAllAssetsFromCategory.useQuery(
    {
      category,
    },
  );

  if (error1 ?? error2) {
    toast.error("Sucedio un error inesperado al obtener los servicios");
  }

  return (
    <main className="bg-light-gray px-5 pb-32 pt-8 font-poppins sm:px-32 sm:pb-28 sm:pt-24">
      <Categories
        category={category}
        moreThan={moreThan}
        subFilters={data?.filters ?? []}
        selectedFilters={selectedFilters}
        changeFilters={setSelectedFilters}
        selectedOrder={selectedOrder}
        changeOrder={setSelectedOrder}
      />

      <InfiniteScroll
        dataLength={services.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={services.length === 0 ? <ShimmerServiceScroll /> : <Spinner />}
        className="!overflow-visible"
      >
        <div className="grid-rows-auto mx-auto grid grid-cols-1 gap-5 xxxxs:grid-cols-2 xxxs:grid-cols-3 xxs:grid-cols-4 xs:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {services.map((service, index) => (
            <div key={index} className="flex w-full justify-center">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </main>
  );
};

export default ServiceScroll;
