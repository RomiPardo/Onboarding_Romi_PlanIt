import Image from "next/image";
import { Aditional, Service } from "@prisma/client";
import Button from "./Button";

type SummaryOrderProps = {
  service: Service & { provider: { name: string } };
  aditionals: Aditional[];
  subtotal: number;
};

const SummaryOrder = ({ service, aditionals, subtotal }: SummaryOrderProps) => (
  <div className="relative bottom-7 left-0 flex w-[466px]">
    <div className="fixed flex w-[466px] flex-col gap-y-10 bg-white px-14 py-20">
      <h5 className="text-center text-4xl font-medium leading-8">
        Resumen de compra
      </h5>

      <div className="flex flex-row gap-x-5">
        <Image
          className="rounded-t-md object-cover"
          src={service.image[0] ?? "/service/example.png"}
          width="102"
          height="97"
          alt="Imagen del servicio"
        />

        <div className="flex flex-col gap-y-2">
          <h6 className="text-xl font-normal leading-5">
            {service.provider.name} | {service.name}
          </h6>

          <div>
            {aditionals.map((aditional, index) => (
              <p
                key={index}
                className="text-base font-normal leading-4 text-gray"
              >
                {aditional.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 text-base font-normal leading-4">
        <div className="flex flex-row justify-between">
          <p className="text-gray">Subtotal</p>

          <p>{subtotal}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-gray">Costo de envío</p>

          <p>{service.deliveryPrice}</p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-gray">IVA</p>

          <p>{(subtotal + service.deliveryPrice) * 0.22}</p>
        </div>
      </div>

      <div className="flex flex-row justify-between text-lg font-medium leading-5">
        <p>TOTAL</p>

        <p>
          {subtotal +
            service.deliveryPrice +
            (subtotal + service.deliveryPrice) * 0.22}
        </p>
      </div>

      <div className="w-full rounded bg-white">
        <Button intent="primary" type="submit">
          COMPRAR
        </Button>
      </div>
    </div>
  </div>
);

export default SummaryOrder;
