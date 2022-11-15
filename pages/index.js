import { getSortedDocsData } from '../lib/docs';

export async function getStaticProps() {
  const allDocsData = getSortedDocsData();
  
  //Clean Date data
  allDocsData.map(dataPoint => dataPoint.date = dataPoint.date.toString())

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
            <li key={id}>
              {name}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
  )
}

export default HomePage