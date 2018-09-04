//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import colors from './config/colors'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectCalendarCellsCellItem extends Component {

  componentDidMount = () => {
    this.focusInput()
  }

  componentDidUpdate = () => {
    this.focusInput()
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.checkForClickOutside, false)
  }

  focusInput = () => {
    const {
      cell,
      editorCellDate,
      editorVisible
    } = this.props

    if (editorVisible && editorCellDate === cell.dayOfYear()) {
      this.textInput.focus()
    }
  }

  checkForClickOutside = (e) => {
    if(this.container.contains(e.target)) {
      return
    }
    else {
      this.toggleEditorVisible()
    }
  }

  toggleEditorVisible = () => {
    const {
      cell,
      item,
      editorVisible,
      updateCalendarItem
    } = this.props

    if (item !== null) {
      let nextEditorVisible = !editorVisible

      document.removeEventListener('mousedown', this.checkForClickOutside, false)
      updateCalendarItem(item, item.backgroundColor, cell.dayOfYear(), nextEditorVisible, item.text)
    }
  }

  render() {

    const {
      backgroundColor,
      cell,
      deleteCalendarItem,
      departments,
      item,
      itemIdBeingEdited,
      text,
      editorCellDate,
      editorVisible,
      isTextVisible,
      updateCalendarItem,
      updateEditEndActive,
      updateEditStartActive
    } = this.props
  
    if (editorVisible && editorCellDate === cell.dayOfYear() && itemIdBeingEdited === null) {
      document.addEventListener('mousedown', this.checkForClickOutside, false)
    }

    const isStartCell = (item !== null && cell.dayOfYear() === item.start.dayOfYear())
    const isEndCell = (item !== null && cell.dayOfYear() === item.end.dayOfYear())
    const itemId = (item == null ? null : item.id)

    return (
      <Container
        innerRef={c => this.container = c}>
        <CalendarItem
          backgroundColor={backgroundColor}
          canClick={item !== null}
          isEndCell={isEndCell}
          isStartCell={isStartCell}>
          <CalendarItemStart
            backgroundColor={backgroundColor}
            isStartCell={isStartCell}
            onClick={() => updateEditStartActive(true, itemId)}/>
          <CalendarItemText
            isStartCell={isStartCell}
            onClick={this.toggleEditorVisible}>
            {isTextVisible ? text : ""}
          </CalendarItemText>
          <CalendarItemEnd
            backgroundColor={backgroundColor}
            isEndCell={isEndCell}
            onClick={() => updateEditEndActive(true, itemId)}/>
        </CalendarItem>
        {editorVisible && editorCellDate === cell.dayOfYear() &&
          <CalendarItemEditor>
              <CalendarItemEditorContent>
              <CalendarItemEditorContentText
                innerRef={c => this.textInput = c}
                placeholder="Description"
                value={text}
                onChange={(e) => {updateCalendarItem(item, backgroundColor, editorCellDate, true, e.target.value)}}/>
              <DepartmentsContainer>
                {departments.map((department, index) => {
                  return (
                    <Department
                      key={index}
                      onClick={(e) => {updateCalendarItem(item, department.color, editorCellDate, true, text)}}>
                      <DepartmentColor
                        backgroundColor={department.color}/>
                      <DepartmentName>{department.name}</DepartmentName>
                    </Department>
                  )
                })}
              </DepartmentsContainer>
              <CalendarItemEditorDeleteButton
                onClick={() => deleteCalendarItem(item)}>
                Delete
              </CalendarItemEditorDeleteButton>
              </CalendarItemEditorContent>
          </CalendarItemEditor>
        }
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const Container = styled.div`
position: relative;
`

const CalendarItem = styled.div`
cursor: ${props => props.canClick ? "pointer" : "auto"};
margin: 0.375vh 0;
padding: ${props => props.isEndCell ? (props.isStartCell ? "0" : "0 0 0 0.25vw") : (props.isStartCell ? "0" : "0 0.25vw")};
width: 100%;
height: 0.9em;
background-color: ${props => props.backgroundColor};
display: flex;
justify-content: ${props => props.isEndCell ? "flex-end" : "flex-start"};
align-items: center;
`

const CalendarItemText = styled.div`
margin-left: ${props => props.isStartCell ? "0.1vw" : "0"};
height: 100%;
width: 100%;
white-space: nowrap;
overflow-x: hidden;
font-size: 0.75em;
color: white;
`

const CalendarItemEditor = styled.div`
user-select: none;
z-index: 1000;
position: absolute;
margin-top: calc(0.6em / 2 - 1px);
margin-left: 1%;
width: 98%;
`

const CalendarItemEditorContent = styled.div`
position: relative;
background: #ffffff;
border: 1.25px solid ${colors.containerBorderColor};
font-size: 0.9em;
&:after {
  bottom: 100%;
  left: calc(0.65em + 10%);
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0);
  border-bottom-color: #ffffff;
  border-width: 0.65em;
  margin-left: -0.65em;
}
&:before {
  bottom: 100%;
  left: calc(0.65em + 10%);
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(194, 225, 245, 0);
  border-bottom-color: ${colors.containerBorderColor};
  border-width: calc(0.65em + 1.25px);
  margin-left: calc(-0.65em - 1px);
}
`

const CalendarItemEditorContentText = styled.input`
padding: 0.65vh 0.5vw;
width: 100%;
border: none;
outline: none;
border-bottom: 1px solid rgb(225,225,255);
font-size: 0.9em;
`

const CalendarItemEdge = styled.div`
  cursor: col-resize;
  width: 6%;
  height: 100%;
  background-color: white;
  border: 1px solid ${props => props.backgroundColor};
`

const CalendarItemEnd = CalendarItemEdge.extend`
  display: ${props => props.isEndCell ? "block" : "none"};
`

const CalendarItemStart = CalendarItemEdge.extend`
  display: ${props => props.isStartCell ? "block" : "none"};
`

const DepartmentsContainer = styled.div`
margin: 1vh 0 0 0;
`

const Department = styled.div`
cursor: pointer;
padding: 0.375vh 0.5vw;
display: flex;
justify-content: flex-start;
align-items: center;
&:hover {
  background-color: ${colors.sidebar.background};
  color: white;
}
`

const DepartmentColor = styled.div`
margin-right: 0.5vw;
width: 1em;
height: 1em;
background-color: ${props => props.backgroundColor};
`

const DepartmentName = styled.div`
`

const CalendarItemEditorDeleteButton = styled.div`
  cursor: pointer;
  width: 90%;
  margin: 1vh 5%;
  padding: 0.5vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.sidebar.background};
  color: white;
  &:hover {
    background-color: ${colors.primary};
  }
`