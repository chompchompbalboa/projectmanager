//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import sidebarConfig from '../config/sidebar'

import Input from './Input'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectsSidebarSearch = ({ changeSearchValue, searchValue }) => {
  return (
    <Container>
      <Input 
        borderColor={sidebarConfig.activeActiveColor}
        color={sidebarConfig.activeActiveColor}
        backgroundColor="transparent"
        width={"100%"}
        value={searchValue}
        onChange={changeSearchValue}/>
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default ProjectsSidebarSearch