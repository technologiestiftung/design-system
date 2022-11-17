import "../styles/global.scss";
import Layout from '../components/Layout'
import { SyntaxHighlighter } from '../components/SynthaxHighlighter'

const components = {
  code: SyntaxHighlighter,
};

export default function App({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}
