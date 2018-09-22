//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, string } from 'prop-types'
import styled from 'styled-components'

import layout from './config/layout'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectContentContainer = ({ alignItems, backgroundColor, flexDirection, isActiveTab, justifyContent, padding, children }) => {
  return (
    <Container 
      alignItems={alignItems}
      backgroundColor={backgroundColor}
      flexDirection={flexDirection}
      isActiveTab={isActiveTab}
      justifyContent={justifyContent}
      padding={padding}>
      { isActiveTab && children }
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectContentContainer.propTypes = {
  alignItems: string,
  backgroundColor: string,
  isActiveTab: bool,
  justifyContent: string,
  padding: string,
}
ProjectContentContainer.defaultProps = {
  alignItems: "flex-start",
  backgroundColor: "transparent",
  flexDirection: "row",
  isActiveTab: false,
  justifyContent: "flex-start",
  padding: "0"
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: ${props => props.isActiveTab ? "flex" : "none"};
  padding: ${props => props.padding};
  width: 100%;
  height: 100%;
  flex-direction: ${props => props.flexDirection};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  background-color: ${props => props.backgroundColor};
  overflow: hidden;
`

export default ProjectContentContainer