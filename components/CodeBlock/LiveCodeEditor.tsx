import { FC } from 'react'
import { Language } from 'prism-react-renderer'
import { theme } from './liveCodeEditorTheme'
import styled from 'styled-components'

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

export const CodeBlockWrapper = styled.div`
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

interface LiveEditorProps {
  code: string,
  language: Language
}

const LiveCodeEditor :FC<LiveEditorProps> = ({ code, language } ) => {
  return (
    <LiveProvider code={ code } language={ language } theme={ theme }>
      <CodeBlockWrapper>
        <LiveEditor />
      </CodeBlockWrapper>
      <LiveError />
      <LivePreview />
    </LiveProvider>
  )
}

export default LiveCodeEditor