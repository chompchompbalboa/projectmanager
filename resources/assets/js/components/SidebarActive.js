//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import sidebarConfig from '../config/sidebar'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SidebarActive = ({ children }) => {
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
  padding: 0 ${(sidebarConfig.activeWidth / 15) + "vw"};
  position: fixed;
  top: 0;
  left: ${sidebarConfig.mainWidth + "vw"};
  width: ${sidebarConfig.activeWidth + "vw"};
  height: 100vh;
  overflow-y: scroll;
  background-color: ${sidebarConfig.activeBackgroundColor};
  color: ${sidebarConfig.activeActiveColor};
`

export default SidebarActive