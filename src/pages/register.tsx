import { signIn } from "next-auth/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { RegisterUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/Input";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type UserSchema = z.infer<typeof userShema>;

const Register = () => {
  const methods = useForm<UserSchema>({
    resolver: zodResolver(userShema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  const registerMutation = api.user.registerUser.useMutation();

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

  const signUp = async (user: UserSchema) => {
    try {
      await registerMutation.mutateAsync({
        ...user,
      });

      await signIn("credentials", {
        ...user,
        callbackUrl: `http://localhost:3000/`,
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <main className="flex w-full flex-col md:flex-row">
        <div className="hidden w-6/12 flex-col bg-gradient-to-br from-blue-300 to-blue-500 md:flex">
          <div className="flex flex-col px-32 pb-32 pt-28">
            <div>
              <Image
                src="/registerPage/logoSecondary.png"
                alt="planit logo"
                className="w-40"
              />
            </div>

            <div className="w-4/5 py-10 leading-[51.84px]">
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
            <Image
              className="relative"
              src="/registerPage/macBookPro16.png"
              alt="page photo"
            />
            <Image
              alt="planit page in mac book"
              className="absolute top-[2.18rem] pr-[68px]"
              src="/registerPage/design.png"
            />
          </div>
        </div>

        <div className="relative flex h-44 overflow-hidden md:hidden">
          <div
            className="absolute -left-16 -top-48 h-80 w-[125%] flex-shrink-0 rounded-3xl bg-gradient-to-br from-blue-300 to-blue-500"
            style={{ transform: `rotate(${rotation})` }}
          />

          <div className="relative flex w-full justify-between px-5 pt-12">
            <div>
              <Image
                alt="logo"
                src="/registerPage/logoSecondary.png"
                className="w-24"
              />
            </div>

            <div>
              <Image
                alt="menu option"
                src="/registerPage/menu.png"
                className="w-11"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-grow  flex-col justify-between">
          <div className="flex flex-col px-5 pb-24 pt-7 ms:w-6/12 md:px-32 md:pb-0 md:pt-40">
            <div className="flex flex-col pb-14">
              <h4 className="w-10/12 pb-5 text-4xl font-semibold leading-10 md:w-full md:pb-10 md:font-medium md:leading-9">
                ¡Bienvenido a Plan IT!
              </h4>

              <p className="w-11/12 pb-4 text-lg font-normal leading-5 md:w-full md:pb-6 md:text-lg">
                Por favor, complete su información personal para crear un
                usuario propio.
              </p>

              <p className="text-sm font-normal leading-normal text-dark-gray md:text-base md:leading-4">
                ¿Ya tenés una cuenta?{" "}
                <Link href="/login" className="text-blue-300">
                  Inicia sesión aquí.
                </Link>
              </p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(signUp)}>
                <Input
                  type="text"
                  placeholder="Nombre"
                  id="name"
                  errorMessage={errors.name?.message}
                />

                <Input
                  type="text"
                  placeholder="Apellido"
                  id="lastName"
                  errorMessage={errors.lastName?.message}
                />

                <Input
                  type="email"
                  placeholder="Mail"
                  id="email"
                  errorMessage={errors.email?.message}
                />

                <Input
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  errorMessage={errors.password?.message}
                />

                <Input
                  type="string"
                  placeholder="Nombre de la Empresa"
                  id="business"
                  errorMessage={errors.business?.message}
                />

                <div className="rounded bg-white pt-5 md:pt-12">
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
              <Image alt="logo" src="/registerPage/logo.png" className="" />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-dark-blue flex flex-col gap-y-12 px-5 pb-8 md:hidden ">
        <div>
          <Image
            className="h-9"
            src="/registerPage/logoSecondaryDark.png"
            alt="logo"
          />
        </div>

        <div className="flex w-full flex-col items-center justify-between text-xs font-normal leading-normal text-dark-gray">
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
              <Image
                className="h-3"
                src="/registerPage/facebook.png"
                alt="facebook"
              />
              <Image
                className="h-3"
                src="/registerPage/linkedin.png"
                alt="linkedin"
              />
              <Image
                className="h-3"
                src="/registerPage/twitter.png"
                alt="twitter"
              />
              <Image
                className="h-3"
                src="/registerPage/instagram.png"
                alt="instagram"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Register;
