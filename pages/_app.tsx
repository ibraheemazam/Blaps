import "../styles/globals.css";
import type { AppProps } from "next/app";
import PlayerLayout from "../components/playerLayout";
import "reset-css";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {Component.authPage ? (
        <Component {...pageProps} />
      ) : (
      <PlayerLayout>
        <Component {...pageProps} />
      </PlayerLayout>
      )}
    </ChakraProvider>
  );
}
