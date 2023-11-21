import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";
import Toast from "./Toast";
import { Provider, Service } from "@prisma/client";

type ServiceFavorite = Service & {
  isFavorite: boolean;
  provider: Provider;
};

const ServiceCard = ({ service }: { service: ServiceFavorite }) => {
  const utils = api.useUtils();

  const favourtiteMutation = api.service.changeFavoriteBy.useMutation({
    onError() {
      toast.error("Hubo problemas al identificar el usuario o el servicio");
    },
    async onSuccess() {
      await utils.service.getFilteredServices.invalidate();
      //service.isFavorite = !service.isFavorite;
    },
  });

  const changeFavoriteService = () => {
    favourtiteMutation.mutate({
      isFavorite: !service.isFavorite,
      id: service.id,
    });
  };

  return (
    <>
      <Toast />

      <div className="flex h-48 w-40 flex-col rounded-md bg-white sm:h-72 sm:w-56">
        <div className="relative">
          <Image
            className="relative h-28 w-40 rounded-t-md sm:h-44 sm:w-56"
            src={service.image ?? "/service/example.png"}
            width="0"
            height="0"
            sizes="100vw"
            alt="Imagen del servicio"
          />

          <div className="absolute right-0 top-0 pr-3 pt-3 hover:cursor-pointer sm:pt-5">
            {service.isFavorite ? (
              <Image
                src="/service/favoriteIconTrue.png"
                width={13}
                height={11}
                alt="Icono de favorito seleccionado"
                onClick={changeFavoriteService}
              />
            ) : (
              <Image
                src="/service/favoriteIconFalse.png"
                width={13}
                height={11}
                alt="Icono de favorito no seleccionado"
                onClick={changeFavoriteService}
              />
            )}
          </div>
        </div>

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
    </>
  );
};

export default ServiceCard;
