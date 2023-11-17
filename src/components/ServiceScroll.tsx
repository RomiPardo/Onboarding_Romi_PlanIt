import { useState } from "react";
import { api } from "~/utils/api";
import Service from "../components/Service";
import InfiniteScroll from "react-infinite-scroll-component";
import Shimmer from "./Shimmer";
import Toast from "./Toast";
import { toast } from "react-toastify";
import { Spinner } from "./Spinner";

enum ServiceType {
  PRESENT = "PRESENT",
  CATERING = "CATERING",
  MERCHANDISING = "MERCHANDISING",
  EVENT = "EVENT",
}

type Service = {
  id: string;
  image?: string;
  name: string;
  description: string;
  qualification: number;
  provider: string;
  price: number;
  type: ServiceType;
  providerId: string;
};

type ServiceScrollProps = {
  category: "PRESENT" | "CATERING" | "MERCHANDISING" | "EVENT";
};

const ServiceScroll = ({ category }: ServiceScrollProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [myCursor, setMyCursor] = useState("0");
  const [hasMore, setHasMore] = useState(true);
  const length = api.service.getLengthFiltered.useQuery({ category }).data;

  const getServicesMutation = api.service.getFilteredServices.useMutation({
    onError(error) {
      toast.error("Sucedio un error inesperado al obtener los servicios");
    },
    onSuccess(data) {
      if (data) {
        setMyCursor(data.cursor ?? myCursor);

        const newServices = data.services as Service[];

        if (newServices.length === 0) {
          setHasMore(false);
        } else {
          setTimeout(() => {
            setServices((prevServices: Service[]) => [
              ...prevServices,
              ...newServices,
            ]);
          }, 1500);
        }
      }
    },
  });

  const loadMoreServices = () => {
    getServicesMutation.mutate({
      category,
      myCursor,
    });
  };

  return (
    <>
      <Toast />

      <p className="flex items-center justify-center pb-12 pt-8 text-sm font-normal leading-normal text-[#7D7D7D] sm:hidden">
        {length} resultados
      </p>

      <InfiniteScroll
        dataLength={services.length}
        next={loadMoreServices}
        hasMore={hasMore}
        loader={services.length === 0 ? <Shimmer /> : <Spinner />}
      >
        <div className="grid-rows-auto mx-auto grid grid-cols-1 gap-5 xxxxs:grid-cols-2 xxxs:grid-cols-3 xxs:grid-cols-4 xs:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {services.map((service, index) => (
            <div key={index} className="flex w-full justify-center">
              {service.image ? (
                <Service
                  id={service.id}
                  name={service.name}
                  calification={service.qualification}
                  idProvider={service.providerId}
                  price={service.price}
                  imageSrc={service.image}
                />
              ) : (
                <Service
                  id={service.id}
                  name={service.name}
                  calification={service.qualification}
                  idProvider={service.providerId}
                  price={service.price}
                />
              )}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default ServiceScroll;
