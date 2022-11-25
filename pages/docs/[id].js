import { getAllDocIds, getDocData, getSortedDocsData } from '../../lib/docs';
import { getSortedComponentsData } from '../../lib/components';
import Date from '../../components/Date';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

export const getStaticProps = async ({ params }) => {
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

const Doc = ({ docData }) => {
  return (
    <>
      <Head>
        <title>{docData.name}</title>
      </Head>
      <HeaderImage src={`/${docData.thumbnail}`} />
      <h1>{docData.name}</h1>
      <Date dateString={docData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
      <Link href="/">Back to home</Link>
    </>
  );
};

export default Doc;
