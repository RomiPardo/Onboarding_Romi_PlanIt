import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import InputWithLabel from "./InputWithLabel";
import { OrderFormSchema as deliverySchema } from "~/server/schemas/orderSchema";
import { z } from "zod";
import { CreditCard } from "@prisma/client";
import NewCardForm from "./NewCardForm";
import Button from "./Button";
import { Switch } from "./ui/switch";
import ControlledSelect from "./ControlledSelect";

type DeliverySchemaType = z.infer<typeof deliverySchema>;

type DetailOrderProps = {
  errors: FieldErrors<DeliverySchemaType>;
  register: UseFormRegister<DeliverySchemaType>;
  userData: {
    name: string;
    lastName: string;
    contactNumber: string | null;
    cards: CreditCard[];
  };
  onClick: () => void;
  control: Control<DeliverySchemaType>;
};

const DetailOrder = ({
  register,
  errors,
  userData,
  onClick,
  control,
}: DetailOrderProps) => (
  <div className="flex w-full flex-grow flex-col gap-y-5 sm:w-1/2 sm:gap-y-16">
    <h4 className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-lg font-medium leading-normal text-transparent sm:text-4xl sm:leading-9">
      Detalles de la entrega
    </h4>

    <div className="flex flex-col sm:gap-y-12">
      <div className="flex flex-col gap-y-2 pb-14">
        <h5 className="pb-1 text-base font-medium leading-normal sm:pb-2 sm:text-3xl sm:leading-8">
          Método de Pago
        </h5>

        <ControlledSelect
          control={control}
          data={userData.cards.map((card) => ({
            value: card.id,
            label:
              card.number.slice(0, -4).replace(/\d/g, "*") +
              card.number.slice(-4),
          }))}
          errorMessage={errors.creditCardId?.message}
          name={"creditCardId"}
          placeholder="Selecciona una tarjeta de credito"
        />

        <NewCardForm />
      </div>

      <div className="flex flex-col gap-y-2 pb-6">
        <h5 className="pb-1 text-base font-medium leading-normal sm:pb-2 sm:text-3xl sm:leading-8">
          Información de facturación
        </h5>

        <InputWithLabel
          type="text"
          placeholder="RUT"
          errorMessage={errors.rut?.message}
          intent="secondary"
          {...register("rut")}
        />

        <InputWithLabel
          type="text"
          placeholder="Razón Social"
          errorMessage={errors.socialReason?.message}
          intent="secondary"
          {...register("socialReason")}
        />
      </div>

      <div className="flex flex-col pb-14">
        <div className="pb-5">
          <h5 className="pb-1 text-base font-medium leading-normal sm:pb-2 sm:text-3xl sm:leading-8">
            Destinatario
          </h5>

          <p className="text-sm font-normal leading-normal sm:text-lg sm:leading-5">
            Complete la información del destinatario de su regalo.
          </p>
        </div>

        <div className="flex w-full flex-col sm:justify-between sm:pb-12">
          <div className="flex w-full flex-col gap-x-6 sm:flex-row sm:justify-between">
            <InputWithLabel
              type="text"
              placeholder="Nombre"
              errorMessage={errors.firstName?.message}
              intent="secondary"
              {...register("firstName")}
            />

            <InputWithLabel
              type="text"
              placeholder="Apellido"
              errorMessage={errors.lastName?.message}
              intent="secondary"
              {...register("lastName")}
            />
          </div>

          <div className="flex w-full flex-col gap-x-6 sm:flex-row sm:justify-between">
            <InputWithLabel
              type="date"
              placeholder="Fecha de entrega"
              errorMessage={errors.deliveryDate?.message}
              intent="secondary"
              {...register("deliveryDate")}
            />

            <InputWithLabel
              type="tel"
              placeholder="Número de contacto"
              errorMessage={errors.contactNumber?.message}
              intent="secondary"
              {...register("contactNumber")}
            />
          </div>

          <div className="flex w-full flex-col gap-x-6 sm:flex-row sm:justify-between">
            <InputWithLabel
              type="text"
              placeholder="Dirección de entrega"
              errorMessage={errors.address?.message}
              intent="secondary"
              {...register("address")}
            />

            <InputWithLabel
              type="time"
              placeholder="Horarios de entrega"
              errorMessage={errors.deliveryHours?.message}
              intent="secondary"
              {...register("deliveryHours")}
            />
          </div>
        </div>

        <div className="flex flex-row gap-x-8">
          <Controller
            control={control}
            name="surprise"
            render={({ field: { onChange, value } }) => (
              <Switch checked={value} onCheckedChange={onChange} />
            )}
          />

          <div className="flex flex-col">
            <p className="text-xs font-normal leading-normal sm:text-base sm:leading-4">
              Entrega sorpresa
            </p>

            <p className="text-xs font-normal leading-normal text-gray sm:text-sm sm:font-light sm:leading-5">
              Si el envío no es sorpresa, podríamos contactar al destinatario de
              la entrega.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col pb-6">
        <div className="pb-5">
          <h5 className="pb-1 text-base font-medium leading-normal sm:pb-2 sm:text-3xl sm:leading-8">
            Personalización
          </h5>

          <p className="text-sm font-normal leading-normal sm:text-lg sm:leading-5">
            <span className="hidden sm:block">
              Seleccionó la opción de agregar una tarjeta personal.
            </span>{" "}
            Por favor, deje el mensaje que desea que acompañe el obsequio.
          </p>
        </div>

        <InputWithLabel
          type="textarea"
          placeholder="Escriba su mensaje..."
          errorMessage={errors.message?.message}
          intent="textarea"
          {...register("message")}
        />

        <div className="hidden flex-row justify-between sm:flex">
          <div className="flex flex-col">
            <p>Adjuntar logo de la empresa</p>

            <p>Adjuntar en formato png, sin fondo y en alta resolución.</p>
          </div>

          <div className="w-44">
            <InputWithLabel
              type="file"
              errorMessage={errors.image?.message}
              intent="noStyle"
              {...register("image")}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-2 pb-14">
        <h5 className="pb-1 text-base font-medium leading-normal sm:pb-2 sm:text-3xl sm:leading-8">
          Si el envío rebota
        </h5>

        <p className="w-3/4 text-sm font-normal leading-normal sm:w-full sm:text-lg sm:leading-5">
          Cada re-entrega se considera un envío extra y el horario será
          coordinado por nuestro equipo con el destinatario.
        </p>

        <div className="flex flex-row items-center gap-x-3">
          <div className="w-auto">
            <input type="checkbox" {...register("tryAgain")} />
          </div>

          <p className="text-xs font-normal leading-normal sm:text-base sm:leading-4">
            Intentar reenvío a la misma dirección
          </p>
        </div>
      </div>

      <div className="block sm:hidden">
        <Button type="button" intent="primary" onClick={onClick}>
          VALIDAR COMPRA
        </Button>
      </div>
    </div>
  </div>
);

export default DetailOrder;
