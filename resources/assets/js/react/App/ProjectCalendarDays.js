//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectCalendarDays = ({}) => {
  return (
    <Container>
      <Day>Sunday</Day>
      <Day>Monday</Day>
      <Day>Tuesday</Day>
      <Day>Wednesday</Day>
      <Day>Thursday</Day>
      <Day>Friday</Day>
      <Day>Saturday</Day>
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: ${layout.calendar.daysHeight};
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-top: 1px solid ${colors.sidebar.background};
  border-left: 1px solid ${colors.sidebar.background};
  border-right: 1px solid ${colors.sidebar.background};
`

const Day = styled.div`
  width: calc(100% / 7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85em;
  letter-spacing: 0.5px;
`

export default ProjectCalendarDays