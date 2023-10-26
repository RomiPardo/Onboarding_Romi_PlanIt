import { signIn, useSession } from "next-auth/react";
import Register from "./components/Register";

import { api } from "~/utils/api";
import { useState } from "react";

const Home = () => {
  const { data: session } = useSession();
  const [showRegister, setRegister] = useState(false);

  const { mutate } = api.user.registerUser.useMutation({
    onError(err) {
      const error = err.toString();
      const errors = error.match(/{[^{}]+}/g);
      if (errors !== null) {
        const json = JSON.parse(errors[0]);
        alert(json.message);
      } else {
        alert(err.message);
      }
    },
    onSuccess(user) {
      if (user) {
        setRegister(false);
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
    const newUser = await mutate({
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      business: user.business,
    });
    signIn("credentials", {
      email: user.email,
      password: user.password,
      callbackUrl: `http://localhost:3000/`,
    });
    console.log(session);
  };

  const show = showRegister ? "hidden" : "block";

  if (!session) {
    return (
      <>
        <div>
          <a onClick={(e) => setRegister(true)} className={show}>
            ¡Regístrate aquí!
          </a>
        </div>

        <Register show={showRegister} action={register}></Register>
      </>
    );
  } else {
    return <p>Has iniciado sesion</p>;
  }
};

export default Home;
