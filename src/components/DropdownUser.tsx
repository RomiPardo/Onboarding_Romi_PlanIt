import React from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ItemDropdown from "./DropdownItem";
import { routesMenu, routesUser } from "./routes";

type DropdownUserProps = {
  mobile?: boolean;
};

const DropdownUser = ({ mobile = false }: DropdownUserProps) => {
  const session = useSession();

  const logOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Menu.Items className="fixed right-0 mr-6 w-56 rounded-md bg-white p-5 shadow-xs">
      {mobile && (
        <Menu.Items>
          {routesMenu.map((route) => (
            <ItemDropdown
              key={route.path}
              route={route.path}
              linkText={route.label}
              intent={route.path !== "/eventos" ? "primary" : "secondary"}
            />
          ))}
        </Menu.Items>
      )}

      <Menu.Items>
        {routesUser.map((route) =>
          route.path === "/informacion" ? (
            <ItemDropdown
              key={route.path}
              route=""
              linkText=""
              intent="primary"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <p className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-lg font-medium text-transparent">
                    {session.data?.user.points}
                  </p>

                  <p className="text-base font-light leading-5 text-black">
                    Puntos
                  </p>
                </div>

                <div className="flex items-end text-blue-300">
                  <Link href="/informacion">Ver más</Link>
                </div>
              </div>
            </ItemDropdown>
          ) : route.path === "/logOut" ? (
            <ItemDropdown
              key={route.path}
              action={logOut}
              route=""
              linkText=""
              intent="forth"
            >
              <p>Cerrar Sesión</p>
            </ItemDropdown>
          ) : (
            <ItemDropdown
              key={route.path}
              route={route.path}
              linkText={route.label}
              intent={route.path !== "/ayuda" ? "primary" : "tertiary"}
            />
          ),
        )}
      </Menu.Items>
    </Menu.Items>
  );
};

export default DropdownUser;
