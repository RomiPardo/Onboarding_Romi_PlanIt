import { RouterOutput } from "~/types/common";
import Toast from "./Toast";
import { useRouter } from "next/router";
import FavoriteButton from "./FavoriteButton";
import ArrowToLeft from "./ArrowToLeft";

type GoBackHeaderProps = {
  favoriteIcon?: boolean;
  service: NonNullable<RouterOutput["service"]["getById"]>;
  color?: string;
};

const GoBack = ({
  favoriteIcon = false,
  service,
  color = "black",
}: GoBackHeaderProps) => {
  const router = useRouter();

  return (
    <nav className="absolute flex w-full flex-row items-center justify-between gap-x-5 px-5 pt-8 text-sm font-normal leading-normal sm:hidden">
      <div onClick={() => router.back()} className="hover:cursor-pointer">
        <ArrowToLeft color={color}/>
      </div>

      <p
        className={`text-${color} flex flex-grow hover:cursor-pointer`}
        onClick={() => router.back()}
      >
        Volver
      </p>

      {favoriteIcon && (
        <FavoriteButton
          serviceId={service.id}
          isFavorite={service.isFavorite}
          width={17}
          height={14}
        />
      )}
    </nav>
  );
};

export default GoBack;
