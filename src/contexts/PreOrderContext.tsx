import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { LocalDataType } from "~/types/localData";
import useStorage from "~/hooks/useStorage";

type ContextType = {
  preOrder?: LocalDataType;
  setPreOrder: (newValue: LocalDataType | undefined) => void;
};

const PreOrderContext = createContext<ContextType>({
  setPreOrder: (newValue: LocalDataType | undefined) => {
    return;
  },
});

type WrapperProps = {
  children: ReactNode;
};

export const PreOrderWrapper = ({ children }: WrapperProps) => {
  const { getItem } = useStorage();
  const storedValue = getItem("preOrder", "local");

  const [preOrder, setPreOrder] = useState<LocalDataType | undefined>();

  useEffect(() => {
    if (storedValue) {
      setPreOrder(JSON.parse(storedValue) as LocalDataType);
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

export const usePreOrderContext = (key: string) => {
  const context = useContext(PreOrderContext);

  if (!context) {
    throw new Error(
      "usePreOrderContext debe ser utilizado dentro de un PreOrderProvider",
    );
  }

  const setter = (preOrder: LocalDataType | undefined) => {
    preOrder
      ? localStorage.setItem(key, JSON.stringify(preOrder))
      : localStorage.removeItem(key);
    context.setPreOrder(preOrder);
  };

  return { preOrder: context.preOrder, setPreOrder: setter };
};
