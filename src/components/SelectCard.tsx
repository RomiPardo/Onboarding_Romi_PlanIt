import { Control } from "react-hook-form";
import { OrderFormSchema as deliverySchema } from "~/server/schemas/orderSchema";
import { z } from "zod";
import { CreditCard } from "@prisma/client";
import ControllerCreditCard from "./ControllerCreditCard";

type DeliverySchemaType = z.infer<typeof deliverySchema>;

type SelectCardProps = {
  control: Control<DeliverySchemaType>;
  cards: CreditCard[];
  errorMessage?: string;
};

const SelectCard = ({ control, cards, errorMessage }: SelectCardProps) => (
  <div>
    <ControllerCreditCard control={control} cards={cards} />

    {errorMessage && (
      <p className="block text-sm text-red-600 md:text-base">{errorMessage}</p>
    )}
  </div>
);

export default SelectCard;
