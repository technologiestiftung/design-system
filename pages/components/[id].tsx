import { FC } from 'react'
import { getMDXComponent } from "mdx-bundler/client";
import { getSortedComponentsData, getAllComponentIds, getComponentData } from '../../lib/components';
import { getSortedDocsData } from '../../lib/docs';
import { CodeBlock } from '../../components/CodeBlock';

import { useMemo } from "react";
import Head from 'next/head';
import Link from 'next/link';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export interface ComponentData {
  id: string
  name?: string
  date?: Date
  contentHtml: string
  code: string
}

export interface ComponentPageProps {
  data: ComponentData
}

export const getStaticProps = async({ params }: Params) => {
  const data = await getComponentData(params.id);
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

const ComponentPage: FC<ComponentPageProps> = ({ data }) => {

  const Component = useMemo(
    () => getMDXComponent(data.code),
    [data.code]
  );

  const components = {
    pre: CodeBlock,
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

export default ComponentPage;