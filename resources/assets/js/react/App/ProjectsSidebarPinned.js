//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array, func } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'
import sidebarConfig from './config/sidebar'

import ProjectsSidebarHeader from './ProjectsSidebarHeader'
import ProjectsSidebarProject from './ProjectsSidebarProject'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectsSidebarPinned extends Component {

  state = {
    pinnedProjectsVisible: true
  }

  static propTypes = {
    pinnedProjects: array,
    removePinnedProject: func
  }

  static defaultProps = {
    pinnedProjects: [],
    removePinnedProject: () => {console.warn("You need to define a removePinnedProject function for ProjectsSidebarPinned to work properly")}
  }

  togglePinnedProjectsVisible = () => {
    const {
      pinnedProjectsVisible
    } = this.state
    this.setState({
      pinnedProjectsVisible: !pinnedProjectsVisible
    })
  }

  render() {
    const {
      activeProject,
      pinnedProjects,
      removePinnedProject,
      setActiveProject
    } = this.props
    const {
      pinnedProjectsVisible
    } = this.state

    return (
      <Container>
        <ProjectsSidebarHeader
          header="Quick Access" 
          icon={pinnedProjectsVisible ? "minus" : "plus"}
          onClick={this.togglePinnedProjectsVisible}/>  
        <PinnedProjects visible={pinnedProjectsVisible}>  
          {pinnedProjects.map((project, index) => {
            return (
              <ProjectsSidebarProject 
                key={index} 
                pinned
                iconHoverColor={colors.negativeActionColor}
                isActiveProject={project.id === activeProject.id}
                project={project}
                onIconClick={() => removePinnedProject(project)}
                setActiveProject={setActiveProject}/>
          )})}
        </PinnedProjects>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  margin: 2vh 0 1vh 0;
`

const PinnedProjects = styled.div`
  margin-top: 1vh;
  display: ${props => props.visible ? "block" : "none"};
`