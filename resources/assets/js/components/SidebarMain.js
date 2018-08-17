//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import sidebarConfig from '../config/sidebar'

import SidebarMainTile from './SidebarMainTile'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const SidebarMain = ({ activeContent, setActiveContent }) => {

  return (
    <Container>
      <SidebarMainTile
        activeContent={activeContent}
        icon="projects"
        id="PROJECTS"
        setActiveContent={setActiveContent}
        text="Projects"/>
      <SidebarMainTile
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
SidebarMain.propTypes = {
  activeContent: string,
  setActiveContent: func
}
SidebarMain.defaultProps = {
  activeContent: "PROJECTS",
  setActiveContent: () => {console.warn("You need to define a setActive function for SidebarMain to work properly")}
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${sidebarConfig.mainWidth + "vw"};
  height: 100vh;
  background-color: ${sidebarConfig.mainBackgroundColor};
`

export default SidebarMain