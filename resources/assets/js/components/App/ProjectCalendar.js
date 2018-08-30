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
    visibleMoment: moment(),
    calendarItems: [
      {start: moment().subtract(20, 'days'), end: moment().subtract(15, 'days'), backgroundColor: "green"},
      {start: moment().subtract(18, 'days'), end: moment().subtract(3, 'days'), backgroundColor: "red"},
      {start: moment().subtract(100, 'days'), end: moment().subtract(99, 'days'), backgroundColor: "blue"},
      {start: moment().subtract(15, 'days'), end: moment().add(10, 'days'), backgroundColor: "purple"},
      {start: moment().subtract(16, 'days'), end: moment().subtract(1, 'days'), backgroundColor: "red"},
      {start: moment().subtract(17, 'days'), end: moment().subtract(2, 'days'), backgroundColor: "green"},
      {start: moment().subtract(18, 'days'), end: moment().subtract(3, 'days'), backgroundColor: "blue"}
    ]
  }

  addCalendarItem = (backgroundColor, start, end) => {
    const {
      calendarItems
    } = this.state
    let nextCalendarItems = _.clone(calendarItems)
    nextCalendarItems.push({
      start: start,
      end: end,
      backgroundColor: backgroundColor
    })
    this.setState({
      calendarItems: nextCalendarItems
    })
  }

  visibleMonthCalendarItems = (visibleMoment) => {
    const {
      calendarItems
    } = this.state
    const firstDayOfMonth = moment(visibleMoment).startOf('month')
    const lastDayOfMonth = moment(visibleMoment).endOf('month')
    const visibleMonthRange = moment.range(firstDayOfMonth, lastDayOfMonth)
    const visibleMonthItems =  calendarItems.filter(item => {
      const itemRange = moment.range(item.start, item.end)
      if(visibleMonthRange.overlaps(itemRange) || itemRange.overlaps(visibleMonthRange)) {
        return item
      }
    })
    return _.orderBy(visibleMonthItems, 'start')
  }

  goToMonthAfter = () => {
    const { visibleMoment } = this.state
    this.setState({
      visibleMoment: visibleMoment.add(1, 'months')
    })
  }

  goToMonthBefore = () => {
    const { visibleMoment } = this.state
    this.setState({
      visibleMoment: visibleMoment.add(-1, 'months')
    })
  }
  
  render() {
    const { 
      isActiveTab, 
      activeProject, 
      updateProject, 
      user 
    } = this.props
    const {
      visibleMoment
    } = this.state
    return (
      <ProjectContentContainer 
        isActiveTab={isActiveTab}>
        <CalendarContainer>
          <ProjectCalendarHeader 
            goToMonthAfter={this.goToMonthAfter}
            goToMonthBefore={this.goToMonthBefore}
            visibleMoment={visibleMoment}/>
          <ProjectCalendarDays />
          <ProjectCalendarCells 
            addCalendarItem={this.addCalendarItem}
            calendarItems={this.visibleMonthCalendarItems(visibleMoment)}
            visibleMoment={visibleMoment}/>
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