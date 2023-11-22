import { Aditional, Service } from "@prisma/client";
import React, { useState } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import { toast } from "react-toastify";
import AditionalCard from "./AditionalCard";
import Button from "./Button";
import Toast from "./Toast";
import { RouterOutput } from "~/types/common";

type ServerInformationProps = {
  service: NonNullable<RouterOutput["service"]["getById"]>;
};

const ServiceInformation = ({ service }: ServerInformationProps) => {
  const [amount, setAmount] = useState(1);
  const [totalAditionals, setTotalAditionals] = useState(0);
  const utils = api.useUtils();

  const matchLineBreak = /\u000A|\u000D|\u000D\u000A/;

  const favourtiteMutation = api.service.changeFavoriteBy.useMutation({
    onError() {
      toast.error("Hubo problemas al identificar el usuario o el servicio");
    },
    async onSuccess() {
      await utils.service.getById.invalidate();
    },
  });

  const changeFavoriteService = () => {
    favourtiteMutation.mutate({
      isFavorite: !service.isFavorite,
      id: service.id,
    });
  };

  const changeTotalAditional = (price: number) =>
    setTotalAditionals(totalAditionals + price);

  return (
    <>
      <Toast />

      <main className="flex flex-row gap-x-5 bg-light-gray px-5 pb-32 pt-8 font-poppins sm:px-32 sm:pb-28 sm:pt-24">
        <div className=" flex w-3/5 flex-col">
          <div className="flex w-full pb-9">
            <Image
              className="h-[400px] w-full rounded-md object-cover"
              src={
                service.image === ""
                  ? "/service/example.png"
                  : service.image ?? "/service/example.png"
              }
              width="0"
              height="0"
              sizes="100%"
              alt="Imagen del servicio"
            />
          </div>

          <div className="flex flex-col gap-y-11">
            <h5 className="text-3xl font-medium leading-8">Descripción</h5>

            <div className="flex flex-col gap-y-4">
              {service.description.split(matchLineBreak).map((item, index) => (
                <p className="text-lg font-normal leading-5" key={index}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-grow flex-col gap-y-14">
          <div className="flex flex-row items-start justify-between">
            <div className="flex flex-col gap-y-6">
              <div>
                <h5 className="text-3xl font-medium leading-8">
                  {service.provider.name}
                </h5>

                <h4 className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-4xl font-medium leading-9 text-transparent">
                  {service.name}
                </h4>
              </div>

              <div className="flex flex-row items-center gap-x-2">
                <Image
                  src="/service/star.png"
                  width={17}
                  height={16}
                  alt="Estrella de calificación"
                />

                <p className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-base font-normal leading-4 text-transparent">
                  {service.qualification}
                </p>
              </div>

              <div className="flex h-7 w-24 flex-row items-center rounded border border-gray">
                <button
                  className="border-r border-gray px-2 text-gray"
                  onClick={() => setAmount(amount - 1)}
                >
                  -
                </button>

                <p className="w-12 text-center">{amount}</p>

                <button
                  className="border-l border-gray px-2"
                  onClick={() => setAmount(amount + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="hidden sm:flex">
              {service.isFavorite ? (
                <Image
                  src="/service/favoriteIconTrue.png"
                  width={25}
                  height={21}
                  alt="Icono de favorito seleccionado"
                  onClick={changeFavoriteService}
                />
              ) : (
                <Image
                  src="/service/favoriteBigIconFalse.png"
                  width={25}
                  height={21}
                  alt="Icono de favorito no seleccionado"
                  onClick={changeFavoriteService}
                />
              )}
            </div>

            <div className="flex sm:hidden">
              {service.isFavorite ? (
                <Image
                  src="/service/favoriteIconTrue.png"
                  width={25}
                  height={21}
                  alt="Icono de favorito seleccionado"
                  onClick={changeFavoriteService}
                />
              ) : (
                <Image
                  src="/service/favoriteIconFalse.png"
                  width={25}
                  height={21}
                  alt="Icono de favorito no seleccionado"
                  onClick={changeFavoriteService}
                />
              )}
            </div>
          </div>

          {service.aditionals.length > 0 && (
            <div className="flex flex-col gap-y-5">
              <h6 className="text-xl font-normal leading-5">
                Personaliza tu box
              </h6>

              <div className="flex flex-col gap-y-3">
                {service.aditionals.map((aditional, index) => (
                  <div key={index} className="flex w-full">
                    <AditionalCard
                      aditional={aditional}
                      action={changeTotalAditional}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <p className="text-base font-light leading-5 text-gray">
                  ¿Necesita más personalización?
                </p>

                <p className="text-base font-light leading-5 text-blue-300">
                  Hablar con un ejecutivo
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex flex-row justify-between pb-14 text-3xl font-medium leading-8">
              <h5>TOTAL</h5>

              <h6>
                {amount * service.price + totalAditionals}
                <span className="text-xl font-normal leading-5"> + IVA</span>
              </h6>
            </div>

            <div className="rounded bg-white">
              <Button intent="primary">COMPRAR</Button>
            </div>

            <p className="pt-4 text-center text-base font-light leading-5 text-blue-300">
              Imprimir presupuesto
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ServiceInformation;
