import { useFormContext } from "react-hook-form";

type InputProps = {
  type: string;
  id: string;
  placeholder: string;
  errorMessage?: string;
};

const Input = ({ type, id, placeholder, errorMessage }: InputProps) => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-y-3 pb-8 md:w-full md:pb-10">
      <input
        className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black pb-2 placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:pb-3 md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(id)}
      ></input>

      {errorMessage && (
        <p className="block text-sm text-red-600 md:text-base">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;
