import { getAllComponentIds, getComponentData } from '../../lib/components';
import { getMDXComponent } from "mdx-bundler/client";

import { useMemo } from "react";
import Head from 'next/head';
import Link from 'next/link';
import { SyntaxHighlighter } from '../../components/SynthaxHighlighter';

export const getStaticProps = async({ params }) => {
  const componentData = await getComponentData(params.id);

  return {
    props: {
      componentData,
    },
  };
}

export const getStaticPaths = () => {
  const paths = getAllComponentIds();
  return {
    paths,
    fallback: false,
  };
}

const Component = ({ componentData }) => {
  const Component = useMemo(
    () => getMDXComponent(componentData.code),
    [componentData.code]
  );

  const components = {
    pre: SyntaxHighlighter,
  };

  return(
    <>
      <h1>Hello world</h1>
      <Head>
        <title>{componentData.name}</title>
      </Head>
      {componentData.name}
      <br />
      {componentData.id}
      <br />
      <Component components={components} />
      <Link href="/">Back to home</Link>
    </>
  )
};

export default Component;