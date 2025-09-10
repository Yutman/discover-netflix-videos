import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";
import "../styles/globals.css";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleLoggedIn = async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn();
        // If on login page and already logged in, send to home
        if (router.pathname === "/login") {
          if (isLoggedIn) router.push("/");
          return;
        }

        // On any other page, require login
        if (!isLoggedIn) router.push("/login");
      } catch (error) {
        console.error('Error checking login status:', error);
        router.push("/login");
      }
    };
    handleLoggedIn();
  }, [router]);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    const handleError = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;