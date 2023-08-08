import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Layout from "../src/components/commons/layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
