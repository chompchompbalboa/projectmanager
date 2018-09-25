//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, shape, string } from 'prop-types'
import styled from 'styled-components'

import DropdownEmployees from './DropdownEmployees'
import ProjectActivityDescriptionName from './ProjectActivityDescriptionName'
import ProjectActivityDescriptionText from './ProjectActivityDescriptionText'
import ProjectActivityTile from './ProjectActivityTile'
import ProjectActivityTextarea from './ProjectActivityTextarea'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectActivityQuestion extends Component {

  state = {
    to: this.props.data.to,
    question: this.props.data.question,
    answer: this.props.data.answer
  }

  description = () => {
    const {
      data: {
        author,
        to
      },
      isFocused
    } = this.props
    return (
      <React.Fragment>
        <ProjectActivityDescriptionText>
          <ProjectActivityDescriptionName>{author.name}</ProjectActivityDescriptionName>
          &nbsp;asked&nbsp;
          {to !== null
          ? <ProjectActivityDescriptionName>{to.name}</ProjectActivityDescriptionName>
          : <DropdownEmployees onOptionSelect={this.updateTo} focus={isFocused}/>
          }
          &nbsp;a question
        </ProjectActivityDescriptionText>
      </React.Fragment>
    )
  }

  updateTo = (option) => {
    console.log(option)
    this.setState({
      to: option
    })
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
      to,
      question, 
      answer, 
    } = this.state

    const tileData = {
      id: id,
      type: "QUESTION",
      data: {
        author: author,
        createdAt: createdAt,
        to: to,
        question: question,
        answer: answer,
        project: project
      }
    }

    return (
      <ProjectActivityTile
        description={this.description()}
        icon="question"
        isEditable={isEditable}
        tileData={tileData}
        to={null}
        {...props}>
        <ProjectActivityTextarea
          key={id + "-question"}
          focus={false}
          isEditable={isEditable}
          placeholder="Question"
          value={question}
          onChange={(e) => this.setState({ question: e.target.value })}/>
        <ProjectActivityTextarea
          key={id + "-answer"}
          focus={false}
          isEditable={isEditable}
          placeholder={isEditable ? "Answer" : ""}
          rows={isEditable ? 2 : 1}
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