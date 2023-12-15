import { Additional } from "@prisma/client";
import { Switch } from "./ui/switch";
import { useState } from "react";

type AdditionalProps = {
  additional: Additional;
  onAdd: (add: boolean, additional: Additional) => void;
};

const PurchaseAdditional = ({
  additional,
  onAdd,
}: AdditionalProps) => {
  const [additionalOn, setAdditionalOn] = useState(false);

  const changeSelection = () => {
    onAdd(!additionalOn, additional);
    setAdditionalOn(!additionalOn);
  };

  return (
    <div className="flex flex-row gap-x-8">
      <div className="hover:cursor-pointer">
        <Switch checked={additionalOn} onCheckedChange={changeSelection} />
      </div>

      <div className="flex flex-col gap-y-1">
        <p className="text-base font-normal leading-4">{additional.name}</p>

        <p className="text-sm font-light leading-5">
          {additional.price === 0 ? (
            <span>Sin costo adicional</span>
          ) : (
            <span>${additional.price} adicionales</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PurchaseAdditional;
