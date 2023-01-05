import "../styles/globals.css";
import type { AppProps } from "next/app";
import PlayerLayout from "../components/playerLayout";
import "reset-css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PlayerLayout>
      <Component {...pageProps} />
    </PlayerLayout>
  );
}
