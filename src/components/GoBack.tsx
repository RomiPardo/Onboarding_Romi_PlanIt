import { RouterOutput } from "~/types/common";
import { useRouter } from "next/router";
import FavoriteButton from "./FavoriteButton";
import ArrowToLeft from "./ArrowToLeft";

type GoBackHeaderProps = {
  service?: NonNullable<RouterOutput["service"]["getById"]>;
  color?: string;
  onBack?: () => void;
  absolute?: boolean;
};

const GoBack = ({
  service,
  color = "black",
  onBack,
  absolute = true,
}: GoBackHeaderProps) => {
  const router = useRouter();

  return (
    <nav
      className={
        absolute
          ? "absolute flex w-full flex-row items-center justify-between gap-x-5 px-5 pt-8 text-sm font-normal leading-normal sm:hidden"
          : "flex w-full flex-row items-center justify-between gap-x-5 px-5 py-8 pt-8 text-sm font-normal leading-normal sm:hidden"
      }
    >
      <div
        onClick={() => {
          if (onBack) {
            onBack();
          } else {
            router.back();
          }
        }}
        className="hover:cursor-pointer"
      >
        <ArrowToLeft color={color} />
      </div>

      <p
        className={`text-${color} flex flex-grow hover:cursor-pointer`}
        onClick={() => {
          if (onBack) {
            onBack();
          } else {
            router.back();
          }
        }}
      >
        Volver
      </p>

      {service && (
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
