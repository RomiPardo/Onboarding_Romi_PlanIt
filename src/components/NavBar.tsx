import Link from "next/link";
import SearchBar from "./SearchBar";
import UserAccount from "./UserAccount";
import { Menu } from "@headlessui/react";
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
    <nav className="flex flex-col gap-y-5 rounded-b-md bg-white px-5 pb-5 pt-14 shadow-md sm:rounded-none sm:px-28 sm:py-8 sm:shadow-none">
      <div className="sm:grid-row flex flex-row justify-between sm:grid sm:grid-cols-4 sm:items-end">
        <div className="flex h-[44px] items-center">
          <Image
            className="justify-start hover:cursor-pointer"
            src="/navbar/logoSecondaryDark.png"
            alt="Planit Logo"
            width={96}
            height={33.47}
          />
        </div>

        <div className="hidden flex-col gap-y-4 sm:col-span-2 sm:col-start-2 sm:flex">
          <div className="flex justify-around">
            {routes.map((route) => (
              <div
                key={route.path}
                className="flex flex-col text-lg font-medium leading-5"
              >
                <Link
                  href={route.path}
                  className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent"
                >
                  {route.label}
                </Link>

                {asPath === route.path && (
                  <hr
                    className={
                      "h-[2px] bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-content  text-transparent"
                    }
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex h-[44px] items-center">
            <SearchBar />
          </div>
        </div>

        <div>
          <div className="hidden items-center justify-end gap-x-7 sm:flex">
            <Image
              src="/navbar/bell.png"
              alt="campana de notificaciones"
              className="hover:cursor-pointer"
              width={20}
              height={20}
            />

            <UserAccount />
          </div>

          <div className="flex justify-end sm:hidden">
            <Menu as="div">
              <Menu.Button>
                <Image
                  alt="menu option"
                  src="/navbar/menu.png"
                  className="hover:cursor-pointer sm:hidden"
                  width={42}
                  height={33.47}
                />
              </Menu.Button>

              <DropdownUser mobile={true} />
            </Menu>
          </div>
        </div>
      </div>

      <div className="flex sm:hidden">
        <SearchBar />
      </div>
    </nav>
  );
};

export default NavBar;
