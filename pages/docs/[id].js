import { getAllDocIds, getDocData, getSortedDocsData } from '../../lib/docs';
import { getSortedComponentsData } from '../../lib/components';
import Date from '../../components/Date';
import Head from 'next/head';
import Link from 'next/link';

export const getStaticProps = async({ params }) => {
  const docData = await getDocData(params.id);
  const allDocsData = getSortedDocsData();
  const allComponentsData = getSortedComponentsData();

  return {
    props: {
      docData,
      allDocsData,
      allComponentsData
    },
  };
}

export const getStaticPaths = () => {
  const paths = getAllDocIds();
  return {
    paths,
    fallback: false,
  };
}

const Doc = ({ docData }) => {
  return(
    <>
      <Head>
        <title>{docData.name}</title>
      </Head>
      {docData.name}
      <br />
      {docData.id}
      <br />
      <Date dateString={docData.date} />s
      <br />
      <div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
      <Link href="/">Back to home</Link>
    </>
  )
};

export default Doc;