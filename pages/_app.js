import "../styles/global.scss";
import Head from "next/head";
import Layout from '../components/Layout'
import { NavigationContextProvider } from '../context/state'

export default function App({ 
  Component, 
  pageProps,
}) {

  return (
    <>
      <Head>
        <title>TSB-Design-System</title>
      </Head>
      <NavigationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NavigationContextProvider>
    </>
  );
}
