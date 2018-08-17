//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import colors from '../config/colors'

import Input from './Input'
import ProjectTimelineTile from './ProjectTimelineTile'
import TextArea from './TextArea'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectTimelineTodo extends Component {

  state = {
    assignTo: "",
    todo: ""
  }

  render() {
    const {
      assignTo,
      todo
    } = this.state

    return (
      <ProjectTimelineTile>
        <TodoContainer>
          <AssignToInput
            borderColor={colors.inputBorderColor}
            color={colors.inputFontColor}
            margin="0.5vh 0"
            value={assignTo} 
            onChange={(e) => this.setState({ assignTo: e.target.value })}/>
          <TodoInput
            borderColor={colors.inputBorderColor}
            color={colors.inputFontColor}
            margin="0.5vh 0"
            value={todo} 
            onChange={(e) => this.setState({ todo: e.target.value })}/>
        </TodoContainer>
        <CalendarContainer></CalendarContainer>
      </ProjectTimelineTile>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const TodoContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`

const AssignToInput = styled(Input)``

const TodoInput = styled(TextArea)``

const CalendarContainer = styled.div``