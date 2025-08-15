import { AppProps } from "next/app";
import "@/styles/globals.css";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { fonts } from "../lib/fonts";
import { SWRConfig } from "swr";

const fetcher = (url: string): Promise<unknown> =>
  fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </ChakraProvider>
    </>
  );
}

