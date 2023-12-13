import ServiceCard from "../components/ServiceCard";
import InfiniteScroll from "react-infinite-scroll-component";
import ShimmerServiceScroll from "./ShimmerServiceScroll";
import Spinner from "./Spinner";
import { Aditional, Service, Provider, ServiceType } from "@prisma/client";
import Categories from "./Categories";
import { Dispatch, SetStateAction } from "react";

type ServiceComplete = Service & {
  isFavorite: boolean;
  provider: Provider;
  aditionals: Aditional[];
};

type ServiceScrollProps<T> = {
  category: ServiceType;
  assetFilteringInfo: {
    selectedAssetFilters: string[];
    setSelectedAssetFilters: Dispatch<SetStateAction<string[]>>;
    selectedOrder: string;
    setSelectedOrder: Dispatch<SetStateAction<string>>;
    assets: string[];
  };
  scrollData: {
    services: ServiceComplete[];
    moreThan: number;
    fetchNextPage: () => T;
    hasNextPage: boolean | undefined;
  };
};

const ServiceScroll = <T,>({
  category,
  assetFilteringInfo: {
    assets,
    selectedAssetFilters,
    setSelectedAssetFilters,
    selectedOrder,
    setSelectedOrder,
  },
  scrollData: { services, moreThan, hasNextPage, fetchNextPage },
}: ServiceScrollProps<T>) => (
  <main className="bg-light-gray px-5 pb-32 pt-8 font-poppins sm:px-32 sm:pb-28 sm:pt-24">
    <Categories
      category={category}
      moreThan={moreThan}
      assetFilteringInfo={{
        assets,
        selectedAssetFilters,
        setSelectedAssetFilters,
        selectedOrder,
        setSelectedOrder,
      }}
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

export default ServiceScroll;
