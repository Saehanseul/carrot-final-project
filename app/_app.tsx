import { SWRConfig } from "swr";
import "../global.css";

export default function App({ Component, pageProps }: any) {
  console.log("_app");
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((response) => response.json())
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
