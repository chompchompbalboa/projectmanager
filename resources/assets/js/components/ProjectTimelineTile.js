//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectTimelineTile = ({ children }) => {
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
  margin-bottom: 1vh;
  width: 100%;
  padding: 2vh;
  background-color: white;
`

export default ProjectTimelineTile