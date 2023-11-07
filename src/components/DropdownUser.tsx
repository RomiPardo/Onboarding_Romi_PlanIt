import React from "react";
import { DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const DropdownUser = ({ version }: { version: string }) => {
  const session = useSession();

  const logOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  switch (version) {
    case "main":
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
          <DropdownSection>
            <DropdownItem className="border-b border-black pb-2">
              <Link href="/regalos">Regalos</Link>
            </DropdownItem>

            <DropdownItem className="border-b border-black pb-2">
              <Link href="/catering">Catering</Link>
            </DropdownItem>

            <DropdownItem className="border-b border-black pb-2">
              <Link href="/merchandising">Merchandising</Link>
            </DropdownItem>

            <DropdownItem className="border-b-[1.5px] border-black pb-4">
              <Link href="/eventos">Eventos</Link>
            </DropdownItem>
          </DropdownSection>

          <DropdownSection>
            <DropdownItem className="border-b border-black pb-2">
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
            </DropdownItem>

            <DropdownItem className="border-b border-black pb-2">
              <Link href="/cuenta">Cuenta</Link>
            </DropdownItem>

            <DropdownItem className="border-b border-black pb-2">
              <Link href="">Favoritos</Link>
            </DropdownItem>

            <DropdownItem className="border-b border-black pb-2">
              <Link href="">Pedidos y Consultas</Link>
            </DropdownItem>

            <DropdownItem className="border-b border-black pb-2">
              <Link href="">Campañas y métricas</Link>
            </DropdownItem>

            <DropdownItem className="border-b border-black pb-2 text-gray">
              <Link href="">Ayuda</Link>
            </DropdownItem>

            <DropdownItem className="pb-2 text-gray" onClick={logOut}>
              Cerrar Sesión
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      );

    case "user":
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
          <DropdownItem className="border-b border-black pb-2">
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
          </DropdownItem>

          <DropdownItem className="border-b border-black pb-2">
            <Link href="/cuenta">Cuenta</Link>
          </DropdownItem>

          <DropdownItem className="border-b border-black pb-2">
            <Link href="">Favoritos</Link>
          </DropdownItem>

          <DropdownItem className="border-b border-black pb-2">
            <Link href="">Pedidos y Consultas</Link>
          </DropdownItem>

          <DropdownItem className="border-b border-black pb-2">
            <Link href="">Campañas y métricas</Link>
          </DropdownItem>

          <DropdownItem className="border-b border-black pb-2 text-gray">
            <Link href="">Ayuda</Link>
          </DropdownItem>

          <DropdownItem className="pb-2 text-gray" onClick={logOut}>
            Cerrar Sesión
          </DropdownItem>
        </DropdownMenu>
      );
  }
};

export default DropdownUser;
