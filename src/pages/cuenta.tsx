import Layout from "~/components/Layout";
import { FormProvider, useForm } from "react-hook-form";
import { NewUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { signOut, useSession } from "next-auth/react";
import InputWithLabel from "~/components/InputWithLabel";
import Toast from "~/components/Toast";
import { toast } from "react-toastify";
import Button from "~/components/Button";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

type UserSchema = z.infer<typeof userShema>;

type AcountProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Acount: NextPage<AcountProps> = ({ defaultValues }) => {
  const { data: session, update } = useSession();

  const methods = useForm<UserSchema>({
    mode: "onChange",
    resolver: zodResolver(userShema),
    defaultValues,
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  const updateMutation = api.user.updateUser.useMutation({
    onError(error) {
      toast.error(error.message);
    },
    async onSuccess() {
      await update();
    },
  });

  const editUser = (user: UserSchema) => {
    updateMutation.mutate({
      ...user,
      oldEmail: session?.user.email ? session?.user.email : "",
    });
  };

  const logOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Layout>
      <main className="bg-light-gray px-5 pb-36 pt-10 font-poppins ms:px-32 ms:pb-24 ms:pt-24">
        <h4 className="pb-10 text-lg font-medium leading-normal ms:text-4xl ms:leading-9">
          Información personal
        </h4>

        {session?.user && (
          <div className="ms:bg-white">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(editUser)}>
                <div className="flex flex-col justify-between ms:flex-row ms:px-32 ms:py-20">
                  <div className="w-full pb-6 text-gray ms:w-[467px]">
                    <InputWithLabel
                      label="Email"
                      type="email"
                      errorMessage={errors.email?.message}
                      intent="secondary"
                      {...register("email")}
                    />

                    <InputWithLabel
                      label="Nombre"
                      type="text"
                      errorMessage={errors.name?.message}
                      intent="secondary"
                      {...register("name")}
                    />

                    <InputWithLabel
                      label="Apellido"
                      type="text"
                      errorMessage={errors.lastName?.message}
                      intent="secondary"
                      {...register("lastName")}
                    />

                    <InputWithLabel
                      label="Número de contacto"
                      type="string"
                      intent="secondary"
                      errorMessage={errors.contactNumber?.message}
                      {...register("contactNumber")}
                    />

                    <InputWithLabel
                      label="Contraseña"
                      type="password"
                      placeholder="•••••••••••••••••••"
                      errorMessage={errors.password?.message}
                      intent="secondary"
                      {...register("password")}
                    />
                  </div>

                  <div className="flex flex-col text-sm font-normal leading-normal text-blue-300 ms:text-xl ms:leading-5">
                    <Button intent="edition">Editar información</Button>

                    <Button intent="edition" onClick={logOut}>
                      Cerrar cuenta
                    </Button>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        )}
      </main>
    </Layout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return {
    props: {
      defaultValues: {
        email: session?.user.email,
        name: session?.user.name,
        lastName: session?.user.lastName,
        contactNumber: session?.user.contactNumber ?? "",
      },
    },
  };
};

export default Acount;
