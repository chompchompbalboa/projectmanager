//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentRightColumn = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
position: fixed;
top: calc(${layout.project.tabsHeight} + ${layout.project.containerPadding});
left: calc(${layout.sidebar.width} + ${layout.project.containerPadding} + ${layout.project.leftColumnWidth} + ${layout.project.containerPadding});
width: calc(100vw - ${layout.sidebar.width} - ${layout.project.containerPadding} - ${layout.project.leftColumnWidth} - ${layout.project.containerPadding} - ${layout.project.containerPadding});
height: calc(100vh - ${layout.project.tabsHeight} - ${layout.project.containerPadding} - ${layout.project.containerPadding});
overflow-y: scroll;
background-color: ${colors.siteBackground};
`

export default AppContentRightColumn