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
        if (typeof pushItem.data.project === "undefined") {
          pushItem.data.project = {
            id: activeProject.id
          }
        }
        timeline.push(pushItem)
      })
    }
    return _.orderBy(timeline, 'data.createdAt', 'desc')
  }

  const isItemEditable = (data, editable, user) => {
    if (editable || user.id === data.author.id) {
      return true
    }
    return false
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
        const {
          data,
          editable,
          id,
          type,
          updateKey
        } = timelineItem
        return React.createElement(
          projectDataMap[type].component,
          {
            key: index,
            id: id,
            data: data,
            editable: isItemEditable(data, editable, user),
            updateKey: updateKey,
            updateProject: updateProject,
            user: user
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