import { FC } from 'react'
import Link from 'next/link'
import Date from '../components/Date'
import { getSortedDocsData } from '../lib/docs'
import { getSortedComponentsData } from '../lib/components'
import { DocData } from './docs/[id]'
import { ComponentData } from './components/[id]'

export async function getStaticProps() {
  const allDocsData = getSortedDocsData()
  const allComponentsData = getSortedComponentsData()

  return {
    props: {
      allDocsData,
      allComponentsData,
    },  
  }
}

interface HomePageProps {
  allDocsData: DocData[]
  allComponentsData: ComponentData[]
}

const HomePage:FC<HomePageProps> = ({ allDocsData, allComponentsData }) => {
  return (
    <>
      <section>
        <h2>Docs</h2>
        <ul>
          {allDocsData.map(({ id, date, name }) => (
            <li key={id}>
              <Link href={`/docs/${id}`}>{name}</Link>
              <br />
              <small>
                <Date date={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Component Library</h2>
        <ul>
          {allComponentsData.map(({ id, name }) => (
            <li key={id}>
              <Link href={`/components/${id}`}>{name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default HomePage
