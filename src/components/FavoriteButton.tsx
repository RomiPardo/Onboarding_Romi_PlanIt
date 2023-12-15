import { toast } from "react-toastify";
import { RouterOutput } from "~/types/common";
import { api } from "~/utils/api";
import Image from "next/image";
import Toast from "./Toast";

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

  const favourtiteMutation = api.service.changeFavoriteBy.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    async onSuccess() {
      await utils.service.getById.invalidate({ id: serviceId });
      await utils.service.getFilteredServices.invalidate();
    },
  });

  const changeFavoriteService = () => {
    favourtiteMutation.mutate({
      isFavorite: !isFavorite,
      id: serviceId,
    });
  };

  return (
    <div className="flex items-end">
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
