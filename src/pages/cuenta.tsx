import Layout from "~/components/Layout";
import { FormProvider, useForm } from "react-hook-form";
import { NewUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { signOut, useSession } from "next-auth/react";
import Input from "~/components/Input";

type UserSchema = z.infer<typeof userShema>;

const Acount = () => {
  const methods = useForm<UserSchema>({
    resolver: zodResolver(userShema),
  });
  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  const { data: session, update } = useSession();

  const updateMutation = api.user.updateUser.useMutation();

  const editUser = async (user: UserSchema) => {
    try {
      await updateMutation.mutateAsync({
        ...user,
        oldEmail: session?.user.email ? session?.user.email : "",
      });

      await update();
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

        {session?.user && (
          <div className="ms:bg-white">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(editUser)}>
                <div className="ms:flex-row ms:px-32 ms:py-20 flex flex-col justify-between">
                  <div className="ms:w-[467px] w-full pb-6 text-gray">
                    <Input
                      label="Email"
                      type="email"
                      value={session?.user.email}
                      id="email"
                      errorMessage={errors.email?.message}
                      intent="secondary"
                    />

                    <Input
                      label="Nombre"
                      type="text"
                      value={session?.user.name}
                      id="name"
                      errorMessage={errors.name?.message}
                      intent="secondary"
                    />

                    <Input
                      label="Apellido"
                      type="text"
                      value={session?.user.lastName}
                      id="lastName"
                      errorMessage={errors.lastName?.message}
                      intent="secondary"
                    />

                    <Input
                      label="Número de contacto"
                      type="string"
                      value={session?.user.contactNumber}
                      id="contactNumber"
                      intent="secondary"
                      errorMessage={errors.contactNumber?.message}
                    />

                    <Input
                      label="Contraseña"
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
