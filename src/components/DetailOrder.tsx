import { FieldErrors, UseFormRegister } from "react-hook-form";
import InputWithLabel from "./InputWithLabel";
import OptionSelector from "./OptionSelector";
import { OrderSchema as deliverySchema } from "~/server/schemas/orderSchema";
import { z } from "zod";
import { CreditCard } from "@prisma/client";
import NewCardForm from "./NewCardForm";

type DeliverySchemaType = z.infer<typeof deliverySchema>;

type DetailOrderProps = {
  errors: FieldErrors<DeliverySchemaType>;
  register: UseFormRegister<DeliverySchemaType>;
  action: () => void;
  sorprise: boolean;
  userData: {
    name: string;
    lastName: string;
    contactNumber: string | null;
    cards: CreditCard[];
  };
};

const DetailOrder = ({
  register,
  errors,
  action,
  userData,
  sorprise,
}: DetailOrderProps) => (
  <div className="flex w-full flex-grow flex-col gap-y-12 sm:w-1/2">
    <h4 className="bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text pb-5 text-4xl font-medium leading-9 text-transparent">
      Detalles de la entrega
    </h4>

    <div className="flex flex-col gap-y-2">
      <h5 className="pb-2 text-3xl font-medium leading-8">Método de Pago</h5>

      <select
        {...register("cardNumber")}
        className="bg-light-gray focus:outline-none"
      >
        {userData.cards.map((card, index) => (
          <option key={index} value={card.number}>
            {card.number}

            {/* {card.number.slice(0, -4).replace(/\d/g, "*") +
              card.number.slice(-4)} */}
          </option>
        ))}
      </select>

      <NewCardForm />
    </div>

    <div className="flex flex-col gap-y-2">
      <h5 className="pb-2 text-3xl font-medium leading-8">
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

    <div className="flex flex-col">
      <div className="pb-5">
        <h5 className="pb-2 text-3xl font-medium leading-8">Destinatario</h5>

        <p className="text-lg font-normal leading-5">
          Complete la información del destinatario de su regalo.
        </p>
      </div>

      <div className="flex w-full flex-row justify-between gap-x-6 pb-12">
        <div className="flex w-full flex-col">
          <InputWithLabel
            type="text"
            placeholder="Nombre y apellido"
            errorMessage={errors.completeName?.message}
            intent="secondary"
            {...register("completeName")}
          />

          <InputWithLabel
            type="date"
            placeholder="Fecha de entrega"
            errorMessage={errors.deliveryDate?.message}
            intent="secondary"
            {...register("deliveryDate")}
          />

          <InputWithLabel
            type="text"
            placeholder="Dirección de entrega"
            errorMessage={errors.direction?.message}
            intent="secondary"
            {...register("direction")}
          />
        </div>

        <div className="flex w-full flex-col">
          <InputWithLabel
            type="tel"
            placeholder="Número de contacto"
            errorMessage={errors.contactNumber?.message}
            intent="secondary"
            {...register("contactNumber")}
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
        <OptionSelector action={action} on={sorprise} />

        <div className="flex flex-col">
          <p>Entrega sorpresa</p>

          <p>
            Si el envío no es sorpresa, podríamos contactar al destinatario de
            la entrega.
          </p>
        </div>
      </div>
    </div>

    <div className="flex flex-col">
      <div className="pb-5">
        <h5 className="pb-2 text-3xl font-medium leading-8">Personalización</h5>

        <p className="text-lg font-normal leading-5">
          Seleccionó la opción de agregar una tarjeta personal. Por favor, deje
          el mensaje que desea que acompañe el obsequio.
        </p>
      </div>

      <InputWithLabel
        type="text"
        placeholder="Escriba su mensaje..."
        errorMessage={errors.mensage?.message}
        intent="textarea"
        {...register("mensage")}
      />

      <div className="flex flex-row justify-between">
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

    <div className="flex flex-col gap-y-2">
      <h5 className="pb-2 text-3xl font-medium leading-8">
        Si el envío rebota
      </h5>

      <p className="text-lg font-normal leading-5">
        Cada re-entrega se considera un envío extra y el horario será coordinado
        por nuestro equipo con el destinatario.
      </p>

      <div className="flex flex-row items-center gap-x-3">
        <div className="w-auto">
          <InputWithLabel
            type="checkbox"
            errorMessage={errors.tryAgain?.message}
            intent="noStyle"
            {...register("tryAgain")}
          />
        </div>

        <p className="pb-8 md:pb-10">Intentar reenvío a la misma dirección</p>
      </div>
    </div>
  </div>
);

export default DetailOrder;
