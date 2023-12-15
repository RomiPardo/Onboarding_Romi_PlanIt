import { Additional } from "@prisma/client";

export type LocalPreOrderType = {
  service: {
    deliveryPrice: number;
    image: string[];
    name: string;
    provider: { name: string };
    id: string;
  };
  additionals: Additional[];
  subtotal: number;
  amount: number;
};
