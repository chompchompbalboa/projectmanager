//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectContentContainer = ({ backgroundColor, isActiveTab, padding, children }) => {
  return (
    <Container 
      backgroundColor={backgroundColor}
      isActiveTab={isActiveTab}
      padding={padding}>
      { children }
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectContentContainer.propTypes = {
  backgroundColor: string,
  isActiveTab: bool,
  padding: string
}
ProjectContentContainer.defaultProps = {
  backgroundColor: "transparent",
  isActiveTab: false,
  padding: "2vh"
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: ${props => props.isActiveTab ? "block" : "none"};
  padding: ${props => props.padding};
  width: 100%;
  background-color: ${props => props.backgroundColor};
`

export default ProjectContentContainer