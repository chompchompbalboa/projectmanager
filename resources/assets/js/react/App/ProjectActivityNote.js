//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, shape, string } from 'prop-types'
import styled from 'styled-components'

import ProjectActivityTile from './ProjectActivityTile'
import TextArea from './TextArea'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectNote = ({ editable, data: { author, createdAt, note, project }, id, updateKey, updateProject, user }) => {

  const saveData = {
    id: id,
    type: "NOTE",
    data: {
      author: author,
      createdAt: createdAt,
      note: note,
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
        value={note}
        onChange={(e) => updateProject(updateKey + ".data.note", e.target.value)}/>
    </ProjectActivityTile>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectNote.propTypes = {
  editable: bool,
  data: shape({
    note: string
  })
}
ProjectNote.defaultProps = {
  editable: false,
  data: {
    note: "Default Note"
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`

export default ProjectNote