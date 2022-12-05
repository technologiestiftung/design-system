import { FC } from 'react'
import { Language } from 'prism-react-renderer'
import SynthaxHighlighter from './SynthaxHighlighter'
import LiveCodeEditor from './LiveCodeEditor'

interface CodeBlockProps {
  children: {
    props: {
      className?: string
      children?: string
    }
  }
  live?: boolean
  fileName?: string
}

export const CodeBlock: FC<CodeBlockProps> = ({ children, live, fileName}) => {
  const code = children.props.children
  const language = children.props.className?.replace('language-', '').trim()


  return (
    <>
      { fileName && <span>{fileName}</span>}
      {
        live
        ? <SynthaxHighlighter code={ code } language={ language as Language }/>
        : <LiveCodeEditor code={ code } language={ language as Language }/>
      }
    </>
  )
}
