import Link from "next/link";
import SearchBar from "./SearchBar";
import UserAccount from "./UserAccount";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <nav className="flex flex-col gap-y-4 bg-white px-5 py-14 shadow-md sm:px-28 sm:py-8 sm:shadow-none">
      <div className="hidden items-center justify-center sm:flex">
        <ul className="flex list-none flex-row gap-x-9 bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-lg font-medium leading-5 text-transparent">
          <li className="flex flex-col gap-y-2">
            <Link href="/">Regalos</Link>

            <hr
              className={
                router.asPath === "/"
                  ? "h-[3px] bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-content"
                  : "hidden"
              }
            />
          </li>

          <li className="flex flex-col gap-y-2">
            <Link href="/catering">Catering</Link>

            <hr
              className={
                router.asPath === "/catering"
                  ? "h-[3px] bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-content"
                  : "hidden"
              }
            />
          </li>

          <li className="flex flex-col gap-y-2">
            <Link href="/merchandising">Merchandising</Link>

            <hr
              className={
                router.asPath === "/merchandising"
                  ? "h-[3px] bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-content"
                  : "hidden"
              }
            />
          </li>

          <li className="flex flex-col gap-y-2">
            <Link href="/eventos">Eventos</Link>

            <hr
              className={
                router.asPath === "/eventos"
                  ? "h-[3px] bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-content"
                  : "hidden"
              }
            />
          </li>
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-y-7 sm:flex-row sm:items-end sm:gap-0">
        <div className="flex flex-row justify-between sm:block">
          <img
            className="w-24"
            src="/navbar/logoSecondaryDark.png"
            alt="Planit Logo"
          />

          <img
            rel="menu option"
            src="/navbar/menu.png"
            className="w-10 sm:hidden"
          />
        </div>

        <SearchBar />

        <div className="hidden flex-row items-center justify-between gap-x-5 sm:flex">
          <img
            src="/navbar/bell.png"
            alt="campana de notificaciones"
            className="h-5 w-5"
          />

          <UserAccount />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
