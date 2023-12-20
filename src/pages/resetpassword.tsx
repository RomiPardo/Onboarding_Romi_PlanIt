import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getTrpcHelpers } from "~/server/helper";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Toast from "~/components/Toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema as changePasswordSchema } from "~/server/schemas/userSchema";
import { z } from "zod";
import InputWithLabel from "~/components/InputWithLabel";
import Button from "~/components/Button";
import { api } from "~/utils/api";
import GoBack from "~/components/GoBack";
import { TRPCClientError } from "@trpc/client";

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

type ResetPasswordProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const ResetPassword: NextPage<ResetPasswordProps> = ({ email, timestamp }) => {
  const expirationDate = new Date(timestamp * 1000);
  const currentDate = new Date();
  const router = useRouter();

  const methods = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: email,
      password: "",
      confirmationPassword: "",
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = methods;

  const changePasswordMutation = api.user.changePassword.useMutation();

  const passwordForgottenMutation = api.user.forgotPassword.useMutation();

  const verifyTimestamp = () => {
    if (currentDate > expirationDate && timestamp !== 0) {
      toast.error("El link ha expirado");
    }
  };

  const changePassword = async (passwordData: ChangePasswordSchema) => {
    try {
      if (email === "") {
        await passwordForgottenMutation.mutateAsync({
          email: passwordData.email,
        });

        toast.success("Se le envió un correo con la nueva contraseña");
      } else {
        await changePasswordMutation.mutateAsync({ ...passwordData });

        toast.success("Se ha cambiado la contraseña correctamente");
      }
    } catch (error) {
      error instanceof TRPCClientError
        ? toast.error(error?.message)
        : toast.error("Sucedió un error inesperado");
    }
  };

  const onBack = async () => {
    await router.push("/");
  };

  verifyTimestamp();

  return (
    <>
      <Toast />

      <GoBack showAlways={true} onBack={onBack} />

      <main className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform font-poppins">
        <h4 className="pb-9 text-4xl font-medium leading-9">
          Resetear Contraseña
        </h4>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(changePassword)}>
            <div>
              {email === "" || timestamp === 0 ? (
                <InputWithLabel
                  type="email"
                  placeholder="Ingrese su email"
                  errorMessage={errors.email?.message}
                  intent="primary"
                  {...register("email")}
                />
              ) : (
                <>
                  <InputWithLabel
                    type="password"
                    placeholder="Contraseña"
                    errorMessage={errors.password?.message}
                    intent="primary"
                    {...register("password")}
                  />

                  <InputWithLabel
                    type="password"
                    placeholder="Repetir contraseña"
                    errorMessage={errors.confirmationPassword?.message}
                    intent="primary"
                    {...register("confirmationPassword")}
                  />
                </>
              )}

              <div className="rounded">
                <Button type="submit" intent="primary">
                  CAMBIAR CONTRASEÑA
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </main>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const helpers = await getTrpcHelpers(context);

  const { query } = context;

  const token = query.token as string | undefined;

  if (!token) {
    return {
      props: {
        email: "",
        timestamp: 0,
      },
    };
  }

  const user = await helpers.user.getUserToken.fetch({ token });

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  const jwtSecret = process.env.JWT_SECRET ?? "defaultSecret";

  try {
    const decodedData = jwt.verify(token, jwtSecret) as {
      email: string;
      timestamp: number;
    };

    return {
      props: {
        email: user.email,
        timestamp: decodedData.timestamp,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
};

export default ResetPassword;
