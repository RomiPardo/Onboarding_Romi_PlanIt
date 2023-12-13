import { createContext, useContext } from "react";
import { PreOrderContext } from "~/contexts/PreOrderContext";
import { LocalPreOrderType } from "~/types/localData";

export const usePreOrderContext = (key: string) => {
  const context = useContext(PreOrderContext);

  if (!context) {
    throw new Error(
      "usePreOrderContext debe ser utilizado dentro de un PreOrderProvider",
    );
  }

  const setter = (preOrder: LocalPreOrderType | undefined) => {
    preOrder
      ? localStorage.setItem(key, JSON.stringify(preOrder))
      : localStorage.removeItem(key);
    context.setPreOrder(preOrder);
  };

  return { preOrder: context.preOrder, setPreOrder: setter };
};
