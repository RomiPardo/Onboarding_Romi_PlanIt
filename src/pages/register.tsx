import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { RegisterUserSchema as UserShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/Input";
import Link from "next/link";
import AuthentificationBanner from "~/components/AuthentificationBanner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "~/components/Toast";
import Button from "~/components/Button";

type UserSchemaType = z.infer<typeof UserShema>;

const Register = () => {
  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(UserShema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  const registerMutation = api.user.registerUser.useMutation();

  const signUp = async (user: UserSchemaType) => {
    try {
      await registerMutation.mutateAsync({
        ...user,
      });

      await signIn("credentials", {
        ...user,
        callbackUrl: `http://localhost:3000/`,
      });
    } catch (error) {
      toast.error("Ya existe un usuario con ese mail");
    }
  };

  return (
    <>
      <Toast />

      <AuthentificationBanner>
        <div className="flex flex-grow  flex-col justify-between">
          <div className="ms:w-6/12 flex flex-col px-5 pb-24 pt-7 md:px-32 md:pb-0 md:pt-40">
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
                  placeholder="Email"
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
                  <Button intent="primary" text="REGISTRARSE" />
                </div>
              </form>
            </FormProvider>
          </div>

          <div className="hidden flex-row items-center justify-end gap-5 pr-6 md:flex">
            <Button intent="help" text="¿Necesitás ayuda?">
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
            </Button>

            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-lg ">
              <img rel="logo" src="/registerPage/logo.png" className="" />
            </div>
          </div>
        </div>
      </AuthentificationBanner>

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
