import { getAllDocIds, getDocData } from '../../lib/docs';

export const getStaticProps = async({ params }) => {
  const docData = await getDocData(params.id);
  docData.date = JSON.stringify(docData.date)
  console.log("DOC DATA", docData)
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
      {docData.title}
      <br />
      {docData.id}
      <br />
      {docData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
    </>
  )
};

export default Doc;