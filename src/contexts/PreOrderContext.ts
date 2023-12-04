import { Aditional } from "@prisma/client";
import { createContext } from "react";

export const PreOrderContext = createContext({
  service: {
    deliveryPrice: 0,
    image: [] as string[],
    name: "",
    provider: { name: "" },
    id: "",
  },
  aditionals: [] as Aditional[],
  subtotal: 0,
  amount: 0,
});
