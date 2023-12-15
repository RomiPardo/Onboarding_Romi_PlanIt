import Image from "next/image";
import React from "react";
import { Additional, Provider, Service } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import FavoriteButton from "./FavoriteButton";

type ServiceFavorite = Service & {
  isFavorite: boolean;
  provider: Provider;
  additionals: Additional[];
};

const ServiceCard = ({ service }: { service: ServiceFavorite }) => {
  const { asPath } = useRouter();

  return (
    <div className="relative">
      <Link className="relative" href={`${asPath}/${service.id}`}>
        <div className="flex h-48 w-40 flex-col rounded-md bg-white sm:h-72 sm:w-56">
          <Image
            className="h-28 w-40 rounded-t-md sm:h-44 sm:w-56"
            src={service.image[0] ?? "/service/example.png"}
            width="0"
            height="0"
            sizes="100vw"
            alt="Imagen del servicio"
          />

          <div className="px-3 py-3 sm:py-4">
            <div className="flex items-start justify-between sm:pb-1">
              <p className="truncate text-xs font-normal leading-normal sm:text-lg sm:font-medium sm:leading-5">
                {service.name}
              </p>

              <div className="flex flex-row-reverse items-center gap-x-[2px] sm:flex-row sm:gap-x-1">
                <Image
                  src="/service/star.png"
                  width={11.742}
                  height={11.742}
                  alt="Estrella de calificación"
                />

                <p className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-xs font-normal leading-normal text-transparent sm:text-base sm:font-normal sm:leading-5">
                  {service.qualification}
                </p>
              </div>
            </div>

            <p className="pb-1 text-sm font-normal leading-normal text-[#7D7D7D] sm:pb-2 sm:text-lg sm:font-medium sm:leading-5">
              {service.provider.name}
            </p>

            <p className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-sm font-semibold leading-5 text-transparent sm:text-lg sm:font-medium">
              ${service.price}
              <span className="inline-block pl-1 text-xs font-normal leading-normal sm:hidden">
                cada una
              </span>
            </p>
          </div>
        </div>
      </Link>

      <div className="absolute right-0 top-0 pr-3 pt-3 hover:cursor-pointer sm:pt-5">
        <FavoriteButton
          isFavorite={service.isFavorite}
          serviceId={service.id}
          width={12}
          height={11}
        />
      </div>
    </div>
  );
};

export default ServiceCard;
