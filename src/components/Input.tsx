import { useFormContext } from "react-hook-form";
import { cva, VariantProps } from "class-variance-authority";
import { useState } from "react";

const inputStyles = cva("", {
  variants: {
    intent: {
      primary:
        "focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black pb-2 placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:pb-3 md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5 bg-transparent",
      secondary:
        "focus:!important border-b bordr-l-0 border-r-0 border-t-0 border-solid border-gray pb-2  focus:outline-none ms:pb-3 text-gray leading-normal text-base font-medium bg-transparent",
    },
    defaultVariants: {
      intent: "primary",
    },
  },
});

type InputProps = VariantProps<typeof inputStyles> & {
  type: string;
  id: string;
  placeholder?: string;
  errorMessage?: string;
  value?: string;
  label?: string;
};

const Input = ({
  intent,
  type,
  id,
  placeholder,
  errorMessage,
  value,
  label,
  ...props
}: InputProps) => {
  const { register } = useFormContext();
  const [stateOfInput, setStateOfInput] = useState(value);

  return (
    <div className="flex flex-col gap-y-3 pb-8 md:w-full md:pb-10">
      {label && <label className="text-xs font-normal">{label}</label>}

      <div className="flex flex-col gap-y-2.5 pb-8 md:w-full md:pb-6">
        <input
          className={inputStyles({ intent })}
          {...props}
          type={type}
          placeholder={placeholder}
          id={id}
          {...register(id)}
          value={stateOfInput}
          onChange={(e) => setStateOfInput(e.target.value)}
        />

        {errorMessage && (
          <p className="block text-sm text-red-600 md:text-base">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
