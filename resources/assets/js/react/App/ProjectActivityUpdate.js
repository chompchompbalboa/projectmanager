//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, shape, string } from 'prop-types'
import styled from 'styled-components'

import ProjectActivityTile from './ProjectActivityTile'
import ProjectActivityTextarea from './ProjectActivityTextarea'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectActivityUpdate extends Component {

  state = {
    text: this.props.data.text
  }

  render() {
    const { 
      data: { 
        author, 
        createdAt, 
        project 
      }, 
      id, 
      isEditable, 
      isFocused,
      ...props
    } = this.props
    
    const {
      text
    } = this.state

    const tileData = {
      id: id,
      type: "UPDATE",
      data: {
        author: author,
        createdAt: createdAt,
        text: text,
        project: project
      }
    }

    return (
      <ProjectActivityTile
        icon="update"
        isEditable={isEditable}
        message="wrote an update"
        tileData={tileData}
        to={null}
        {...props}>
        <ProjectActivityTextarea
          focus={isFocused}
          disabled={!isEditable}
          value={text}
          onChange={(e) => this.setState({ text: e.target.value })}/>
      </ProjectActivityTile>
    )
  }
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectActivityUpdate.propTypes = {
  isEditable: bool,
  data: shape({
    text: string
  })
}
ProjectActivityUpdate.defaultProps = {
  isEditable: false,
  data: {
    text: "Default Update"
  }
}