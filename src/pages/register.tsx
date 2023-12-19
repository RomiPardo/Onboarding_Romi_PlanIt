import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { RegisterUserSchema as UserShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "~/components/InputWithLabel";
import Link from "next/link";
import AuthentificationBanner from "~/components/AuthentificationBanner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "~/components/Toast";
import Button from "~/components/Button";
import Image from "next/image";
import { TRPCClientError } from "@trpc/client";

type UserSchemaType = z.infer<typeof UserShema>;

const Register = () => {
  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(UserShema),
  });
  const {
    formState: { errors },
    handleSubmit,
    register,
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
      error instanceof TRPCClientError
        ? toast.error(error?.message)
        : toast.error("Sucedio un error inesperado");
    }
  };

  return (
    <>
      <Toast />

      <AuthentificationBanner>
        <div className="flex flex-col bg-white md:w-6/12">
          <div className="flex flex-col px-5 pb-24 pt-7 md:px-32 md:pb-14 md:pt-40">
            <div className="flex flex-col pb-14">
              <h4 className="w-10/12 pb-5 text-4xl font-semibold leading-10 md:w-full md:pb-9 md:font-medium md:leading-9">
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
                <InputWithLabel
                  type="text"
                  placeholder="Nombre"
                  errorMessage={errors.name?.message}
                  intent="primary"
                  {...register("name")}
                />

                <InputWithLabel
                  type="text"
                  placeholder="Apellido"
                  errorMessage={errors.lastName?.message}
                  intent="primary"
                  {...register("lastName")}
                />

                <InputWithLabel
                  type="email"
                  placeholder="Email"
                  errorMessage={errors.email?.message}
                  intent="primary"
                  {...register("email")}
                />

                <InputWithLabel
                  type="password"
                  placeholder="Contraseña"
                  errorMessage={errors.password?.message}
                  intent="primary"
                  {...register("password")}
                />

                <InputWithLabel
                  type="string"
                  placeholder="Nombre de la Empresa"
                  errorMessage={errors.business?.message}
                  intent="primary"
                  {...register("business")}
                />

                <div className="rounded bg-white md:pt-5">
                  <Button intent="primary">REGISTRARSE</Button>
                </div>
              </form>
            </FormProvider>
          </div>

          <div className="hidden flex-row items-center justify-end gap-5 pb-6 pr-6 md:flex">
            <Button intent="help" type="button">
              ¿Necesitás ayuda?
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

            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-white shadow-lg">
              <Image
                alt="logo"
                src="/registerPage/logo.png"
                width={28}
                height={42}
              />
            </div>
          </div>
        </div>
      </AuthentificationBanner>

      <footer className="bg-dark-blue flex flex-col gap-y-12 px-5 pb-8 md:hidden ">
        <div>
          <Image
            src="/registerPage/logoSecondaryDark.png"
            alt="logo"
            height={36}
            width={104}
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
                src="/registerPage/facebook.png"
                alt="facebook"
                width={7}
                height={12}
              />

              <Image
                src="/registerPage/linkedin.png"
                alt="linkedin"
                width={13}
                height={12}
              />

              <Image
                src="/registerPage/twitter.png"
                alt="twitter"
                width={14}
                height={12}
              />

              <Image
                src="/registerPage/instagram.png"
                alt="instagram"
                width={12}
                height={12}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Register;
