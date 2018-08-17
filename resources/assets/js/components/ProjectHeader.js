//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { number, shape, string } from 'prop-types'
import styled from 'styled-components'

import projectsConfig from '../config/projects'
import sidebarConfig from '../config/sidebar'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectContentHeader = ({ project }) => {
  return (
    <Container>
      <Info>
        {project.code} - {project.name}
      </Info>
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectContentHeader.propTypes = {
  project: shape({
    id: number,
    code: string,
    name: string
  })
}
ProjectContentHeader.defaultProps = {
  project: {
    id: 0,
    code: "000000",
    name: "Default Project"
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: ${projectsConfig.headerHeight};
  padding: 0 ${projectsConfig.containerPadding};
  background-color: white;
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${projectsConfig.headerBorderColor};
`

const Info = styled.div`
  font-size: 1.1em;
  font-weight: bold;
`

export default ProjectContentHeader