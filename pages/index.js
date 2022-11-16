import { getSortedDocsData } from '../lib/docs';
import Link from 'next/link';
import Date from '../components/Date';

export async function getStaticProps() {
  const allDocsData = getSortedDocsData();

  return {
    props: {
      allDocsData,
    },
  };
}

const HomePage = ({ allDocsData }) => {
  return ( 
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
  )
}

export default HomePage