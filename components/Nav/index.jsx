import styled from 'styled-components'
import Link from 'next/link'

const Wrapper = styled.section`
  max-width: 10rem;
`

const Navigation = styled.div`
  position: relative;
`

const StyledLinkListItem = styled.li`
  list-style-type: none;
`

const linkList = [
  "Docs",
  "Components",
  "Best Practices",
  "Wiki",
  "etc"
]

export const Nav = () => {
  return (
    <Wrapper>
      <Navigation>
        <ul>
          {linkList.map((link, index) => {
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