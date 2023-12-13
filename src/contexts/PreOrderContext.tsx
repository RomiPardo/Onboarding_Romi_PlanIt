import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { LocalPreOrderType } from "~/types/localData";
import useStorage from "~/hooks/useStorage";

type ContextType = {
  preOrder?: LocalPreOrderType;
  setPreOrder: (newValue: LocalPreOrderType | undefined) => void;
};

export const PreOrderContext = createContext<ContextType>({
  setPreOrder: (newValue: LocalPreOrderType | undefined) => {
    return;
  },
});

type WrapperProps = {
  children: ReactNode;
};

export const PreOrderContextProvider = ({ children }: WrapperProps) => {
  const { getItem } = useStorage();
  const storedValue = getItem("preOrder", "local");

  const [preOrder, setPreOrder] = useState<LocalPreOrderType | undefined>(
    () => {
      return storedValue
        ? (JSON.parse(storedValue) as LocalPreOrderType)
        : undefined;
    },
  );

  useEffect(() => {
    if (storedValue) {
      setPreOrder(JSON.parse(storedValue) as LocalPreOrderType);
    }
  }, [storedValue]);

  return (
    <PreOrderContext.Provider
      value={{ preOrder: preOrder, setPreOrder: setPreOrder }}
    >
      {children}
    </PreOrderContext.Provider>
  );
};
