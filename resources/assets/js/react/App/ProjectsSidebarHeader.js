//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import sidebarConfig from './config/sidebar'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectsSidebarHeader = ({ header, icon, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Header>
        {header}
      </Header>
      <Icon 
        color="white"
        icon={icon}
        size="1em"/>
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  user-select: none;
  padding: 1vh;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  background-color: ${sidebarConfig.activeActiveBackgroundColor};
`

const Header = styled.div``

export default ProjectsSidebarHeader