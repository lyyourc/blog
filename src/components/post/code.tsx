import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const MyCodeComponent = ({ children, ...props }: { children: any }) => (
  <LiveProvider code={children}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
)

export default MyCodeComponent
