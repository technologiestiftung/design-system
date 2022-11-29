import { FC } from 'react'
import styled from 'styled-components'
import Link from "next/link"
import { ComponentData } from '../../pages/components/[id]'
import { DocData } from '../../pages/docs/[id]'

const Wrapper = styled.section`
  max-width: 10rem;
  margin: auto 4rem;
`

const Navigation = styled.div`
  position: relative;
`

const StyledLinkListItem = styled.li`
  list-style-type: none;
`

interface NavType {
  data: {
    allDocsData: DocData[]
    allComponentsData: ComponentData[]
  }
}

export const Nav: FC<NavType> = ({ data }) => {
  return (
    <Wrapper>
      <Navigation>
        <h3>Docs</h3>
        <ul>
          {
          data.allDocsData 
          ? data.allDocsData.map((link, index) => {
            return (
              <StyledLinkListItem key={index}>
                <Link href={`/docs/${link.id}`}>{link.name}</Link>
              </StyledLinkListItem>
            )
          })
          : <h4>loading...</h4>
        }
        </ul>
        <h3>Docs</h3>
        <ul>
          {
          data.allComponentsData 
          ? data.allComponentsData.map((link, index) => {
            return (
              <StyledLinkListItem key={index}>
                <Link href={`/components/${link.id}`}>{link.name}</Link>
              </StyledLinkListItem>
            )
          })
          : <h4>loading...</h4>
        }
        </ul>
        
      </Navigation>
    </Wrapper>
  )
}