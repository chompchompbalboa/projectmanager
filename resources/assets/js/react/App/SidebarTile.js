//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class SidebarMainTile extends Component {

  state = {
    hover: false
  }

  render() {
    const {
      activeContent,
      icon,
      id,
      setActiveContent,
      text
    } = this.props

    const {
      hover
    } = this.state

    const isActiveTile = (activeContent === id)

    return (
      <Container 
        active={isActiveTile}
        onClick={() => setActiveContent(id)}
        onMouseEnter={() => {this.setState({ hover: true })}}
        onMouseLeave={() => {this.setState({ hover: false })}}>
        <Icon 
          color={isActiveTile || hover ? colors.sidebar.activeFontColor : colors.sidebar.inactiveFontColor}
          icon={icon}
          size="3vh"/>
        <Text>
          {text}
        </Text>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
SidebarMainTile.propTypes = {
  activeContent: string,
  icon: string,
  id: string,
  setActiveContent: func,
  text: string
}
SidebarMainTile.defaultProps = {
  active: "PROJECTS",
  icon: "projects",
  id: "PROJECTS",
  setActiveContent: () => {console.warn("You need to define a setActiveContent function for SidebarMainTile to work properly")},
  text: "Projects"
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  padding: 2vh 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.active ? colors.primary : "transparent"};
  color: ${props => props.active ? colors.sidebar.activeFontColor : colors.sidebar.inactiveFontColor};
  &:hover {
    cursor: pointer;
    background-color: ${colors.primary};
    color: ${colors.sidebar.activeFontColor};
  }
`

const Text = styled.div`
  margin-top: 0.5vh;
  font-size: 0.8em;
`