import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { PreOrderContextProvider } from "~/contexts/PreOrderContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <PreOrderContextProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </PreOrderContextProvider>
  );
};

export default api.withTRPC(MyApp);
