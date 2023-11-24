import { Skeleton } from "./ui/skeleton";

const ServiceInformationShimmer = () => (
  <main className="flex flex-row gap-x-5 bg-light-gray px-5 pb-32 pt-8 sm:px-32 sm:pb-28 sm:pt-24">
    <div className="flex w-3/5 flex-col">
      <Skeleton className="flex h-[400px] w-full pb-9" />
    </div>

    <div className="flex flex-grow flex-col justify-between">
      <div className="flex flex-row items-start justify-between">
        <Skeleton className="flex h-20 w-full pb-9" />
      </div>

      <div className="flex flex-col gap-y-5">
        <Skeleton className="flex h-48 w-full pb-9" />
      </div>

      <div className="rounded bg-white">
        <Skeleton className="flex h-9 w-full pb-9" />
      </div>
    </div>
  </main>
);
export default ServiceInformationShimmer;
