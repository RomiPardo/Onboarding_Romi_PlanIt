import Image from "next/image";

type OptionSelectorProps = {
  onClick: () => void;
  on: boolean;
};

const OptionSelector = ({ onClick, on }: OptionSelectorProps) => (
  <div className="hover:cursor-pointer">
    {on ? (
      <Image
        src="/service/aditionalOn.png"
        width={42}
        height={19}
        alt="Adicional seleccionado"
        onClick={onClick}
      />
    ) : (
      <Image
        src="/service/aditionalOff.png"
        width={42}
        height={19}
        alt="Adicional no seleccionado"
        onClick={onClick}
      />
    )}
  </div>
);

export default OptionSelector;
