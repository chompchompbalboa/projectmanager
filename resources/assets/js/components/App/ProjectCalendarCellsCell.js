//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
import styled from 'styled-components'
import _ from 'lodash'

import colors from './config/colors'
import layout from './config/layout'

import Icon from '../lib/Icon/Icon'
import ProjectCalendarCellsCellItem from './ProjectCalendarCellsCellItem'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectCalendarCellsCell extends Component {

  state = {
    activeHover: null,
    activeTodayHover: false,
    activeRangeHover: false,
    activeStarHover: false
  }

  componentDidUpdate = () => {
    const {
      addRangeActive,
      editStartActive,
      editEndActive,
      editMilestoneActive,
      isMilestone,
      milestone,
      milestoneIdBeingEdited,
    } = this.props
    if (!addRangeActive && !editEndActive && !editStartActive) {
      document.removeEventListener('click', this.handleContainerClickWhenAddRangeIsActive, false)
    }
    if (isMilestone && editMilestoneActive && milestoneIdBeingEdited === milestone.id) {
      this.milestoneInput.focus()
      document.addEventListener('click', this.handleClickOutside, false)
    }
  }

  handleClickOutside = () => {
    const {
      updateEditMilestoneActive
    } = this.props
    updateEditMilestoneActive(false, null)
    document.removeEventListener('click', this.handleClickOutside, false)
  }

  handleContainerMouseEnter = () => {
    const {
      addRangeActive,
      itemIdBeingEdited,
      calendarItems,
      cell,
      editStartActive,
      editEndActive,
      updateCalendarItem
    } = this.props
    document.addEventListener('click', this.handleContainerClickWhenAddRangeIsActive, false)
    if (addRangeActive || editStartActive || editEndActive) {
      let item = _.find(calendarItems, {id: itemIdBeingEdited})
      if (typeof item !== "undefined") {
        if (editStartActive) {
          item.start = moment(cell).isAfter(item.end) ? _.clone(item.end) : moment(cell)
        }
        if (editEndActive) {
          item.end = moment(cell).isBefore(item.start) ? _.clone(item.start) : moment(cell)
        }
        if (addRangeActive) {
          item.end = moment(cell).isBefore(item.start) ? _.clone(item.start) : moment(cell)
        }
        updateCalendarItem(item, item.backgroundColor, item.editorCellDate, item.editorVisible, item.text)
      }
    }
    this.setState({
      activeHover: true
    })
  }

  handleContainerMouseLeave = () => {
    document.removeEventListener('click', this.handleContainerClickWhenAddRangeIsActive, false)
    this.setState({ 
      activeHover: false 
    })
  }

  handleContainerClickWhenAddRangeIsActive = () => {
    const {
      addRangeActive,
      itemIdBeingEdited,
      calendarItems,
      cell,
      updateAddRangeActive,
      updateEditEndActive,
      updateEditStartActive,
      updateCalendarItem
    } = this.props
    let item = _.find(calendarItems, {id: itemIdBeingEdited})
    if (typeof item !== "undefined") {
      const editorVisible = addRangeActive ? true : false
      const editorCellDate = addRangeActive ? item.end.dayOfYear() : null
      updateCalendarItem(item, item.backgroundColor, editorCellDate, editorVisible, item.text)
      document.removeEventListener('click', this.handleContainerClickWhenAddRangeIsActive, false)
    }
    updateAddRangeActive(false, null)
    updateEditEndActive(false, null)
    updateEditStartActive(false, null)
  }

  handleDeleteButtonClick = (item) => {
    const {
      deleteCalendarItem
    } = this.props
    deleteCalendarItem(item)
    this.setState({
      activeHover: false
    })
  }

  render() {
    const {
      addCalendarItemDay,
      addCalendarItemRange,
      addMilestone,
      addRangeActive,
      calendarItems,
      cell,
      deleteMilestone,
      departments,
      editStartActive,
      editEndActive,
      editorOnBottom,
      isMilestone,
      itemsPosition,
      itemIdBeingEdited,
      milestone,
      updateCalendarItem,
      updateEditEndActive,
      updateEditStartActive,
      updateMilestone,
      visibleMonthMoment
    } = this.props

    const {
      activeHover,
      activeRangeHover,
      activeStarHover,
      activeTodayHover,
    } = this.state

    const isInVisibleMonth = cell.month() === visibleMonthMoment.month()

    return (
      <Container
        isInBackground={addRangeActive || editEndActive || editStartActive}
        isInVisibleMonth={isInVisibleMonth}
        isMilestone={isMilestone}
        onMouseEnter={this.handleContainerMouseEnter}
        onMouseLeave={this.handleContainerMouseLeave}>
        <ContentContainer>
        <Header>
          <Date
            isMilestone={isMilestone}>
            {cell.format("D")}
          </Date>
          <ActionsContainer
            isHover={activeHover}>
            <Action
              onClick={isMilestone ? () => deleteMilestone(milestone.id) : () => addMilestone(cell)}
              onMouseEnter={() => this.setState({ activeStarHover: true })}
              onMouseLeave={() => this.setState({ activeStarHover: false })}>
              <Icon 
                color={activeHover ? (activeStarHover || isMilestone ? "white" : "black") : "transparent"}
                icon={isMilestone ? "starFull" : "starEmpty"}
                size="1em"/>
            </Action>
            <Action
              onClick={() => addCalendarItemDay("red", cell, cell)}
              onMouseEnter={() => this.setState({ activeTodayHover: true })}
              onMouseLeave={() => this.setState({ activeTodayHover: false })}>
              <Icon 
                color={activeHover ? (activeTodayHover || isMilestone ? "white" : "black") : "transparent"}
                icon="plus"
                size="1em"/>
            </Action>
            <Action
              onClick={() => addCalendarItemRange("red", cell, cell)}
              onMouseEnter={() => this.setState({ activeRangeHover: true })}
              onMouseLeave={() => this.setState({ activeRangeHover: false })}>
              <Icon 
                color={activeHover ? (activeRangeHover || isMilestone ? "white" : "black") : "transparent"}
                icon="arrowRight"
                size="1em"/>
            </Action>
          </ActionsContainer>
        </Header>
        <CalendarItems>
          {itemsPosition.map((item, index) => {
            let backgroundColor, text, editorCellDate, editorVisible, isTextVisible
            if (item === null) {
              backgroundColor = "transparent"
              editorCellDate = null
              editorVisible = false
              text = null
              isTextVisible = false
            }
            else {
              backgroundColor = item.backgroundColor
              editorCellDate = item.editorCellDate
              editorVisible = item.editorVisible
              text = item.text
              isTextVisible = moment(item.start).isSame(cell, 'day') || cell.day() === 0
            }
            return (
              <ProjectCalendarCellsCellItem 
                key={index}
                backgroundColor={backgroundColor}
                cell={cell}
                departments={departments}
                editorCellDate={editorCellDate}
                editorVisible={editorVisible}
                editorOnBottom={editorOnBottom}
                handleDeleteButtonClick={this.handleDeleteButtonClick}
                item={item}
                itemIdBeingEdited={itemIdBeingEdited}
                text={text}
                isTextVisible={isTextVisible}
                updateCalendarItem={updateCalendarItem}
                updateEditEndActive={updateEditEndActive}
                updateEditStartActive={updateEditStartActive}/>
              )
            })}
          </CalendarItems>
        </ContentContainer>
          {milestone !== null &&
            <MilestoneContainer
              innerRef={c => this.milestoneInput = c}
              value={milestone.text}
              onChange={(e) => updateMilestone(milestone.id, e.target.value)}/>
          }
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------

const Container = styled.div`
cursor: ${props => props.isInBackground ? "pointer" : "auto"};
width: calc(100% / 7);
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: flex-start;
background-color: ${props => props.isMilestone ? colors.sidebar.background : (props.isInVisibleMonth ? "white" : "rgb(240,240,240)")};
border-bottom: 0.5px solid rgb(225,225,225);
border-right: 0.5px solid rgb(225,225,225);
opacity: ${props => props.isInBackground ? "0.5" : "1"};
&:hover {
  opacity: 1;
}
`

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const Header = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
`

const ActionsContainer = styled.div`
user-select: none;
width: 100%;
margin-right: 0.25vw;
display: flex;
justify-content: flex-end;
align-items: center;
color: ${props => props.isHover ? "black" : "transparent"};
`

const Action = styled.div`
cursor: pointer;
padding: 0.7vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
&:hover {
  color: white;
  background-color: ${colors.primary};
}
`

const ItemsContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
`

const Date = styled.div`
user-select: none;
padding: 0.5vw;
font-size: 0.9em;
color: ${props => props.isMilestone ? "white" : "black"};
`

const CalendarItems = styled.div`
width: 100%;
`

const MilestoneContainer = styled.input`
padding: 0.5vh 0;
width: 100%;
border: none;
outline: none;
background-color: transparent;
font-size: 0.8em;
text-align: center;
color: white;
`