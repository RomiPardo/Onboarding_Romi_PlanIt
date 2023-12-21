import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { LoginUserSchema as UserShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputWithLabel from "~/components/InputWithLabel";
import Link from "next/link";
import AuthentificationBanner from "~/components/AuthentificationBanner";
import Toast from "~/components/Toast";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "~/components/Button";
import Image from "next/image";

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

  const router = useRouter();

  const login = async (user: UserSchemaType) => {
    const res = await signIn("credentials", {
      ...user,
      redirect: false,
    });

    if (res?.status !== 200) {
      toast.error("La contraseña y/o email ingresados son incorrectos");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <Toast />

      <AuthentificationBanner>
        <div className="flex flex-col bg-white md:w-6/12">
          <div className="flex flex-col p-56 px-5 pt-7 md:px-32 md:pb-34 md:pt-56">
            <div className="flex flex-col pb-12 md:pb-20">
              <h4 className="w-10/12 pb-5 text-4xl font-semibold leading-10 md:w-full md:pb-9 md:font-medium md:leading-9">
                ¡Hola, otra vez!
              </h4>

              <p className="w-4/5 text-lg font-normal leading-5 md:w-full md:text-lg">
                Por favor, confirma tu información para ingresar a Plan IT.
              </p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(login)}>
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

                <div className="flex flex-row gap-3 pb-16 md:pb-20">
                  <input type="checkbox" id="remember" />

                  <p className="flex flex-grow">Recordar mi información</p>
                </div>

                <div className="rounded bg-white pb-5 md:pb-4 ">
                  <Button intent="primary">INICIAR SESIÓN</Button>
                </div>

                <div className="flex flex-col items-center justify-center gap-y-2">
                  <p className="text-sm font-normal leading-normal text-gray md:text-base md:leading-4">
                    ¿No tienes una cuenta aún?{" "}
                  </p>

                  <Link href="/register" className="text-blue-300">
                    ¡Regístrate aquí!
                  </Link>

                  <Link
                    href="/resetpassword"
                    className="text-blue-300 hover:cursor-pointer"
                  >
                    Olvidé mi contraseña
                  </Link>
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
