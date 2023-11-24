import { Aditional as AditionalCard } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type AditionalProps = {
  aditional: AditionalCard;
  action: (price: number) => void;
};

const AditionalCard = ({ aditional, action }: AditionalProps) => {
  const [aditionalOn, setAditionalOn] = useState(false);

  const changeSelection = () => {
    !aditionalOn ? action(aditional.price) : action(aditional.price * -1);
    setAditionalOn(!aditionalOn);
  };

  return (
    <div className="flex flex-row gap-x-8">
      <div className="hover:cursor-pointer">
        {aditionalOn ? (
          <Image
            src="/service/aditionalOn.png"
            width={42}
            height={19}
            alt="Adicional seleccionado"
            onClick={changeSelection}
          />
        ) : (
          <Image
            src="/service/aditionalOff.png"
            width={42}
            height={19}
            alt="Adicional no seleccionado"
            onClick={changeSelection}
          />
        )}
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

export default AditionalCard;
