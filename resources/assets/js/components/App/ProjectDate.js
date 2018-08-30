//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, shape, string } from 'prop-types'
import ReactCalendar from 'react-calendar'
import styled from 'styled-components'

import dateConfig from './config/date'

import ProjectActivityTile from './ProjectActivityTile'
import TextArea from './TextArea'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectDate = ({ editable, data: { author, createdAt, date, description, project }, id, updateKey, updateProject, user }) => {
  const saveData = {
    id: id,
    type: "DATE",
    data: {
      author: author,
      createdAt: createdAt,
      date: date,
      description: description,
      project: project
    }
  }

  return (
    <ProjectActivityTile
      author={author}
      createdAt={createdAt}
      editable={editable}
      saveData={saveData}
      updateProject={updateProject}
      updateKey={updateKey}>
      <TextArea
        disabled={!editable}
        value={description}
        onChange={(e) => updateProject(updateKey + ".data.description", e.target.value)}/>
      <ReactCalendar 
        value={new Date(date)}
        onChange={(date) => updateProject(updateKey + ".data.date", dateConfig.format(date))}/>
    </ProjectActivityTile>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectDate.propTypes = {
  editable: bool,
  data: shape({
    date: string,
    description: string
  })
}
ProjectDate.defaultProps = {
  editable: false,
  data: {
    date: null,
    description: "Default Description"
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default ProjectDate