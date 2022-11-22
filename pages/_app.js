import "../styles/global.scss";
import Head from "next/head";
import Layout from '../components/Layout'

export default function App({ 
  Component, 
  pageProps,
}) {

  return (
    <>
      <Head>
        <title>TSB-Design-System</title>
      </Head>
        <Layout data={pageProps}>
          <Component {...pageProps} />
        </Layout>
    </>
  );
}
