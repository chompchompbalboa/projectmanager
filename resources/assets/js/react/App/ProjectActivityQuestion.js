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
export default class ProjectActivityQuestion extends Component {

  state = {
    question: this.props.data.question,
    answer: this.props.data.answer
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
      question, 
      answer, 
    } = this.state

    const tileData = {
      id: id,
      type: "QUESTION",
      data: {
        author: author,
        createdAt: createdAt,
        question: question,
        answer: answer,
        project: project
      }
    }

    return (
      <ProjectActivityTile
        icon="question"
        isEditable={isEditable}
        message="asked a question"
        tileData={tileData}
        to={null}
        {...props}>
        <ProjectActivityTextarea
          key={id + "-question"}
          focus={isFocused}
          disabled={!isEditable}
          value={question}
          onChange={(e) => this.setState({ question: e.target.value })}/>
        <ProjectActivityTextarea
          key={id + "-answer"}
          focus={false}
          disabled={!isEditable}
          value={answer}
          onChange={(e) => this.setState({ answer: e.target.value })}/>
      </ProjectActivityTile>
    )
  }
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectActivityQuestion.propTypes = {
  isEditable: bool,
  data: shape({
    text: string
  })
}
ProjectActivityQuestion.defaultProps = {
  isEditable: false,
  data: {
    text: "Default Question"
  }
}