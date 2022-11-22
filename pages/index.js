import Link from 'next/link';
import Date from '../components/Date';
import { getSortedDocsData } from '../lib/docs';
import { getSortedComponentsData } from '../lib/components';

export async function getStaticProps() {
  const allDocsData = getSortedDocsData();
  const allComponentsData = getSortedComponentsData();

  return {
    props: {
      allDocsData,
      allComponentsData,
    },
  };
}

const HomePage = ({ allDocsData, allComponentsData }) => {

  return ( 
    <>
      <section>
        <h2>Docs</h2>
        <ul>
          {allDocsData.map(({ id, date, name }) => (
            <li  key={id}>
              <Link href={`/docs/${id}`}>{name}</Link>
              <br />
              <small>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Component Library</h2>
        <ul>
          {allComponentsData.map(({ id, name }) => (
            <li  key={id}>
              <Link href={`/components/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default HomePage