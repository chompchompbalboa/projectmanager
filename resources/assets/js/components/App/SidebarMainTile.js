//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import sidebarConfig from './config/sidebar'
import transitionConfig from './config/transition'

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
          color={isActiveTile || hover ? sidebarConfig.mainActiveFontColor : sidebarConfig.mainInactiveFontColor}
          icon={icon}
          size="6vh"/>
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
  padding: 3vh 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.active ? sidebarConfig.mainActiveBackgroundColor : "transparent"};
  color: ${props => props.active ? sidebarConfig.mainActiveFontColor : sidebarConfig.mainInactiveFontColor};
  &:hover {
    cursor: pointer;
    background-color: ${sidebarConfig.mainActiveBackgroundColor};
    color: ${sidebarConfig.mainActiveFontColor};
  }
`

const Text = styled.div`
  margin-top: 0.5vh;
`