import { forwardRef } from "react";
import Input, { InputProps } from "./Input";

type InputWithLabelProps = InputProps & {
  errorMessage?: string;
  label?: string;
};

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ errorMessage, label, ...props }, ref) => (
    <div className="flex flex-col gap-y-3 pb-8 md:w-full md:pb-10">
      {label && <label className="text-xs font-normal">{label}</label>}

      <div className="flex flex-col gap-y-2.5 md:w-full">
        <Input {...props} ref={ref} />

        {errorMessage && (
          <p className="block text-sm text-red-600 md:text-base">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  ),
);

InputWithLabel.displayName = "InputWithLabel";
export default InputWithLabel;
