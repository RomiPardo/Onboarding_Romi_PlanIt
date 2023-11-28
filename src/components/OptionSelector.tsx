import Image from "next/image";

type OptionSelectorProps = {
  action: () => void;
  on: boolean;
};

const OptionSelector = ({ action, on }: OptionSelectorProps) => (
  <div className="hover:cursor-pointer">
    {on ? (
      <Image
        src="/service/aditionalOn.png"
        width={42}
        height={19}
        alt="Adicional seleccionado"
        onClick={action}
      />
    ) : (
      <Image
        src="/service/aditionalOff.png"
        width={42}
        height={19}
        alt="Adicional no seleccionado"
        onClick={action}
      />
    )}
  </div>
);

export default OptionSelector;
