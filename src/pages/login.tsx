import { signIn } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { LoginUserSchema as userShema } from "~/server/schemas/userSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/components/Input";
import Link from "next/link";
import AuthentificationBanner from "~/components/AuthentificationBanner";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/navigation";

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
      alert("Contraseña o Email fueron igresados incorrectamente");
    } else {
      alert("Se ha iniciado sesion correctamente");
      router.replace("/");
    }
  };

  return (
    <main className="font-poppins">
      <div>
        <Link href="/register">¡Regístrate aquí!</Link>
      </div>
    </main>
  );
};

export default Register;
