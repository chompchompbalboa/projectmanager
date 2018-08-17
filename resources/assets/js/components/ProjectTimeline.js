//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'

import projectTimelineMap from '../constants/projectTimelineMap'

import ProjectContentContainer from './ProjectContentContainer'
import ProjectTimelineHeader from './ProjectTimelineHeader'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectTimeline = ({ isActiveTab, activeProject, updateProject }) => {
  return (
    <ProjectContentContainer 
      isActiveTab={isActiveTab}
      padding="0">
      <ProjectTimelineHeader
        activeProject={activeProject} 
        updateProject={updateProject}/>
      {activeProject.timeline.tiles.map((tile, index) => {
        return React.createElement(
          projectTimelineMap[tile.type].component,
          {
            key: index
          }
        )
      })}
    </ProjectContentContainer>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectTimeline.propTypes = {
  isActiveTab: bool,
  activeProject: shape({
    timeline: shape({
      tiles: arrayOf(shape({
        type: string
      }))
    })
  })
}
ProjectTimeline.defaultProps = {
  isActiveTab: true
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``

export default ProjectTimeline