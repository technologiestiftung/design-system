import { getAllDocIds, getDocData } from '../../lib/docs';
import Date from '../../components/Date';
import Head from 'next/head';

export const getStaticProps = async({ params }) => {
  const docData = await getDocData(params.id);

  return {
    props: {
      docData,
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
      <Date dateString={docData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
    </>
  )
};

export default Doc;