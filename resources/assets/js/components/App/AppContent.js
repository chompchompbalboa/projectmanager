//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContent = ({ isActiveContent, children }) => {
  return (
    <Container isActiveContent={isActiveContent}>
      {children}
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: ${props => props.isActiveContent ? "block" : "none"};
`

export default AppContent