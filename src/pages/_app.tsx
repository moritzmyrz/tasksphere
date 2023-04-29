import { ChakraProvider } from "@chakra-ui/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { api } from "~/utils/api";

const inter = Inter({ subsets: ["latin"] });

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
