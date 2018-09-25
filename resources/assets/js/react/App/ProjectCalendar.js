//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
const moment = extendMoment(Moment)
import styled from 'styled-components'
import _ from 'lodash'

import AppContentRightColumnContent from './AppContentRightColumnContent'
import ProjectCalendarCells from './ProjectCalendarCells'
import ProjectCalendarDays from './ProjectCalendarDays'
import ProjectCalendarHeader from './ProjectCalendarHeader'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectCalendar extends Component {

  state = {
    addRangeActive: false,
    editMilestoneActive: false,
    editStartActive: false,
    editEndActive: false,
    itemIdBeingEdited: null,
    visibleMonthMoment: moment(),
    calendarItems: this.props.activeProject.data.DATE.map(
      date => {
        return {
          id: date.id, 
          start: moment(date.data.start),
          end: moment(date.data.end),
          backgroundColor: date.data.color,
          editorCellDate: null,
          editorVisible: false,
          text: date.data.name
        }
      }
    ),
    milestones: this.props.activeProject.data.MILESTONE.map(
      milestone => {
        return {
          id: milestone.id,
          date: moment(milestone.data.date),
          text: milestone.data.name
        }
      }
    ),
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

  addMilestone = (cell) => {
    const {
      milestones
    } = this.state
    const nextMilestoneId = _.random(-5000, -1)
    const nextMilestones = _.clone(milestones)
    nextMilestones.push({
      id: nextMilestoneId,
      date: cell,
      text: ""
    })
    this.setState({
      milestones: nextMilestones,
      editMilestoneActive: true,
      milestoneIdBeingEdited: nextMilestoneId
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

  deleteMilestone = (deleteMilestoneId) => {
    const {
      milestones
    } = this.state
    let nextMilestones = _.clone(milestones)
    _.remove(nextMilestones, milestone => {return (milestone.id === deleteMilestoneId)})
    this.setState({
      milestones: nextMilestones
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

  updateEditMilestoneActive = (editMilestoneActive, milestoneIdBeingEdited) => {
    this.setState({
      editMilestoneActive: editMilestoneActive,
      milestoneIdBeingEdited: milestoneIdBeingEdited
    })
  }

  updateMilestone = (milestoneId, text) => {
    const {
      milestones
    } = this.state
    let nextMilestones = _.cloneDeep(milestones)
    let milestoneIndex = _.findIndex(nextMilestones, ["id", milestoneId])
    nextMilestones[milestoneIndex].text = text
    this.setState({
      milestones: nextMilestones
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
      calendarItems,
      editStartActive,
      editEndActive,
      editMilestoneActive,
      itemIdBeingEdited,
      milestones,
      milestoneIdBeingEdited,
      visibleMonthMoment
    } = this.state
    return (
      <AppContentRightColumnContent 
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
            addMilestone={this.addMilestone}
            addRangeActive={addRangeActive}
            calendarItems={this.visibleMonthCalendarItems()}
            deleteCalendarItem={this.deleteCalendarItem}
            deleteMilestone={this.deleteMilestone}
            departments={this.departments}
            editStartActive={editStartActive}
            editEndActive={editEndActive}
            editMilestoneActive={editMilestoneActive}
            itemIdBeingEdited={itemIdBeingEdited}
            milestones={milestones}
            milestoneIdBeingEdited={milestoneIdBeingEdited}
            updateAddRangeActive={this.updateAddRangeActive}
            updateCalendarItem={this.updateCalendarItem}
            updateEditEndActive={this.updateEditEndActive}
            updateEditStartActive={this.updateEditStartActive}
            updateEditMilestoneActive={this.updateEditMilestoneActive}
            updateMilestone={this.updateMilestone}
            visibleMonthMoment={visibleMonthMoment}/>
        </CalendarContainer>
      </AppContentRightColumnContent>
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