import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { RegisterUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UserSchema = z.infer<typeof userShema>;

const Register = ({}: {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserSchema>({
    resolver: zodResolver(userShema),
  });

  const registerMutation = api.user.registerUser.useMutation({
    onError(err) {
      alert(err.message);
    },
    onSuccess(data) {
      if (!data.user) {
        alert("An unexpected error happened");
      }
    },
  });

  const signUp = async (user: {
    name: string;
    lastName: string;
    email: string;
    business: string;
    password: string;
  }) => {
    try {
      await registerMutation.mutateAsync({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        business: user.business,
      });

      await signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: `http://localhost:3000/`,
      });
    } catch (err) {}
  };

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="hidden w-6/12 bg-gradient-to-br from-blue-500 to-blue-300 md:flex md:flex-col">
        <div className="flex flex-col px-28 py-28">
          <div>
            <img
              rel="icon"
              src="/registerPage/logoSecondary.png"
              className="w-40"
            />
          </div>

          <div className="leading-11 w-3/4 py-10">
            <h3 className="text-5xl font-semibold text-white">
              Comienza a simplificar tus acciones,{" "}
              <span className="text-blue-300">aquí.</span>
            </h3>
          </div>

          <div>
            <h6 className="w-3/4 text-xl font-normal leading-5 text-white">
              En nuestra plataforma web vas a encontrar todo lo que estás
              buscando.
            </h6>
          </div>
        </div>

        <div className="relative">
          <img className="relative" src="/registerPage/macBookPro16.png" />
          <img className="w-97 absolute top-8" src="/registerPage/design.png" />
        </div>
      </div>

      <div className="ms:w-6/12 flex flex-col px-5 pt-7 md:px-32 md:pt-44">
        <div className="flex flex-col pb-14">
          <h4 className="w-10/12 pb-5 text-4xl font-semibold leading-10 md:w-full md:pb-10 md:font-medium md:leading-9">
            ¡Bienvenido a Plan IT!
          </h4>

          <p className="w-11/12 pb-4 text-lg font-normal leading-5 md:w-full md:pb-6 md:text-lg">
            Por favor, complete su información personal para crear un usuario
            propio.
          </p>

          <p className="text-sm font-normal leading-normal text-gray md:text-base md:leading-4">
            ¿Ya tenés una cuenta?{" "}
            <a className="text-blue-300">Inicia sesión aquí.</a>
          </p>
        </div>

        <form
          onSubmit={handleSubmit((data) =>
            signUp({
              name: watch("name"),
              lastName: watch("lastName"),
              email: watch("email"),
              business: watch("business"),
              password: watch("password"),
            }),
          )}
        >
          <div className="flex flex-col gap-y-2.5 pb-8 md:w-full md:pb-6">
            <input
              className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
              type="text"
              placeholder="Nombre"
              id="name"
              {...register("name")}
            ></input>

            {errors.name && (
              <p className="block text-sm text-red-600 md:text-base">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2.5 pb-8 md:w-full md:pb-6">
            <input
              className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
              type="text"
              placeholder="Apellido"
              id="lastName"
              {...register("lastName")}
            ></input>

            {errors.lastName && (
              <p className="block text-sm text-red-600 md:text-base">
                {errors.lastName?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2.5 pb-8 md:w-full md:pb-6">
            <input
              className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
              type="mail"
              placeholder="Email"
              id="email"
              {...register("email")}
            ></input>

            {errors.email && (
              <p className="block text-sm text-red-600 md:text-base">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2.5 pb-8 md:w-full md:pb-6">
            <input
              className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
              type="password"
              placeholder="Contraseña"
              id="password"
              {...register("password")}
            ></input>

            {errors.password && (
              <p className="block text-sm text-red-600 md:text-base">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2.5 pb-14 md:w-full md:pb-16">
            <input
              className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
              type="string"
              placeholder="Nombre de la Empresa"
              id="business"
              {...register("business")}
            ></input>

            {errors.business && (
              <p className="block text-sm text-red-600 md:text-base">
                {errors.business?.message}
              </p>
            )}
          </div>

          <div className="rounded bg-white">
            <button
              className="box-border h-7 w-full rounded border-0 bg-gradient-to-br from-blue-500 to-blue-300 text-center text-base font-medium leading-4 text-white shadow-sm hover:cursor-pointer md:h-9 md:text-base md:font-medium"
              type="submit"
            >
              REGISTRARSE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
