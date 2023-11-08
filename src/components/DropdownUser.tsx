import React from "react";
import { DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import DropDownItem from "./DropdownItem";

type DropdownUserProps = {
  mobile?: boolean;
};

const DropdownUser = ({ mobile = false }: DropdownUserProps) => {
  const session = useSession();

  const logOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <DropdownMenu
      className="w-56 rounded-md bg-white p-5 text-sm font-light leading-5 text-black shadow-xs"
      itemClasses={{
        base: [
          "mb-2",
          "data-[hover=true]:text-blue-300",
          "data-[selectable=true]:focus:text-blue-300",
          "data-[pressed=true]:text-blue-300",
          "data-[focus-visible=true]:ring-none",
        ],
      }}
    >
      {mobile ? (
        <DropdownSection>
          <DropDownItem
            route="/regalos"
            linkText="Regalos"
            intent={"primary"}
          />

          <DropDownItem
            route="/catering"
            linkText="Catering"
            intent={"primary"}
          />

          <DropDownItem
            route="/merchandising"
            linkText="Merchandising"
            intent={"primary"}
          />

          <DropDownItem
            route="/eventos"
            linkText="Eventos"
            intent={"secondary"}
          />
        </DropdownSection>
      ) : (
        <></>
      )}

      <DropdownSection>
        <DropDownItem route="" linkText="" intent={"primary"}>
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
        </DropDownItem>

        <DropDownItem route="/" linkText="Cuenta" intent={"primary"} />

        <DropDownItem route="/" linkText="Favoritos" intent={"primary"} />

        <DropDownItem
          route="/"
          linkText="Pedidos y Consultas"
          intent={"primary"}
        />

        <DropDownItem
          route="/"
          linkText="Campañas y métricas"
          intent={"primary"}
        />

        <DropDownItem route="/" linkText="Ayuda" intent={"tertiary"} />

        <DropDownItem action={logOut} route="" linkText="">
          Cerrar Sesión
        </DropDownItem>
      </DropdownSection>
    </DropdownMenu>
  );
};

export default DropdownUser;
