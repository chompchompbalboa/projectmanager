//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
import styled from 'styled-components'
import _ from 'lodash'

import colors from './config/colors'
import layout from './config/layout'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectCalendarCells = ({ addCalendarItem, calendarItems, visibleMoment }) => {

  const cells = () => {
    const firstDayOfMonth = visibleMoment.startOf('month').day()
    const lastDayOfMonth = visibleMoment.endOf('month').day()
    let startOfRange = moment(visibleMoment).startOf('month').subtract(firstDayOfMonth, 'days')
    let endOfRange = moment(visibleMoment).endOf('month').add(6 - lastDayOfMonth, 'days')
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

  // Initialize the variable which holds the calendar items in the correct
  // position. This allows the items to flow from one cell to the next 
  // without jumping up and down as other items end / start
  let itemsPosition = []
  let noCalendarItemsInPreviousCell = true

  return (
    <Container>
      {cells().map((cell, index) => {
        // Visually separate cells that aren't in the current visible month
        // but are still within the displayed range
        const isInVisibleMonth = cell.month() === visibleMoment.month()

        // Reset the calendar item positions at the beginning of each week or
        // if the 
        if(cell.day() === 0 || noCalendarItemsInPreviousCell) {
          itemsPosition = []
        }

        // For each calendar item, see if it belongs in this cell. If it does,
        // push it to the itemsPosition array so that it renders in the correct
        // position below
        calendarItems.map((item, index) => {
          const itemIndex = _.indexOf(itemsPosition, item)
          if(cell.within(moment.range(item.start, item.end))) {
            if(itemIndex === -1) {
              itemsPosition.push(item)
            }
          }
          else if(itemIndex > -1) {
            itemsPosition[itemIndex] = null
          }
        })

        // If there aren't any calendar items in the current cell, make sure we
        // reset the positions in the next cell
        noCalendarItemsInPreviousCell = (itemsPosition.every(item => item === null) === true || itemsPosition.length === 0)
        
        return (
          <Cell 
            key={index}
            isInVisibleMonth={isInVisibleMonth}>
            <InfoContainer>
              <Date
                isToday={cell.isSame(moment(), "day")}>
                {cell.format("D")}
              </Date>
              <CalendarItems>
                {itemsPosition.map((item, index) => {
                  if(item !== null) {
                    return (
                      <CalendarItem 
                        key={index}
                        backgroundColor={item.backgroundColor}/>
                    )
                  }
                  return (
                    <CalendarItem 
                      key={index}
                      backgroundColor={"transparent"}/>
                  )
                })}
              </CalendarItems>
            </InfoContainer>
            {isInVisibleMonth && 
              <ActionsContainer>
                <Action
                  onClick={() => addCalendarItem("red", cell, cell)}>
                  <Icon 
                    color="white"
                    icon="plus"
                    size="1em"/>
                  <ActionText>Today</ActionText>
                </Action>
                <Action>
                  <Icon 
                    color="white"
                    icon="arrowRight"
                    size="1em"/>
                  <ActionText>Range</ActionText>
                </Action>
              </ActionsContainer>
            }
          </Cell>
        )
      })}
    </Container>
  )
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
  cursor: pointer;
  width: calc(100% / 7);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${props => props.isInVisibleMonth ? "white" : "rgb(240,240,240)"};
  border-bottom: 0.5px solid rgb(225,225,225);
  border-right: 0.5px solid rgb(225,225,225);
  &:hover {
    background-color: ${colors.sidebar.background};
    color: white;
  }
`

const InfoContainer = styled.div`
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const CalendarItem = styled.div`
  margin: 0.375vh 0;
  width: 100%;
  height: 0.75vh;
  background-color: ${props => props.backgroundColor};
`

const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: white;
`

const Action = styled.div`
  padding: 0.7vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  &:hover {
    background-color: ${colors.primary};
  }
`

const ActionText = styled.div`
  font-size: 0.75em;
`

export default ProjectCalendarCells