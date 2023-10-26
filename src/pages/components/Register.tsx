import { useForm } from "react-hook-form";

const Register = ({
  action,
  show,
}: {
  action: (user: {
    name: string;
    lastName: string;
    email: string;
    business: string;
    password: string;
  }) => void;
  show: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      business: "",
    },
  });

  const response = show ? (
    <div className="flex w-full flex-row">
      <div className="w-6/12">
        <p>aaaa</p>
      </div>

      <form
        onSubmit={handleSubmit((data) =>
          action({
            name: watch("name"),
            lastName: watch("lastName"),
            email: watch("email"),
            business: watch("business"),
            password: watch("password"),
          }),
        )}
        className="flex w-6/12 flex-col px-36"
      >
        <div className="flex flex-col gap-y-2.5 xl:w-full">
          <input
            className="placeholder:font-poppins focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none xl:placeholder:text-lg xl:placeholder:font-normal xl:placeholder:leading-5"
            type="text"
            placeholder="Nombre"
            id="name"
            {...register("name", { required: "This is required." })}
          ></input>

          <p className="block text-sm text-red-600 xl:text-base">
            {errors.name?.message}
          </p>
        </div>

        <div className="flex flex-col gap-y-2.5 xl:w-full">
          <input
            className="placeholder:font-poppins focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none xl:placeholder:text-lg xl:placeholder:font-normal xl:placeholder:leading-5"
            type="text"
            placeholder="Apellido"
            id="lastName"
            {...register("lastName", { required: "This is required." })}
          ></input>

          <p className="block text-sm text-red-600 xl:text-base">
            {errors.lastName?.message}
          </p>
        </div>

        <div className="flex flex-col gap-y-2.5 xl:w-full">
          <input
            className="placeholder:font-poppins focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none xl:placeholder:text-lg xl:placeholder:font-normal xl:placeholder:leading-5"
            type="mail"
            placeholder="Email"
            id="email"
            {...register("email", {
              required: "This is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not with match email format",
              },
            })}
          ></input>

          <p className="block text-sm text-red-600 xl:text-base">
            {errors.email?.message}
          </p>
        </div>

        <div className="flex flex-col gap-y-2.5 xl:w-full">
          <input
            className="placeholder:font-poppins focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none xl:placeholder:text-lg xl:placeholder:font-normal xl:placeholder:leading-5"
            type="password"
            placeholder="Contraseña"
            id="password"
            {...register("password", {
              required: "This is required.",
              minLength: {
                value: 8,
                message: "The password should have 8 or more characters",
              },
            })}
          ></input>

          <p className="block text-sm text-red-600 xl:text-base">
            {errors.password?.message}
          </p>
        </div>

        <div className="flex flex-col gap-y-2.5 xl:w-full">
          <input
            className="placeholder:font-poppins focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none xl:placeholder:text-lg xl:placeholder:font-normal xl:placeholder:leading-5"
            type="string"
            placeholder="Nombre de la Empresa"
            id="business"
            {...register("business", { required: "This is required." })}
          ></input>

          <p className="block text-sm text-red-600 xl:text-base">
            {errors.business?.message}
          </p>
        </div>

        <div className="rounded bg-white">
          <input
            className="border-grey-scale-black shadow-custom w-full rounded border-0 bg-gradient-to-br from-blue-500 to-blue-300 bg-clip-text py-2.5 text-center text-base font-normal leading-5 text-transparent"
            type="submit"
          />
        </div>
      </form>
    </div>
  ) : (
    <div></div>
  );

  return response;
};

export default Register;
