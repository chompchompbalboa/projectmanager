//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'

import SidebarTile from './SidebarTile'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Sidebar = ({ activeContent, setActiveContent }) => {

  return (
    <Container>
      <SidebarTile
        activeContent={activeContent}
        icon="business"
        id="BUSINESS"
        setActiveContent={setActiveContent}
        text="Business"/>
      <SidebarTile
        activeContent={activeContent}
        icon="projects"
        id="PROJECTS"
        setActiveContent={setActiveContent}
        text="Projects"/>
      <SidebarTile
        activeContent={activeContent}
        icon="settings"
        id="SETTINGS"
        setActiveContent={setActiveContent}
        text="Settings"/>
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Sidebar.propTypes = {
  activeContent: string,
  setActiveContent: func
}
Sidebar.defaultProps = {
  activeContent: "PROJECTS",
  setActiveContent: () => {console.warn("You need to define a setActive function for Sidebar to work properly")}
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: ${layout.sidebar.width};
  height: 100vh;
  background-color: ${colors.sidebar.background};
`

export default Sidebar