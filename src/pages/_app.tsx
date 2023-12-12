import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { PreOrderWrapper } from "~/contexts/PreOrderContext";
import { SearchFilterWrapper } from "~/contexts/SearchFilterContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SearchFilterWrapper>
      <PreOrderWrapper>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </PreOrderWrapper>
    </SearchFilterWrapper>
  );
};

export default api.withTRPC(MyApp);
