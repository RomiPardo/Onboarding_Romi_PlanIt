import { Control, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { OrderFormSchema as deliverySchema } from "~/server/schemas/orderSchema";
import { z } from "zod";
import { CreditCard } from "@prisma/client";

type DeliverySchemaType = z.infer<typeof deliverySchema>;

type SelectCardProps = {
  control: Control<DeliverySchemaType>;
  cards: CreditCard[];
  errorMessage?: string;
};

const SelectCard = ({ control, cards, errorMessage }: SelectCardProps) => (
  <div>
    <Controller
      control={control}
      name="creditCardId"
      render={({ field: { onChange, value } }) => (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una tarjeta de credito" />
          </SelectTrigger>
          <SelectContent>
            {cards.map((card, index) => (
              <SelectItem key={index} value={card.id}>
                {card.number.slice(0, -4).replace(/\d/g, "*") +
                  card.number.slice(-4)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />

    {errorMessage && (
      <p className="block text-sm text-red-600 md:text-base">{errorMessage}</p>
    )}
  </div>
);

export default SelectCard;
