import React from "react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ItemDropdown from "./DropdownItem";

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
          <ItemDropdown route="/regalos" linkText="Regalos" intent="primary" />

          <ItemDropdown
            route="/catering"
            linkText="Catering"
            intent="primary"
          />

          <ItemDropdown
            route="/merchandising"
            linkText="Merchandising"
            intent="primary"
          />

          <ItemDropdown
            route="/eventos"
            linkText="Eventos"
            intent="secondary"
          />
        </Menu.Items>
      )}

      <Menu.Items>
        <ItemDropdown route="" linkText="" intent="primary">
          <div className="flex flex-row gap-x-[86px]">
            <div className="flex flex-col">
              <p className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-lg font-medium text-transparent">
                {session.data?.user.points}
              </p>

              <p className="text-black">Puntos</p>
            </div>

            <div className="flex items-end text-blue-300">
              <Link href="">Ver más</Link>
            </div>
          </div>
        </ItemDropdown>

        <ItemDropdown route="/" linkText="Cuenta" intent="primary" />

        <ItemDropdown route="/" linkText="Favoritos" intent="primary" />

        <ItemDropdown
          route="/"
          linkText="Pedidos y Consultas"
          intent="primary"
        />

        <ItemDropdown
          route="/"
          linkText="Campañas y métricas"
          intent="primary"
        />

        <ItemDropdown route="/" linkText="Ayuda" intent="tertiary" />

        <ItemDropdown action={logOut} route="" linkText="" intent="forth">
          <p>Cerrar Sesión</p>
        </ItemDropdown>
      </Menu.Items>
    </Menu.Items>
  );
};

export default DropdownUser;
