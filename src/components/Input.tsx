import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps {
  type: string;
  id: string;
  styleInput: string;
  styleDiv: string;
  placeholder: string;
}

const Input = ({
  type,
  id,
  styleInput,
  styleDiv,
  placeholder,
  children,
}: {
  type: string;
  id: string;
  styleInput: string;
  styleDiv: string;
  placeholder: string;
  children: ReactNode;
}) => {
  const { register } = useFormContext();

  return (
    <div className={styleDiv}>
      <input
        className={styleInput}
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(id)}
      ></input>

      {children}
    </div>
  );
};

export default Input;
