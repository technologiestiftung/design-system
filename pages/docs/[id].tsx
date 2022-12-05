import { FC } from 'react'
//@ts-ignore
import { getAllDocIds, getDocData, getSortedDocsData } from '@lib/docs';
//@ts-ignore
import { getSortedComponentsData } from '@lib/components';
//@ts-ignore
import Date from '@components/Date';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

export interface DocData {
  name?: string
  id: string
  contentHtml: string
  date?:Date
  code: string
  thumbnail?: string
}

export interface DocPageProps {
  docData: DocData
}

export const getStaticProps = async({ params }) => {
  const docData = await getDocData(params.id);
  const allDocsData = getSortedDocsData();
  const allComponentsData = getSortedComponentsData();

  return {
    props: {
      docData,
      allDocsData,
      allComponentsData,
    },
  };
};

export const getStaticPaths = () => {
  const paths = getAllDocIds();
  return {
    paths,
    fallback: false,
  };
};

const HeaderImage = styled.img`
  width: 50%;
  margin: auto;
`;


const DocPage: FC<DocPageProps> = ({ docData }) => {
  return(
    <>
      <Head>
        <title>{docData.name}</title>
      </Head>

      <HeaderImage src={`/${docData.thumbnail}`} />
      <h1>{docData.name}</h1>
      <Date date={docData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
      <Link href="/">Back to home</Link>
    </>
  );
};

export default DocPage;
