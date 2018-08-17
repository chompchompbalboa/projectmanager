//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import colors from '../config/colors'
import sidebarConfig from '../config/sidebar'

import ProjectsSidebarHeader from './ProjectsSidebarHeader'
import ProjectsSidebarPinned from './ProjectsSidebarPinned'
import ProjectsSidebarProject from './ProjectsSidebarProject'
import ProjectsSidebarSearch from './ProjectsSidebarSearch'
import SidebarActive from './SidebarActive'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectsSidebar extends Component {

  state = {
    listedProjects: this.props.projects,
    pinnedProjects: [],
    searchValue: ""
  }

  addPinnedProject = (project) => {
    let nextPinnedProjects = this.state.pinnedProjects
    const alreadyPinned = _.findIndex(nextPinnedProjects, project)
    if(alreadyPinned === -1) {
      nextPinnedProjects.push(project)
    }
    this.setState({
      pinnedProjects: nextPinnedProjects
    })
  }

  removePinnedProject = (project) => {
    let nextPinnedProjects = this.state.pinnedProjects
    const projectIndex = _.findIndex(nextPinnedProjects, project)
    nextPinnedProjects.splice(projectIndex, 1)
    this.setState({
      pinnedProjects: nextPinnedProjects
    })
  }

  changeSearchValue = (e) => {
    const {
      setActiveProject
    } = this.props
    const nextSearchValue = e.target.value
    const nextListedProjects = this.filterListedProjects(nextSearchValue)
    let nextActiveProject = this.props.activeProject
    if (nextListedProjects.length === 1) {
       setActiveProject(nextListedProjects[0])
    }
    this.setState({
      listedProjects: nextListedProjects,
      searchValue: nextSearchValue
    })
  }

  filterListedProjects = (searchValue) => {
    const {
      projects
    } = this.props
    return projects.filter((project) => {
      const stringToSearch = project.code + " - " + project.name
      const searchValueInString = stringToSearch.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      if (searchValueInString) {
        return project
      }
    })
  }

  render() {
    const {
      activeProject,
      setActiveProject
    } = this.props
    const {
      pinnedProjects,
      listedProjects,
      searchValue
    } = this.state

    return (
      <SidebarActive>
        <FixedContainer>
          <ProjectsSidebarSearch 
            searchValue={searchValue}
            changeSearchValue={this.changeSearchValue}/>
          <ProjectsSidebarPinned
            activeProject={activeProject} 
            pinnedProjects={pinnedProjects}
            removePinnedProject={this.removePinnedProject}
            setActiveProject={setActiveProject}/>
          <ProjectsSidebarHeader
            header="Projects" 
            icon=""/> 
        </FixedContainer>
        {listedProjects.map((project, index) => {
          return (
            <ProjectsSidebarProject 
              key={index} 
              iconHoverColor={colors.positiveActionColor}
              inactiveIcon={_.findIndex(pinnedProjects, project) > -1}
              isActiveProject={project.id === activeProject.id}
              onIconClick={() => this.addPinnedProject(project)}
              project={project}
              setActiveProject={setActiveProject}/>
        )})}
      </SidebarActive>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const FixedContainer = styled.div`
  position: sticky;
  top: 0;
  padding: 2vh 0 1vh 0;
  background-color: ${sidebarConfig.activeBackgroundColor};
`

const Divider = styled.div`
  width: calc(100% - 2vh);
  height: 2px;
  background-color: white;
  margin: 1vh;
`