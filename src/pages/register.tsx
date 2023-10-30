import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { RegisterUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/Input";
import { useEffect, useState } from "react";

type UserSchema = z.infer<typeof userShema>;

const Register = () => {
  const methods = useForm<UserSchema>({
    resolver: zodResolver(userShema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

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

  const [rotation, setRotation] = useState("0deg");

  const updateRotation = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1249) {
      const maxScreen = 1249;
      const minScreen = 393;
      const minRotation = 0;
      const maxRotation = 10.82;
      const rotationAngle =
        screenWidth < 366
          ? 0
          : ((screenWidth - minScreen) / (maxScreen - minScreen)) *
              (minRotation - maxRotation) +
            maxRotation;

      setRotation(rotationAngle + "deg");
    } else {
      setRotation("0deg");
    }
  };

  useEffect(() => {
    updateRotation();
    window.addEventListener("resize", updateRotation);
    return () => {
      window.removeEventListener("resize", updateRotation);
    };
  }, []);

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
    <>
      <main className="flex w-full flex-col md:flex-row">
        <div className="hidden w-6/12 flex-col bg-gradient-to-br from-blue-300 to-blue-500 md:flex">
          <div className="flex flex-col px-32 pb-32 pt-28">
            <div>
              <img
                rel="logo"
                src="/registerPage/logoSecondary.png"
                className="w-40"
              />
            </div>

            <div className="w-4/5 py-10 leading-11">
              <h3 className="text-5xl font-semibold text-white">
                Comienza a simplificar tus acciones,{" "}
                <span className="text-blue-300">aquí.</span>
              </h3>
            </div>

            <div>
              <h6 className="w-11/12 text-xl font-normal leading-5 text-white">
                En nuestra plataforma web vas a encontrar todo lo que estás
                buscando.
              </h6>
            </div>
          </div>

          <div className="relative">
            <img className="relative" src="/registerPage/macBookPro16.png" />
            <img
              rel="planit page in mac book"
              className="top-9.5 pr-1/9 absolute"
              src="/registerPage/design.png"
            />
          </div>
        </div>

        <div className="relative flex h-44 overflow-hidden md:hidden">
          <div
            className="w-125 absolute -left-16 -top-48 h-80 flex-shrink-0 rounded-3xl bg-gradient-to-br from-blue-300 to-blue-500"
            style={{ transform: `rotate(${rotation})` }}
          />

          <div className="relative flex w-full justify-between px-5 pt-12">
            <div>
              <img
                rel="logo"
                src="/registerPage/logoSecondary.png"
                className="w-24"
              />
            </div>

            <div>
              <img
                rel="menu option"
                src="/registerPage/menu.png"
                className="w-11"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="ms:w-6/12 flex flex-col px-5 pt-7 md:px-32 md:pt-40">
            <div className="flex flex-col pb-14">
              <h4 className="w-10/12 pb-5 text-4xl font-semibold leading-10 md:w-full md:pb-10 md:font-medium md:leading-9">
                ¡Bienvenido a Plan IT!
              </h4>

              <p className="w-11/12 pb-4 text-lg font-normal leading-5 md:w-full md:pb-6 md:text-lg">
                Por favor, complete su información personal para crear un
                usuario propio.
              </p>

              <p className="text-sm font-normal leading-normal text-gray md:text-base md:leading-4">
                ¿Ya tenés una cuenta?{" "}
                <a className="text-blue-300">Inicia sesión aquí.</a>
              </p>
            </div>

            <FormProvider {...methods}>
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
                className="pb-24"
              >
                <Input
                  styleInput="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5 md:pb-3 pb-2"
                  styleDiv="flex flex-col gap-y-2.5 pb-8 md:w-full md:pb-6"
                  type="text"
                  placeholder="Nombre"
                  id="name"
                >
                  {errors.name && (
                    <p className="block text-sm text-red-600 md:text-base">
                      {errors.name?.message}
                    </p>
                  )}
                </Input>

                <div className="flex flex-col gap-y-2.5 pb-8 md:w-full md:pb-6">
                  <input
                    className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black pb-2 placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:pb-3 md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
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
                    className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black pb-2 placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:pb-3 md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
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
                    className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black pb-2 placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:pb-3 md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
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
                    className="focus:!important border-b border-l-0 border-r-0 border-t-0 border-solid border-black pb-2 placeholder:border-transparent placeholder:text-base placeholder:font-medium placeholder:leading-normal placeholder:text-black focus:outline-none md:pb-3 md:placeholder:text-lg md:placeholder:font-normal md:placeholder:leading-5"
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
                    className="box-border h-7 w-full rounded border-0 bg-gradient-to-br from-blue-300 to-blue-500 text-center text-base font-medium leading-4 text-white shadow-sm hover:cursor-pointer md:h-9 md:text-base md:font-medium"
                    type="submit"
                  >
                    REGISTRARSE
                  </button>
                </div>
              </form>
            </FormProvider>
          </div>

          <div className="hidden flex-row items-center justify-end gap-5 pr-6 md:flex">
            <button className="flex h-8 w-56 flex-row items-center justify-center gap-3 rounded-xl bg-blue-300 text-base font-normal leading-4 text-white">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="white" />
                </svg>
              </span>
              ¿Necesitás ayuda?
            </button>

            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-lg ">
              <img rel="logo" src="/registerPage/logo.png" className="" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark-blue flex flex-col gap-y-12 px-5 pb-8 md:hidden ">
        <div>
          <img className="h-9" src="/registerPage/logoSecondaryDark.png" />
        </div>

        <div className="flex w-full flex-col items-center justify-between text-xs font-normal leading-normal text-gray">
          <div className="flex w-full flex-grow flex-row items-center justify-between">
            <p className="m-0 ">info@planit.com.uy</p>
            <p className="m-0">Tel: +598 96593615</p>
          </div>

          <hr className="my-2 w-full" />

          <div className="flex w-full flex-grow flex-row items-center justify-between">
            <div className="">
              <p className="m-0">PlanIT, 2021 - All rights reserved</p>
            </div>

            <div className="flex flex-row gap-x-5">
              <img className="h-3" src="/registerPage/facebook.png" />
              <img className="h-3" src="/registerPage/linkedin.png" />
              <img className="h-3" src="/registerPage/twitter.png" />
              <img className="h-3" src="/registerPage/instagram.png" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Register;
