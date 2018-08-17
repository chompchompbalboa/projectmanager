//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import sidebarConfig from '../config/sidebar'

import Icon from './Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectsSidebarProject extends Component {
  
  static proptypes = {
    iconColor: string,
    iconHoverColor: string,
    iconSize: string,
    inactiveIcon: bool,
    isActiveProject: bool,
    onIconClick: func,
    pinned: bool,
    project: shape({
      id: number,
      code: string,
      name: string
    })
  }

  static defaultProps = {
    iconColor: "white",
    iconHoverColor: "gray",
    iconSize: "0.8em",
    inactiveIcon: false,
    isActiveProject: false,
    onIconClick: () => {console.warn("You need to define an onIconClick function for ProjectsSidebarProject to work properly")},
    pinned: false,
    project: {
      id: 0,
      code: "000000",
      name: "Default Project Name"
    }
  }

  state = {
    iconHover: false
  }

  render() {
    const {
      iconColor,
      iconHoverColor,
      iconSize,
      inactiveIcon,
      isActiveProject,
      onIconClick,
      pinned,
      project,
      setActiveProject
    } = this.props
    const {
      iconHover
    } = this.state

    return (
      <Container
        isActiveProject={isActiveProject}
        onClick={iconHover ? () => {} : () => setActiveProject(project)}>
        <InfoContainer>
          <InfoJobCode>{project.code}</InfoJobCode>
          <InfoName>{project.name}</InfoName>
        </InfoContainer>
        <IconContainer 
          onClick={inactiveIcon ? () => {} : onIconClick}
          onMouseEnter={() => this.setState({ iconHover: true })}
          onMouseLeave={() => this.setState({ iconHover: false })}>
          <Icon 
            color={inactiveIcon ? "transparent" : (iconHover ? iconHoverColor : iconColor)}
            icon={pinned ? "exit" : "pin"}
            size={iconSize}/>
        </IconContainer>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  cursor: pointer;
  padding: 1vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: ${props => props.isActiveProject ? sidebarConfig.activeActiveBackgroundColor : "transparent"};
  &:hover {
    background-color: ${sidebarConfig.activeActiveBackgroundColor}
  }
`

const InfoContainer = styled.div`
  width: calc(100% - 2vw);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const InfoJobCode = styled.div`
  font-size: 0.8em;
`

const InfoName = styled.div`
`

const IconContainer = styled.div`
  width: 2vw;
  display: flex;
  justify-content: flex-end;
`