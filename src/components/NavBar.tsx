import Link from "next/link";
import SearchBar from "./SearchBar";
import UserAccount from "./UserAccount";
import { Menu } from "@headlessui/react";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { useRouter } from "next/router";
import { routesMenu } from "./listsOfValues";
import { useState } from "react";

type NavBarProps = {
  onClick?: (() => Promise<void>) | (() => void);
  assetFilteringInfo?: {
    selectedAssetFilters: string[];
    setSelectedAssetFilters: (assetsSelected: string[]) => void;
    selectedOrder: string;
    setSelectedOrder: (newOrderBy: string) => void;
    assets: string[];
  };
};

const NavBar = ({ onClick, assetFilteringInfo }: NavBarProps) => {
  const { asPath } = useRouter();

  return (
    <nav className="fixed z-10 flex w-full flex-col gap-y-5 rounded-b-md bg-white px-5 pb-5 pt-14 shadow-md sm:rounded-none sm:px-28 sm:py-8 sm:shadow-none">
      <div className=" flex flex-row justify-between sm:grid sm:grid-cols-[1fr_1fr_1fr] sm:grid-rows-2 sm:items-center">
        <div className="col-start-1 row-start-2 flex items-center">
          <Image
            className="justify-start hover:cursor-pointer"
            src="/navbar/logoSecondaryDark.png"
            alt="Planit Logo"
            width={96}
            height={33.47}
          />
        </div>

        <div className="col-start-2 row-start-1 hidden justify-center gap-x-10 pb-4 sm:flex">
          {routesMenu.map((route) => (
            <div
              key={route.path}
              className="flex flex-col text-lg font-medium leading-5"
            >
              <Link
                href={route.path}
                className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent"
                onClick={onClick}
              >
                {route.label}
              </Link>

              {asPath.includes(route.path) && (
                <hr
                  className={
                    "h-[2px] bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-content text-transparent"
                  }
                />
              )}
            </div>
          ))}
        </div>

        {assetFilteringInfo && (
          <div className="col-start-2 row-start-2 hidden justify-center sm:flex">
            <SearchBar {...assetFilteringInfo} />
          </div>
        )}

        <div className="col-start-3 row-start-2">
          <div className="hidden items-center justify-end gap-x-5 sm:flex">
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

      {assetFilteringInfo && (
        <div className="flex sm:hidden">
          <SearchBar {...assetFilteringInfo} />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
