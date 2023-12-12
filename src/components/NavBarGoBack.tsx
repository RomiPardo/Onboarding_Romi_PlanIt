import { RouterOutput } from "~/types/common";
import { useRouter } from "next/router";
import FavoriteButton from "./FavoriteButton";

type GoBackHeaderProps = {
  service?: NonNullable<RouterOutput["service"]["getById"]>;
  color?: string;
  onBack?: () => void;
  absolute?: boolean;
};

const NavBarGoBack = ({
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="7"
          height="11"
          viewBox="0 0 7 11"
          fill="none"
        >
          <path d="M6 0.5L1 5.5L6 10.5" stroke={color} strokeLinecap="round" />
        </svg>
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

export default NavBarGoBack;
