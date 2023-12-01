import { Aditional } from "@prisma/client";
import { Switch } from "./ui/switch";
import { useState } from "react";

type AditionalProps = {
  aditional: Aditional;
  action: (add: boolean, aditional: Aditional) => void;
};

const PurchaseAdditional = ({ aditional, action }: AditionalProps) => {
  const [aditionalOn, setAditionalOn] = useState(false);

  const changeSelection = () => {
    !aditionalOn
      ? action(!aditionalOn, aditional)
      : action(!aditionalOn, aditional);
    setAditionalOn(!aditionalOn);
  };

  return (
    <div className="flex flex-row gap-x-8">
      <div className="hover:cursor-pointer">
        <Switch checked={aditionalOn} onCheckedChange={changeSelection} />
      </div>

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

export default PurchaseAdditional;
