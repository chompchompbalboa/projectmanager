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
import ProjectCalendarCellsCell from './ProjectCalendarCellsCell'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectCalendarCells extends Component {

  state = {
    activeHover: null,
    activeTodayHover: false,
    activeRangeHover: false,
    visibleEditor: null
  }

  cells = () => {
    const {
      visibleMonthMoment
    } = this.props

    const firstDayOfMonth = visibleMonthMoment.startOf('month').day()
    const lastDayOfMonth = visibleMonthMoment.endOf('month').day()
    let startOfRange = moment(visibleMonthMoment).startOf('month').subtract(firstDayOfMonth, 'days')
    let endOfRange = moment(visibleMonthMoment).endOf('month').add(6 - lastDayOfMonth, 'days')
    let inRange = true
    let cells = []
    let currentCell = startOfRange
    while (inRange) {
      cells.push(moment(currentCell))
      currentCell.add(1, 'days')
      if(moment(currentCell).isAfter(endOfRange))
      {
        inRange = false
      }
    }
    return cells
  }

  setMilestone = (cell, milestones) => {
    let payload = null
    milestones.forEach((milestone, index) => {
      if (milestone.date.isSame(cell, 'day')) {
        payload = {
          id: milestone.id,
          text: milestone.text
        }
      }
    })
    return payload
  }

  setVisibleEditor = (cellIndex, itemIndex) => {
    const {
      visibleEditor
    } = this.state
    if (visibleEditor !== null && cellIndex === visibleEditor.cell && itemIndex === visibleEditor.item) {
      this.setState({
        visibleEditor: null
      })
    }
    else {
      this.setState({
        visibleEditor: {
          cell: cellIndex,
          item: itemIndex
        }
      })
    }
  }

  render() {
    const { 
      addCalendarItemDay, 
      addCalendarItemRange, 
      addRangeActive,
      addMilestone,
      itemIdBeingEdited,
      calendarItems, 
      deleteCalendarItem,
      departments,
      deleteMilestone,
      editStartActive,
      editEndActive,
      editMilestoneActive,
      milestones,
      milestoneIdBeingEdited,
      updateAddRangeActive,
      updateCalendarItem,
      updateEditEndActive,
      updateEditStartActive,
      updateEditMilestoneActive,
      updateMilestone,
      visibleMonthMoment 
    } = this.props

    const {
      activeHover,
      activeTodayHover,
      activeRangeHover,
      visibleEditor
    } = this.state

    // Initialize the variables which hold the calendar items in the correct
    // position. This allows the items to flow from one cell to the next 
    // without jumping up and down as other items end / start
    let itemsPosition = []
    let noCalendarItemsInPreviousCell = true

    const cells = this.cells()
    return (
      <Container>
        {cells.map((cell, cellIndex) => {
          // Visually separate cells that aren't in the current visible month
          // but are still within the displayed range
          const isInVisibleMonth = cell.month() === visibleMonthMoment.month()
  
          // Reset the calendar item positions at the beginning of each week or
          // if there are no items in the previous cell
          if(cell.day() === 0 || noCalendarItemsInPreviousCell) {
            itemsPosition = []
          }
  
          // For each calendar item, see if it belongs in this cell. If it does,
          // push it to the itemsPosition array so that it renders in the correct
          // position below
          calendarItems.map(item => {
            const itemIndex = _.indexOf(itemsPosition, item)
            if(moment.range(item.start, item.end).contains(cell)) {
              // Remove all the trailing null elements so we don't have any
              // unnecessary spaces in the cell
              itemsPosition = _.dropRightWhile(itemsPosition, item => item === null)
              // If the item isn't already in the array, add it
              if(itemIndex === -1) {
                // Reset itemsPosition if every item is empty
                if(itemsPosition.every(item => item === null)) {
                  itemsPosition = []
                }
                // Add the item
                itemsPosition.push(item)
              }
            }
            else if(itemIndex > -1) {
              itemsPosition = _.clone(itemsPosition)
              itemsPosition[itemIndex] = null
            }
          })
  
          // If there aren't any calendar items in the current cell, make sure we
          // reset the positions in the next cell
          noCalendarItemsInPreviousCell = (itemsPosition.every(item => item === null) === true || itemsPosition.length === 0)

          // Set the milestone info, if any
          const milestone = this.setMilestone(cell, milestones)
          const isMilestone = milestone !== null
  
          return (
            <ProjectCalendarCellsCell
              key={cellIndex}
              addCalendarItemDay={addCalendarItemDay}
              addCalendarItemRange={addCalendarItemRange}
              addMilestone={addMilestone}
              addRangeActive={addRangeActive}
              calendarItems={calendarItems}
              cell={cell}
              deleteCalendarItem={deleteCalendarItem}
              deleteMilestone={deleteMilestone}
              departments={departments}
              editStartActive={editStartActive}
              editEndActive={editEndActive}
              editMilestoneActive={editMilestoneActive}
              editorOnBottom={cellIndex < 20}
              isMilestone={isMilestone}
              itemIdBeingEdited={itemIdBeingEdited}
              itemsPosition={itemsPosition}
              milestone={milestone}
              milestoneIdBeingEdited={milestoneIdBeingEdited}
              updateAddRangeActive={updateAddRangeActive}
              updateCalendarItem={updateCalendarItem}
              updateEditEndActive={updateEditEndActive}
              updateEditStartActive={updateEditStartActive}
              updateEditMilestoneActive={updateEditMilestoneActive}
              updateMilestone={updateMilestone}
              visibleMonthMoment={visibleMonthMoment}
              />
          )
        })}
      </Container>
    )
  }

  
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: calc(100% - ${layout.calendar.headerHeight} - ${layout.calendar.daysHeight});
  display: flex;
  flex-flow: row wrap;
  background-color: white;
  border-top: 1px solid ${colors.containerBorderColor};
  border-left: 1px solid ${colors.sidebar.background};
  border-right: 1px solid ${colors.sidebar.background};
  border-bottom: 1px solid ${colors.sidebar.background};
`

const Cell = styled.div`
  width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${props => props.isInVisibleMonth ? "white" : "rgb(240,240,240)"};
  border-bottom: 0.5px solid rgb(225,225,225);
  border-right: 0.5px solid rgb(225,225,225);
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
  padding: 0.5vw;
  font-size: 0.9em;
`

const CalendarItems = styled.div`
  width: 100%;
`

const CalendarItemContainer = styled.div`
  position: relative;
`

const CalendarItem = styled.div`
  cursor: pointer;
  margin: 0.375vh 0;
  padding: 0 0.25vw;
  width: 100%;
  height: 0.9em;
  background-color: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
`

const CalendarItemText = styled.div`
  display: ${props => props.visible ? "block" : "none"};
  font-size: 0.75em;
  color: white;
`

const CalendarItemEditor = styled.div`
  user-select: none;
  z-index: 1000;
  position: absolute;
  display: ${props => props.visible ? "block" : "none"};
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