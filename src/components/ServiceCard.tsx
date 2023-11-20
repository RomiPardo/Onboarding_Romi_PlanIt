import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { api } from "~/utils/api";

type ServiceProps = {
  imageSrc?: string;
  favourite?: boolean;
  id: string;
  name: string;
  calification: number;
  provider: string;
  price: number;
};

const Service = ({
  id,
  imageSrc = "/service/example.png",
  favourite = false,
  name,
  calification,
  provider,
  price,
}: ServiceProps) => {
  const [isFavorite, setIsFavorite] = React.useState(favourite);
  const session = useSession();

  const changeFavoriteService = () => {
    // Call service to add service to favorite

    setIsFavorite(!isFavorite);
  };

  return (
    <div className="flex h-48 w-40 flex-col rounded-md bg-white sm:h-72 sm:w-56">
      <div className="relative">
        <Image
          className="relative h-28 w-40 rounded-t-md sm:h-44 sm:w-56"
          src={imageSrc}
          width="0"
          height="0"
          sizes="100vw"
          alt="Imagen del servicio"
        />

        <div className="absolute right-0 top-0 pr-3 pt-3 hover:cursor-pointer sm:pt-5">
          {isFavorite ? (
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
        <div className="flex justify-between sm:pb-1">
          <p className="text-xs font-normal leading-normal sm:text-lg sm:font-medium sm:leading-5">
            {name}
          </p>

          <div className="flex flex-row-reverse items-center gap-x-[2px] sm:flex-row sm:gap-x-1">
            <Image
              src="/service/star.png"
              width={11.742}
              height={11.742}
              alt="Estrella de calificación"
            />

            <p className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-xs font-normal leading-normal text-transparent sm:text-base sm:font-normal sm:leading-5">
              {calification}
            </p>
          </div>
        </div>

        <p className="pb-1 text-sm font-normal leading-normal text-[#7D7D7D] sm:pb-3 sm:text-lg sm:font-medium sm:leading-5">
          {provider}
        </p>

        <p className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-sm font-semibold leading-5 text-transparent sm:text-lg sm:font-medium">
          ${price}
          <span className="inline-block pl-1 text-xs font-normal leading-normal sm:hidden">
            cada una
          </span>
        </p>
      </div>
    </div>
  );
};

export default Service;
