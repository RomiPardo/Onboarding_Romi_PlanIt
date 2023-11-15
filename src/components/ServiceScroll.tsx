import { useState } from "react";
import { api } from "~/utils/api";
import Service from "../components/Service";
import InfiniteScroll from "react-infinite-scroll-component";
import Shimmer from "./Shimmer";

type Service = {
  id: string;
  image?: string;
  name: string;
  calification: number;
  provider: string;
  price: number;
  category: string;
};

type ServiceScrollProps = {
  category: string;
};

const ServiceScroll = ({ category }: ServiceScrollProps) => {
  const servicesTest: Service[] = [
    {
      id: "1",
      image: undefined,
      name: "Item 1",
      calification: 50.0,
      provider: "Franca",
      price: 50.9,
      category: category,
    },
    {
      id: "2",
      image: "/userImage/example.png",
      name: "Item 2",
      calification: 80.0,
      provider: "Manga",
      price: 50.9,
      category: category,
    },
    {
      id: "3",
      image: undefined,
      name: "Item 3",
      calification: 50.0,
      provider: "Franca",
      price: 50.9,
      category: category,
    },
    {
      id: "4",
      image: "/userImage/example.png",
      name: "Item 4",
      calification: 80.0,
      provider: "Manga",
      price: 50.9,
      category: category,
    },
  ];

  const [services, setServices] = useState<Service[]>(servicesTest);
  const [page, setPage] = useState(1);

  const loadMoreServices = () => {
    //const nextPage = (page % 7) + 1;
    //const newServices = (await api.service.getServices(category, nextPage)) ?? [];
    //setServices((prevServices: Service[]) => [...prevServices, ...newServices]);
    setTimeout(() => {
      setServices((prevServices: Service[]) => [
        ...prevServices,
        ...servicesTest,
      ]);
    }, 1500);
    //setPage(nextPage);
  };

  return (
    <InfiniteScroll
      dataLength={services.length}
      next={loadMoreServices}
      hasMore={true}
      loader={<Shimmer />}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>No hay mas servicios disponibles</b>
        </p>
      }
    >
      <div className="grid-rows-auto mx-auto grid grid-cols-1 gap-5 xxxxs:grid-cols-2 xxxs:grid-cols-3 xxs:grid-cols-4 xs:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {services.map((service, index) => (
          <div key={index} className="flex w-full justify-center">
            <Service
              id={service.id}
              name={service.name}
              calification={service.calification}
              provider={service.provider}
              price={service.price}
              imageSrc={service.image}
            />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ServiceScroll;
