import Layout from "~/components/Layout";
import { FormProvider, useForm } from "react-hook-form";
import { NewUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/Input";
import { api } from "~/utils/api";
import { signIn, signOut, useSession } from "next-auth/react";

type UserSchema = z.infer<typeof userShema>;

const Acount = () => {
  const methods = useForm<UserSchema>({
    resolver: zodResolver(userShema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  const session = useSession();
  const updateMutation = api.user.updateUser.useMutation();

  const editUser = async (user: UserSchema) => {
    try {
      await updateMutation.mutateAsync({
        ...user,
        oldEmail: session.data?.user.email ? session.data?.user.email : "",
      });
    } catch (error) {
      alert(error);
    }
  };

  const logOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <Layout>
      <main className="ms:px-32 ms:pb-24 ms:pt-24 bg-light-gray px-5 pb-36 pt-10 font-poppins">
        <h4 className="ms:text-4xl ms:leading-9 pb-10 text-lg font-medium leading-normal">
          Información personal
        </h4>

        {session.data?.user && (
          <div className="ms:bg-white">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(editUser)}>
                <div className="ms:flex-row ms:px-32 ms:py-20 flex flex-col justify-between">
                  <div className="ms:w-[467px] w-full pb-6 text-gray">
                    <label className="text-xs font-normal">Email</label>

                    <Input
                      type="email"
                      value={session.data?.user.email}
                      id="email"
                      errorMessage={errors.email?.message}
                      intent="secondary"
                    />

                    <label className="text-xs font-normal">Nombre</label>

                    <Input
                      type="text"
                      value={
                        session.data?.user.name +
                        " " +
                        session.data?.user.lastName
                      }
                      id="completeName"
                      errorMessage={errors.completeName?.message}
                      intent="secondary"
                    />

                    <label className="text-xs font-normal">
                      Número de contacto
                    </label>

                    <Input
                      type="string"
                      value={session.data?.user.contactNumber}
                      id="contactNumber"
                      intent="secondary"
                      errorMessage={errors.contactNumber?.message}
                    />

                    <label className="text-xs font-normal">Contraseña</label>

                    <Input
                      type="password"
                      placeholder="•••••••••••••••••••"
                      id="password"
                      errorMessage={errors.password?.message}
                      intent="secondary"
                    />
                  </div>

                  <div className="ms:text-xl ms:leading-5 flex flex-col text-sm font-normal leading-normal text-blue-300">
                    <button
                      className="ms:text-right h-9 text-left hover:cursor-pointer"
                      type="submit"
                    >
                      Editar información
                    </button>

                    <button
                      className="ms:text-right h-9 text-left hover:cursor-pointer"
                      onClick={logOut}
                    >
                      Cerrar cuenta
                    </button>
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

export default Acount;
