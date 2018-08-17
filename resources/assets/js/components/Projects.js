//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import AppContent from './AppContent'
import Project from './Project'
import ProjectsSidebar from './ProjectsSidebar'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Projects extends Component {

  state = {
    activeProject: this.props.projects[0]
  }

  static propTypes = {
    isActiveContent: bool,
    projects: arrayOf(shape({
      name: string
    }))
  }

  static defaultProps = {
    isActive: true,
    projects: _.times(100, (index) => {
      return {
        id: index, 
        code: "1800" + index, 
        name: "Project Name " + index,
        tabs: [
          {id: 'TIMELINE'},
          {id: 'FILES'},
          {id: 'PURCHASING'},
          {id: 'DESIGN'}
        ],
        timeline: {
          tiles: []
        }
    }})
  }

  setActiveProject = (nextActiveProject) => {
    this.setState({
      activeProject: nextActiveProject
    })
  }

  render() {
    const {
      isActiveContent,
      projects
    } = this.props

    const {
      activeProject
    } = this.state

    return (
      <AppContent isActiveContent={isActiveContent}>
        <ProjectsSidebar 
          activeProject={activeProject}
          projects={projects}
          setActiveProject={this.setActiveProject}/>
        <Project 
          activeProject={activeProject} />
      </AppContent>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`