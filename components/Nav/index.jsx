import { useContext } from 'react';
import styled from 'styled-components'
import Link from 'next/link'
import { useNavigationContext } from '../../context/state'

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
const linklist = ["some", "strings"]



export const Nav = () => {

  const docIds = useNavigationContext();
  console.log(docIds)
  



  return (
    <Wrapper>
      <Navigation>
        <ul>
          {linklist.map((link, index) => {
            return (
              <StyledLinkListItem key={index}>
                <Link href="/">{link}</Link>
              </StyledLinkListItem>
            )
          })}
        </ul>
      </Navigation>
    </Wrapper>
  )
}