import { ServiceType } from "@prisma/client";
import { api } from "~/utils/api";

const useFilteredServices = (
  category: ServiceType,
  order: string,
  filters: string[],
  searchFilter: string,
) => {
  const { data, error, fetchNextPage, hasNextPage } =
    api.service.getFilteredServices.useInfiniteQuery(
      { category, order, filters, searchFilter },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const services = data?.pages.flatMap((page) => page.data) ?? [];
  const moreThan = services.length > 0 ? services.length - 1 : 0;

  return { services, error, fetchNextPage, hasNextPage, moreThan };
};

export default useFilteredServices;
