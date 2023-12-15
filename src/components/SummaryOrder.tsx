import Image from "next/image";
import Button from "./Button";
import { usePreOrderContext } from "~/hooks/usePreOrderContext";

const SummaryOrder = () => {
  const context = usePreOrderContext();
  const preOrder = context.preOrder;

  if (!preOrder) {
    return (
      <div className="relative flex w-full sm:bottom-7 sm:left-0 sm:w-[466px]">
        <div className="flex w-full flex-col gap-y-5 sm:fixed sm:w-[466px] sm:gap-y-10 sm:bg-white sm:px-14 sm:py-20">
          <p>Cargando información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full sm:bottom-7 sm:left-0 sm:w-[466px]">
      <div className="flex w-full flex-col gap-y-5 sm:fixed sm:w-[466px] sm:gap-y-10 sm:bg-white sm:px-14 sm:py-20">
        <h5 className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-lg font-medium leading-normal text-transparent sm:text-center sm:text-4xl sm:leading-8 sm:text-black">
          Resumen de compra
        </h5>

        <div className="flex flex-row gap-x-5">
          <Image
            className="rounded-md object-cover"
            src={preOrder.service.image[0] ?? "/service/example.png"}
            width="102"
            height="97"
            alt="Imagen del servicio"
          />

          <div className="flex flex-col gap-y-2">
            <h6 className="text-lg font-medium leading-normal sm:text-xl sm:font-normal sm:leading-5">
              {preOrder.service.provider.name} | {preOrder.service.name}
            </h6>

            <div>
              {preOrder.additionals.map((additional, index) => (
                <p
                  key={index}
                  className="text-sm font-normal leading-normal text-black sm:text-base sm:leading-4 sm:text-gray"
                >
                  {additional.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4 pb-2 pt-7 text-sm font-normal leading-normal sm:pb-0 sm:pt-0 sm:text-base sm:leading-4">
          <div className="flex flex-row justify-between">
            <p className="text-gray">Subtotal</p>

            <p>$ {preOrder.subtotal}</p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-gray">Costo de envío</p>

            <p>$ {preOrder.service.deliveryPrice}</p>
          </div>

          <div className="flex flex-row justify-between">
            <p className="text-gray">IVA</p>

            <p>
              $ {(preOrder.subtotal + preOrder.service.deliveryPrice) * 0.22}
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between pb-5 text-lg font-medium leading-normal sm:pb-0 sm:leading-5">
          <p>TOTAL</p>

          <p>
            ${" "}
            {preOrder.subtotal +
              preOrder.service.deliveryPrice +
              (preOrder.subtotal + preOrder.service.deliveryPrice) * 0.22}
          </p>
        </div>

        <div className="w-full rounded bg-white">
          <Button intent="primary">COMPRAR</Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryOrder;
