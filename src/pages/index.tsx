import { signIn, signOut, useSession } from "next-auth/react";
import Register from "./components/Register";

import { api } from "~/utils/api";
import { useState } from "react";

const Home = () => {
  const { data: session } = useSession();
  const [showRegister, setShowRegister] = useState(false);

  const registerMutation = api.user.registerUser.useMutation({
    onError(err) {
      alert(err.message);
    },
    async onSuccess(data) {
      if (data.user) {
        setShowRegister(false);
      } else {
        alert("An unexpected error happened");
      }
    },
  });

  const register = async (user: {
    name: string;
    lastName: string;
    email: string;
    business: string;
    password: string;
  }) => {
    try {
      await registerMutation.mutateAsync({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        business: user.business,
      });

      await signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: `http://localhost:3000/`,
      });
    } catch (err) {}
  };

  const logOut = async () => {
    await signOut();
  };

  const show = showRegister ? "hidden" : "block";

  if (!session) {
    return (
      <>
        <div>
          <a onClick={(e) => setShowRegister(true)} className={show}>
            ¡Regístrate aquí!
          </a>
        </div>

        <Register show={showRegister} action={register}></Register>
      </>
    );
  } else {
    return (
      <>
        <p>Has iniciado sesion</p>
        <button onClick={(e) => logOut()}>LogOut</button>
      </>
    );
  }
};

export default Home;
