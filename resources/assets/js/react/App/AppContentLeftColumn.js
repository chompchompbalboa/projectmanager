//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentLeftColumn = ({ children }) => {
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
left: calc(${layout.sidebar.width} + ${layout.project.containerPadding});
width: ${layout.project.leftColumnWidth};
height: 100vh;
overflow-y: scroll;
background-color: ${colors.siteBackground};
`

export default AppContentLeftColumn