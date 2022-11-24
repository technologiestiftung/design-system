import styled from 'styled-components'
import { Nav } from '../Nav'
import { Footer } from '../Footer'

const PageWrapper = styled.section`
  display: grid;
  grid-template-areas:
    'nav main'
    'footer footer';
`

const NavWrapper = styled.div`
  grid-area: nav;
`

const MainWrapper = styled.div`
  grid-area: main;
`

const FooterWrapper = styled.div`
  grid-area: footer;
`

export default function Layout({ children, data }) {
  return (
    <PageWrapper>
      <NavWrapper>
        <Nav data={data} />
      </NavWrapper>
      <MainWrapper>
        <main>{children}</main>
      </MainWrapper>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </PageWrapper>
  )
}
