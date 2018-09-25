//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import AppContentRightColumnContent from './AppContentRightColumnContent'
import UnderConstruction from './UnderConstruction'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectFiles = ({ isActiveTab }) => {
  return (
    <AppContentRightColumnContent isActiveTab={isActiveTab}>
      <UnderConstruction 
        from="ProjectFiles"/>
    </AppContentRightColumnContent>
  )
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default ProjectFiles