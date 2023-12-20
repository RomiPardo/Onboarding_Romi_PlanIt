import { toast } from "react-toastify";
import { api } from "~/utils/api";
import Image from "next/image";
import { TRPCClientError } from "@trpc/client";

type FavoriteButtonProps = {
  serviceId: string;
  isFavorite: boolean;
  width: number;
  height: number;
  linkFalse?: string;
};

const FavoriteButton = ({
  serviceId,
  isFavorite,
  width,
  height,
  linkFalse = "/service/favoriteIconFalse.png",
}: FavoriteButtonProps) => {
  const utils = api.useUtils();

  const favoriteMutation = api.service.changeFavoriteBy.useMutation();

  const changeFavoriteService = async () => {
    try {
      await favoriteMutation.mutateAsync({
        isFavorite: !isFavorite,
        id: serviceId,
      });

      await utils.service.getById.invalidate({ id: serviceId });
      await utils.service.getFilteredServices.invalidate();
    } catch (error) {
      error instanceof TRPCClientError
        ? toast.error(error?.message)
        : toast.error("Sucedió un error inesperado");
    }
  };

  return (
    <div className="flex items-end hover:cursor-pointer">
      {isFavorite ? (
        <Image
          src="/service/favoriteIconTrue.png"
          width={width}
          height={height}
          alt="Icono de favorito seleccionado"
          onClick={changeFavoriteService}
        />
      ) : (
        <Image
          src={linkFalse}
          width={width}
          height={height}
          alt="Icono de favorito no seleccionado"
          onClick={changeFavoriteService}
        />
      )}
    </div>
  );
};

export default FavoriteButton;
