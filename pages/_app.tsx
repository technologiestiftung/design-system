import { FC } from 'react'
import '../styles/global.scss'
import Head from 'next/head'
import Layout from '../components/Layout'

const App: FC<{
  Component: FC;
  pageProps: Record<string, unknown>;
}> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>TSB-Design-System</title>
      </Head>
      <Layout data={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App