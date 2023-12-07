import React, { useState } from "react";
import Image from "next/image";
import PurchaseAdditional from "./PurchaseAdditional";
import Button from "./Button";
import { RouterOutput } from "~/types/common";
import Link from "next/link";
import GoBack from "./GoBack";
import FavoriteButton from "./FavoriteButton";
import ImageCarousel from "./ImageCarousel";
import NumericInput from "./NumericInput";
import { Aditional } from "@prisma/client";

type ServerInformationProps = {
  service: NonNullable<RouterOutput["service"]["getById"]>;
};

const ServiceInformation = ({ service }: ServerInformationProps) => {
  const [amount, setAmount] = useState(1);
  const [aditionalsSelected, setAditionalsSelected] = useState<Aditional[]>([]);

  const matchLineBreak = /\u000A|\u000D|\u000D\u000A/;

  const changeTotalAditional = (add: boolean, aditional: Aditional) => {
    if (add) {
      setAditionalsSelected([...aditionalsSelected, aditional]);
    } else {
      setAditionalsSelected(
        aditionalsSelected.filter(
          (aditionals) => aditionals.id !== aditional.id,
        ),
      );
    }
  };

  return (
    <main className="flex flex-col gap-x-5 bg-light-gray pb-40 pt-0 font-poppins sm:flex-row sm:px-32 sm:pb-28 sm:pt-24">
      <div className=" flex flex-col sm:w-3/5">
        <div className="relative flex w-full flex-col pb-14">
          <ImageCarousel images={service.image} />

          <div className="absolute h-3/5 w-full bg-gradient-to-b from-black to-transparent object-cover sm:hidden"></div>

          <GoBack service={service} favoriteIcon={true} color="white" />
        </div>

        <div className="hidden flex-col gap-y-11 sm:flex">
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

      <div className="flex flex-grow flex-col gap-y-10 px-5 sm:gap-y-14">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-y-1 sm:gap-y-6">
            <div className="flex flex-col gap-y-1">
              <h5 className="text-2xl font-medium leading-8 sm:text-3xl">
                {service.provider.name}
              </h5>

              <h4 className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-4xl font-semibold leading-10 text-transparent sm:font-medium sm:leading-9">
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

              <p className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-base font-medium leading-normal text-transparent sm:font-normal sm:leading-4">
                {service.qualification}
              </p>
            </div>

            <div className="hidden sm:flex">
              <NumericInput onClick={setAmount} amount={amount} />
            </div>
          </div>

          <div className="hidden sm:flex">
            <FavoriteButton
              serviceId={service.id}
              isFavorite={service.isFavorite}
              width={25}
              height={21}
              linkFalse="/service/favoriteBigIconFalse.png"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-3 text-[#444343] sm:hidden sm:gap-y-11 sm:text-black">
          <h5 className="text-lg font-medium leading-normal sm:text-3xl sm:font-medium sm:leading-8">
            Descripción
          </h5>

          <div className="flex flex-col gap-y-4">
            {service.description.split(matchLineBreak).map((item, index) => (
              <p
                className="text-sm font-normal leading-normal sm:text-lg sm:font-normal sm:leading-5"
                key={index}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex">
          {service.aditionals.length > 0 && (
            <div className="flex flex-col gap-y-5">
              <h6 className="text-xl font-normal leading-5 text-[#444343]">
                Personaliza tu box
              </h6>

              <div className="flex flex-col gap-y-3">
                {service.aditionals.map((aditional, index) => (
                  <div key={index} className="flex w-full">
                    <PurchaseAdditional
                      aditional={aditional}
                      onAdd={changeTotalAditional}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col">
                <p className="text-base font-light leading-5 text-gray">
                  ¿Necesita más personalización?
                </p>

                <Link
                  href={"/help"}
                  className="text-base font-light leading-5 text-blue-300"
                >
                  Hablar con un ejecutivo
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row items-center justify-between pb-10 text-3xl font-medium leading-8 text-[#444343] sm:pb-14">
            <h5 className="hidden sm:block">TOTAL</h5>

            <h6 className="hidden sm:block">
              $
              {(service.price +
                (aditionalsSelected.length !== 0
                  ? aditionalsSelected
                      .map((aditional) => aditional.price)
                      .reduce((a, b) => a + b)
                  : 0)) *
                amount}
              <span className="text-xl font-normal leading-5"> + IVA</span>
            </h6>

            <h3 className="flex bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-lg font-medium leading-normal text-transparent sm:hidden">
              ${service.price} / unidad
            </h3>
          </div>

          <div className="flex flex-row items-center justify-between gap-x-6">
            <div className="flex sm:hidden">
              <NumericInput onClick={setAmount} amount={amount} />
            </div>

            <div className="w-full rounded bg-white">
              <Button intent="primary">
                <p>
                  COMPRAR <span className="sm:hidden">AHORA</span>
                </p>
              </Button>
            </div>
          </div>

          <Link
            href={"/print"}
            className="hidden pt-4 text-center text-base font-light leading-5 text-blue-300 sm:block"
          >
            Imprimir presupuesto
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ServiceInformation;
