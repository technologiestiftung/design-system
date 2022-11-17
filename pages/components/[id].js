import { getAllComponentIds, getComponentData } from '../../lib/components';
import Head from 'next/head';
import Link from 'next/link';

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
  return(
    <>
      <Head>
        <title>{componentData.name}</title>
      </Head>
      {componentData.name}
      <br />
      {componentData.id}
      <br />
      <div dangerouslySetInnerHTML={{ __html: componentData.contentHtml }} />
      <Link href="/">Back to home</Link>
    </>
  )
};

export default Component;