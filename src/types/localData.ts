import { Aditional } from "@prisma/client";

export type LocalDataType = {
  service: {
    deliveryPrice: number;
    image: string[];
    name: string;
    provider: { name: string };
    id: string;
  };
  aditionals: Aditional[];
  subtotal: number;
  amount: number;
};
