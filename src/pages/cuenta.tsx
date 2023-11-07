import Layout from "~/components/Layout";
import { FormProvider, useForm } from "react-hook-form";
import { EditionUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/Input";
import { api } from "~/utils/api";
import { signOut, useSession } from "next-auth/react";

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
      <main className="bg-light-gray px-32 pb-24 pt-24 font-poppins">
        <h4 className="pb-10 text-4xl font-medium leading-9">
          Información personal
        </h4>

        {session.data?.user && (
          <div className="bg-white">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(editUser)}>
                <div className="flex justify-between px-32 py-20">
                  <div className="w-[467px] text-gray">
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

                  <div className="flex flex-col text-xl font-normal leading-5 text-blue-300">
                    <button
                      className="h-9 text-right hover:cursor-pointer"
                      type="submit"
                    >
                      Editar información
                    </button>

                    <button
                      className="h-9 text-right hover:cursor-pointer"
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
