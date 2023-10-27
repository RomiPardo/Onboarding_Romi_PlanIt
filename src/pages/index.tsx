import { signOut, useSession } from "next-auth/react";

import Link from "next/link";

const Home = () => {
  const { data: session } = useSession();

  const logOut = async () => {
    await signOut();
  };

  if (!session) {
    return (
      <main className="font-poppins">
        <div>
          <Link href="/register">¡Regístrate aquí!</Link>
        </div>
      </main>
    );
  } else {
    return (
      <main className="font-poppins">
        <p>Has iniciado sesion</p>
        <button onClick={(e) => logOut()}>LogOut</button>
      </main>
    );
  }
};

export default Home;
