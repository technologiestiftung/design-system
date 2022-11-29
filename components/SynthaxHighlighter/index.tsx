import { FC } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import styled from 'styled-components'
import { theme } from './styles'

const CodeBlockContainer = styled.div`
  position: relative;
  margin-top: 48px;
  margin-bottom: 60px;
  transition: all 200ms ease-in 0s;
`

const PreBlock = styled.pre`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  outline-offset: 2px;
  overflow-x: auto;
  margin-left: -32px;
  margin-right: -32px;
  padding: 32px;
  min-height: 50px;
  border: 1px solid rgba(230, 230, 230, 1);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  max-width: calc(100% + 64px);
  background: darkslategrey;
`
interface CodeBlock {
  children: {
    props: {
      className?: string
      children?: string
    }
  }
  live?: boolean
  fileName?: string
}

export const SyntaxHighlighter: FC<CodeBlock> = ({ children, live, fileName}) => {

  console.log("COMPONENT_PROPS", live, fileName)
  const code = children.props.children
  const language = children.props.className?.replace('language-', '').trim()

  return (
    <Highlight {...defaultProps} code={code} theme={theme as any} language={language as Language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeBlockContainer>
          <PreBlock className={className} style={{ ...style }}>
            {tokens.slice(0, -1).map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, i) => (
                  <span key={i} {...getTokenProps({ token, i })} />
                ))}
              </div>
            ))}
          </PreBlock>
        </CodeBlockContainer>
      )}
    </Highlight>
  )
}
