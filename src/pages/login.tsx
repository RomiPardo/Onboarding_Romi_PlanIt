import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { LoginUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/Input";
import Link from "next/link";
import AuthentificationBanner from "~/components/AuthentificationBanner";
import Toast from "~/components/Toast";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserSchema = z.infer<typeof userShema>;

const Register = () => {
  const methods = useForm<UserSchema>({
    resolver: zodResolver(userShema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  const router = useRouter();

  const login = async (user: UserSchema) => {
    const res = await signIn("credentials", {
      ...user,
      redirect: false,
    });

    if (res?.status !== 200) {
      toast.error("La contraseña y/o email ingresados fueron incorrectos");
    } else {
      router.replace("/");
    }
  };

  return (
    <>
      <Toast />

      <AuthentificationBanner>
        <div className="flex flex-grow  flex-col justify-between">
          <div className="ms:w-6/12 flex flex-col px-5 pb-24 pt-7 md:px-32 md:pb-0 md:pt-56">
            <div className="flex flex-col pb-14">
              <h4 className="w-10/12 pb-5 text-4xl font-semibold leading-10 md:w-full md:pb-10 md:font-medium md:leading-9">
                ¡Hola, otra vez!
              </h4>

              <p className=" pb-4 text-lg font-normal leading-5 md:w-full md:pb-6 md:text-lg">
                Por favor, confirma tu información para ingresar a Plan IT.
              </p>
            </div>

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(login)}>
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

                <div className="flex flex-row gap-3 pb-16 md:pb-20">
                  <input type="checkbox" id="remember" />

                  <p className="flex flex-grow">Recordar mi información</p>
                </div>

                <div className="rounded bg-white pb-5 md:pb-4 ">
                  <button
                    className="box-border h-7 w-full rounded border-0 bg-gradient-to-br from-blue-300 to-blue-500 text-center text-base font-medium leading-4 text-white shadow-sm hover:cursor-pointer md:h-9 md:text-base md:font-medium"
                    type="submit"
                  >
                    INICIAR SESIÓN
                  </button>
                </div>

                <div className="flex flex-col items-center justify-center gap-y-2">
                  <p className="text-sm font-normal leading-normal text-gray md:text-base md:leading-4">
                    ¿No tienes una cuenta aún?{" "}
                  </p>

                  <Link href="/register" className="text-blue-300">
                    ¡Regístrate aquí!
                  </Link>
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
