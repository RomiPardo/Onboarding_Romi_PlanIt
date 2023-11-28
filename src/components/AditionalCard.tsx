import { Aditional as AditionalCard } from "@prisma/client";
import { useState } from "react";
import OptionSelector from "./OptionSelector";

type AditionalProps = {
  aditional: AditionalCard;
  action: (price: number, id: string) => void;
};

const AditionalCard = ({ aditional, action }: AditionalProps) => {
  const [aditionalOn, setAditionalOn] = useState(false);

  const changeSelection = () => {
    !aditionalOn
      ? action(aditional.price, aditional.id)
      : action(aditional.price * -1, aditional.id);
    setAditionalOn(!aditionalOn);
  };

  return (
    <div className="flex flex-row gap-x-8">
      <OptionSelector action={changeSelection} on={aditionalOn} />

      <div className="flex flex-col gap-y-1">
        <p className="text-base font-normal leading-4">{aditional.name}</p>

        <p className="text-sm font-light leading-5">
          {aditional.price === 0 ? (
            <span>Sin costo adicional</span>
          ) : (
            <span>${aditional.price} adicionales</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default AditionalCard;
