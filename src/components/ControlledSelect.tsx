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

type DeliverySchemaType = z.infer<typeof deliverySchema>;

type DataInSelectType = {
  value: string;
  label: string;
};

type ControlledSelectProps = {
  control: Control<DeliverySchemaType>;
  placeholder: string;
  name: keyof DeliverySchemaType;
  data: DataInSelectType[];
  errorMessage?: string;
};

const ControlledSelect = ({
  control,
  errorMessage,
  placeholder,
  name,
  data,
}: ControlledSelectProps) => (
  <>
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <Select value={value as string} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {data.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />

    {errorMessage && (
      <p className="block text-sm text-red-600 md:text-base">{errorMessage}</p>
    )}
  </>
);

export default ControlledSelect;
