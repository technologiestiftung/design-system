import styled from 'styled-components'
import Link from "next/link"

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

export const Nav = ({routerData}) => {

  return (
    <Wrapper>
      <Navigation>
        <h3>Docs</h3>
        <ul>
          {
          routerData.allDocsData 
          ? routerData.allDocsData.map((link, index) => {
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
          routerData.allComponentsData 
          ? routerData.allComponentsData.map((link, index) => {
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