import "../styles/globals.css";
import { type AppType } from "next/app";
import { Inter } from "@next/font/google";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes"
import { api } from "../utils/api";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",

});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-inter: ${inter.style.fontFamily};
				}
			}`}</style>
      <SessionProvider session={session}>
        <ThemeProvider>
          <div
            className={`${inter.variable} font-sans selection:bg-fuchsia-400 selection:text-white min-h-screen relative bg-background text-foreground dark:bg-foreground dark:text-background`}
          >
            <Component {...pageProps} />
            <Toaster />
          </div>
        </ThemeProvider>
      </SessionProvider>
    </>

  );
};

export default api.withTRPC(MyApp);
