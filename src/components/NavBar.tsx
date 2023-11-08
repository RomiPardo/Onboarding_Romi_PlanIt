import Link from "next/link";
import SearchBar from "./SearchBar";
import UserAccount from "./UserAccount";
import { Dropdown, DropdownTrigger } from "@nextui-org/react";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useRouter } from "next/router";

const routes = [
  { path: "/regalos", label: "Regalos" },
  { path: "/catering", label: "Catering" },
  { path: "/merchandising", label: "Merchandising" },
  { path: "/eventos", label: "Eventos" },
];

const NavBar = () => {
  const { asPath } = useRouter();

  return (
    <nav className="flex flex-col gap-y-4 bg-white px-5 py-14 shadow-md sm:px-28 sm:py-8 sm:shadow-none">
      <div className="hidden items-center justify-center sm:flex">
        <ul className="flex list-none flex-row gap-x-9 bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-lg font-medium leading-5 text-transparent">
          {routes.map((route) => (
            <li className="flex flex-col gap-y-2" key={route.path}>
              <Link href={route.path}>{route.label}</Link>

              {asPath === route.path && (
                <hr
                  className={
                    "h-[3px] bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-content"
                  }
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-y-7 sm:flex-row sm:items-end sm:gap-0">
        <div className="flex flex-row justify-between sm:block">
          <Image
            className="w-24 hover:cursor-pointer"
            src="/navbar/logoSecondaryDark.png"
            alt="Planit Logo"
          />

          <Dropdown>
            <DropdownTrigger>
              <Image
                alt="menu option"
                src="/navbar/menu.png"
                className="w-10 hover:cursor-pointer sm:hidden"
              />
            </DropdownTrigger>

            <DropdownUser mobile={true} />
          </Dropdown>
        </div>

        <SearchBar />

        <div className="hidden items-center gap-x-3 pb-2 sm:flex">
          <Image
            src="/navbar/bell.png"
            alt="campana de notificaciones"
            className="h-5 w-5  hover:cursor-pointer"
          />

          <UserAccount />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
