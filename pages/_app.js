import "../styles/global.css";
import { MDXProvider } from "@mdx-js/react";

const InlineCode = ({children}) => (
  <div style={{ background: "black", color: "green", padding: "1rem"}}>{children}</div>
)

const components = {
  code: InlineCode,
};

export default function App({ Component, pageProps }) {
  return (
    <MDXProvider components={components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}
