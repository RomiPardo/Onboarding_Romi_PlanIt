import { Skeleton } from "./ui/skeleton";

const ShimmerServiceScroll = () => (
  <div className="grid-rows-auto grid grid-cols-1 gap-5 pt-5 xxxxs:grid-cols-2 xxxs:grid-cols-3 xxs:grid-cols-4 xs:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    <div className="hidden w-full justify-center xxxs:flex sm:hidden lg:flex">
      <Skeleton className="h-48 w-40 rounded-md sm:h-72 sm:w-56" />
    </div>

    <div className="hidden w-full justify-center xxs:flex sm:hidden md:flex">
      <Skeleton className="h-48 w-40 rounded-md sm:h-72 sm:w-56" />
    </div>

    <div className="hidden w-full justify-center xs:flex">
      <Skeleton className="h-48 w-40 rounded-md sm:h-72 sm:w-56" />
    </div>

    <div className="hidden w-full justify-center xxxxs:flex">
      <Skeleton className="h-48 w-40 rounded-md sm:h-72 sm:w-56" />
    </div>

    <div className="flex w-full justify-center">
      <Skeleton className="h-48 w-40 rounded-md sm:h-72 sm:w-56" />
    </div>
  </div>
);

export default ShimmerServiceScroll;
