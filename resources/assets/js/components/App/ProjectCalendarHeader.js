//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectCalendarHeader extends Component {

  state = {
    changeMonthAfterHover: false,
    changeMonthBeforeHover: false
  }
  render() {
    const { 
      goToMonthAfter, 
      goToMonthBefore, 
      visibleMoment 
    } = this.props
    const {
      changeMonthAfterHover,
      changeMonthBeforeHover
    } = this.state

    return (
      <Container>
        <InfoContainer>
          <CurrentMonth>
            {visibleMoment.format('MMMM YYYY')}
          </CurrentMonth>
        </InfoContainer>
        <ActionsContainer>
          <ChangeMonthContainer
            onClick={goToMonthBefore}
            onMouseEnter={() => this.setState({ changeMonthBeforeHover: true })}
            onMouseLeave={() => this.setState({ changeMonthBeforeHover: false })}>
            <Icon 
              color={changeMonthBeforeHover ? "white" : colors.sidebar.background}
              icon="chevronLeft"/>
          </ChangeMonthContainer>
          <ChangeMonthContainer
            onClick={goToMonthAfter}
            onMouseEnter={() => this.setState({ changeMonthAfterHover: true })}
            onMouseLeave={() => this.setState({ changeMonthAfterHover: false })}>
            <Icon 
              color={changeMonthAfterHover ? "white" : colors.sidebar.background}
              icon="chevronRight"/>
          </ChangeMonthContainer>
        </ActionsContainer>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: ${layout.calendar.headerHeight};
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const InfoContainer = styled.div`
`

const CurrentMonth = styled.div`
  font-size: 1.4em;
  font-weight: bold;
`

const ActionsContainer = styled.div`
  position: relative;
  top: 2px;
  margin-left: 1.5vw;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid ${colors.sidebar.background};
  border-top: 1px solid ${colors.sidebar.background};
  border-right: 1px solid ${colors.sidebar.background};
`

const ChangeMonthContainer = styled.div`
  cursor: pointer;
  user-select: none;
  height: 100%;
  padding: 0.75vw;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  &:hover {
    background-color: ${colors.sidebar.background};
    color: white;
  }
`