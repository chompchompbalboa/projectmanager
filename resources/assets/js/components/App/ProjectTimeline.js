//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import projectDataMap from './constants/projectDataMap'

import ProjectContentContainer from './ProjectContentContainer'
import ProjectTimelineHeader from './ProjectTimelineHeader'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectTimeline = ({ isActiveTab, activeProject, updateProject, user }) => {

  const timeline = () => {
    let timeline = []
    for (let type in activeProject.data) {
      activeProject.data[type].map((timelineItem, index) => {
        let pushItem = Object.assign({}, timelineItem)
        pushItem.updateKey = "data." + type + "." + index
        timeline.push(pushItem)
      })
    }
    return _.orderBy(timeline, 'data.createdAt', 'desc')
  }

  return (
    <ProjectContentContainer 
      isActiveTab={isActiveTab}
      padding="0">
      <ProjectTimelineHeader
        activeProject={activeProject} 
        updateProject={updateProject}
        user={user}/>
      {timeline().map((timelineItem, index) => {
        return React.createElement(
          projectDataMap[timelineItem.type].component,
          {
            key: index,
            data: timelineItem.data,
            editable: (timelineItem.editable ? true : false),
            updateKey: timelineItem.updateKey,
            updateProject: updateProject
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