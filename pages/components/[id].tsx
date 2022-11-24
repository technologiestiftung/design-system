import { FC } from 'react'
import { getSortedComponentsData, getAllComponentIds, getComponentData } from '../../lib/components';
import { getMDXComponent } from "mdx-bundler/client";
import { getSortedDocsData } from '../../lib/docs';

import { useMemo } from "react";
import Head from 'next/head';
import Link from 'next/link';
import { SyntaxHighlighter } from '../../components/SynthaxHighlighter';

export interface ComponentMatter {
  name: string,
  date: Date
}

export interface ComponentData {
  id: string
  name?: string
  date?: Date
  contentHtml: string
  code: string
}

export interface ComponentPage {
  data: ComponentData
}

export const getStaticProps = async({ params }) => {
  const data: ComponentData = await getComponentData(params.id); 
  const allDocsData = getSortedDocsData();
  const allComponentsData = getSortedComponentsData();

  return {
    props: {
      data,
      allDocsData,
      allComponentsData
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

const Component: FC<ComponentPage> = ({ data }) => {

  const Component = useMemo(
    () => getMDXComponent(data.code),
    [data.code]
  );

  const components = {
    pre: SyntaxHighlighter,
  };

  return(
    <>
      <h1>Hello world</h1>
      <Head>
        <title>{data.name}</title>
      </Head>
      {data.name}
      <br />
      {data.id}
      <br />
      <Component components={components as any} />
      <Link href="/">Back to home</Link>
    </>
  )
};

export default Component;