//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, shape, string } from 'prop-types'
import styled from 'styled-components'

import ProjectActivityDescriptionName from './ProjectActivityDescriptionName'
import ProjectActivityDescriptionText from './ProjectActivityDescriptionText'
import ProjectActivityTile from './ProjectActivityTile'
import ProjectActivityTextarea from './ProjectActivityTextarea'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectActivityUpdate extends Component {

  state = {
    text: this.props.data.text
  }

  description = () => {
    const {
      data: {
        author
      }
    } = this.props
    return (
      <React.Fragment>
        <ProjectActivityDescriptionText>
          <ProjectActivityDescriptionName>{author.name}</ProjectActivityDescriptionName>
          &nbsp;wrote an update
        </ProjectActivityDescriptionText>
      </React.Fragment>
    )
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
        description={this.description()}
        icon="update"
        isEditable={isEditable}
        tileData={tileData}
        to={null}
        {...props}>
        <ProjectActivityTextarea
          focus={isFocused}
          isEditable={isEditable}
          placeholder="Update"
          rows={isEditable ? 3 : 1}
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