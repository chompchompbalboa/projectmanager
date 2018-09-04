//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
import styled from 'styled-components'
import _ from 'lodash'

import ProjectCalendarCells from './ProjectCalendarCells'
import ProjectCalendarDays from './ProjectCalendarDays'
import ProjectCalendarHeader from './ProjectCalendarHeader'
import ProjectContentContainer from './ProjectContentContainer'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectCalendar extends Component {

  state = {
    addRangeActive: false,
    editStartActive: false,
    editEndActive: false,
    itemIdBeingEdited: null,
    visibleMonthMoment: moment(),
    calendarItems: [
      {id: 0, start: moment().subtract(10, 'days').startOf('day'), end: moment().add(15, 'days').startOf('day'), backgroundColor: "green", editorCellDate: null, editorVisible: false, text: "Green"},
      {id: 1, start: moment().subtract(5, 'days').startOf('day'), end: moment().add(3, 'days').startOf('day'), backgroundColor: "red", editorCellDate: null, editorVisible: false, text: "Red"},
      {id: 2, start: moment().subtract(1, 'days').startOf('day'), end: moment().add(2, 'days').startOf('day'), backgroundColor: "blue", editorCellDate: null, editorVisible: false, text: "Blue"},
      {id: 3, start: moment().subtract(15, 'days').startOf('day'), end: moment().add(30, 'days').startOf('day'), backgroundColor: "purple", editorCellDate: null, editorVisible: false, text: "Purple"},
      {id: 4, start: moment().subtract(3, 'days').startOf('day'), end: moment().add(5, 'days').startOf('day'), backgroundColor: "red", editorCellDate: null, editorVisible: false, text: "Red"},
      {id: 5, start: moment().subtract(5, 'days').startOf('day'), end: moment().add(7, 'days').startOf('day'), backgroundColor: "green", editorCellDate: null, editorVisible: false, text: "Green"},
      {id: 6, start: moment().subtract(7, 'days').startOf('day'), end: moment().add(8, 'days').startOf('day'), backgroundColor: "blue", editorCellDate: null, editorVisible: false, text: "Blue"}
    ]
  }

  departments = [
    {name: "Estimating", color: "rgba(0,0,255)"},
    {name: "Sales", color: "rgba(255, 0, 0)"},
    {name: "Design", color: "rgba(0,255,0)"},
    {name: "Project Management", color: "rgba(255,0,255)"},
    {name: "Production", color: "rgba(0,255,255)"}
  ]

  addCalendarItem = (newItemId, backgroundColor, start, end, editorVisible, addRangeActive) => {
    const {
      calendarItems
    } = this.state
    let nextCalendarItems = _.clone(calendarItems)
    nextCalendarItems.push({
      id: newItemId,
      start: start,
      end: end,
      backgroundColor: backgroundColor,
      editorCellDate: start.dayOfYear(),
      editorVisible: editorVisible,
      text: ""
    })
    if (!addRangeActive) {
      _.remove(nextCalendarItems, item => {return (item.text === "" && item.editorVisible === false)})
    }
    return nextCalendarItems
    
  }

  addCalendarItemDay = (backgroundColor, start, end) => {
    const nextCalendarItems = this.addCalendarItem(_.random(-5000, -1), backgroundColor, start, end, true, false)
    this.setState({
      calendarItems: nextCalendarItems
    })
  }

  addCalendarItemRange = (backgroundColor, start, end) => {
    const nextItemId = _.random(-5000, -1)
    const nextCalendarItems = this.addCalendarItem(nextItemId, backgroundColor, start, end, false, true)
    this.setState({
      addRangeActive: true,
      itemIdBeingEdited: nextItemId,
      calendarItems: nextCalendarItems
    })
  }

  deleteCalendarItem = (deleteItem) => {
    const {
      calendarItems
    } = this.state
    let nextCalendarItems = _.clone(calendarItems)
    _.remove(nextCalendarItems, item => {return (item.id === deleteItem.id)})
    this.setState({
      calendarItems: nextCalendarItems
    })
  }

  goToMonthAfter = () => {
    const { visibleMonthMoment } = this.state
    this.setState({
      visibleMonthMoment: visibleMonthMoment.add(1, 'months')
    })
  }

  goToMonthBefore = () => {
    const { visibleMonthMoment } = this.state
    this.setState({
      visibleMonthMoment: visibleMonthMoment.add(-1, 'months')
    })
  }

  updateCalendarItem = (item, backgroundColor, editorCellDate, editorVisible, text) => {
    if (item !== null) {
      const {
        addRangeActive,
        calendarItems
      } = this.state

      let nextCalendarItems = _.cloneDeep(calendarItems)
      let itemIndex = _.findIndex(nextCalendarItems, ["id", item.id])
      nextCalendarItems[itemIndex].backgroundColor = backgroundColor
      nextCalendarItems[itemIndex].editorCellDate = editorCellDate
      nextCalendarItems[itemIndex].editorVisible = editorVisible
      nextCalendarItems[itemIndex].text = text
      nextCalendarItems[itemIndex].start = item.start
      nextCalendarItems[itemIndex].end = item.end
      if(!addRangeActive) {
        _.remove(nextCalendarItems, item => {return (item.text === "" && item.editorVisible === false)})
      }
      this.setState({
        calendarItems: nextCalendarItems
      })
    }
  }

  updateAddRangeActive = (addRangeActive, itemIdBeingEdited) => {
    this.setState({
      addRangeActive: addRangeActive,
      itemIdBeingEdited: itemIdBeingEdited
    })
  }

  updateEditStartActive = (editStartActive, itemIdBeingEdited) => {
    this.setState({
      editStartActive: editStartActive,
      itemIdBeingEdited: itemIdBeingEdited
    })
  }

  updateEditEndActive = (editEndActive, itemIdBeingEdited) => {
    this.setState({
      editEndActive: editEndActive,
      itemIdBeingEdited: itemIdBeingEdited
    })
  }

  visibleMonthCalendarItems = () => {
    const {
      calendarItems,
      visibleMonthMoment
    } = this.state

    const firstDayOfMonth = visibleMonthMoment.startOf('month').day()
    const lastDayOfMonth = visibleMonthMoment.endOf('month').day()
    let startOfRange = moment(visibleMonthMoment).startOf('month').subtract(firstDayOfMonth + 1, 'days')
    let endOfRange = moment(visibleMonthMoment).endOf('month').add(6 - lastDayOfMonth, 'days')
    const visibleMonthRange = moment.range(startOfRange, endOfRange)
    const visibleMonthItems =  calendarItems.filter(item => {
      const itemRange = moment.range(item.start, item.end)
      if(visibleMonthRange.overlaps(itemRange) || itemRange.overlaps(visibleMonthRange)) {
        return item
      }
    })
    return _.orderBy(visibleMonthItems, 'start')
  }
  
  render() {
    const { 
      isActiveTab, 
      activeProject, 
      updateProject, 
      user 
    } = this.props
    const {
      addRangeActive,
      editStartActive,
      editEndActive,
      itemIdBeingEdited,
      visibleMonthMoment
    } = this.state
    return (
      <ProjectContentContainer 
        isActiveTab={isActiveTab}>
        <CalendarContainer>
          <ProjectCalendarHeader 
            goToMonthAfter={this.goToMonthAfter}
            goToMonthBefore={this.goToMonthBefore}
            visibleMonthMoment={visibleMonthMoment}/>
          <ProjectCalendarDays />
          <ProjectCalendarCells 
            addCalendarItemDay={this.addCalendarItemDay}
            addCalendarItemRange={this.addCalendarItemRange}
            addRangeActive={addRangeActive}
            calendarItems={this.visibleMonthCalendarItems()}
            deleteCalendarItem={this.deleteCalendarItem}
            departments={this.departments}
            editStartActive={editStartActive}
            editEndActive={editEndActive}
            itemIdBeingEdited={itemIdBeingEdited}
            updateAddRangeActive={this.updateAddRangeActive}
            updateCalendarItem={this.updateCalendarItem}
            updateEditEndActive={this.updateEditEndActive}
            updateEditStartActive={this.updateEditStartActive}
            visibleMonthMoment={visibleMonthMoment}/>
        </CalendarContainer>
      </ProjectContentContainer>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
`