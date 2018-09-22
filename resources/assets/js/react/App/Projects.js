//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { arrayOf, bool, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

import AppContentContainer from './AppContentContainer'
import Project from './Project'
import ProjectsTabs from './ProjectsTabs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
@connect(
  state => ({
    projects: state.projects,
    user: state.user
  })
)
export default class Projects extends Component {

  state = {
    activeTab: 0,
    tabs: [
      this.props.projects[0],
      this.props.projects[1],
      this.props.projects[2]
    ]
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
          {id: 'ACTIVITY'},
          {id: 'CALENDAR'},
          {id: 'PURCHASING'},
          {id: 'HOURS'},
          {id: 'FILES'},
        ],
        data: {}
    }})
  }
  
  addTab = (project) => {
    const {
      tabs
    } = this.state
    const projectIndex = tabs.indexOf(project)
    let nextActiveTab, nextTabs
    if(projectIndex === -1) {
      nextTabs = _.clone(tabs)
      nextTabs.push(project)
      nextActiveTab = nextTabs.length - 1
    }
    else {
      nextTabs = tabs
      nextActiveTab = projectIndex
    }
    this.setState({
      activeTab: nextActiveTab,
      tabs: nextTabs
    })
  }

  closeTab = (tabIndex) => {
    const { 
      activeTab, 
      tabs 
    } = this.state
    let nextTabs = _.clone(tabs)
    let nextActiveTab = (tabIndex <= activeTab ? (activeTab - 1 > 0 ? activeTab - 1 : 0) : activeTab)
    if(nextTabs.length > 1) {
      nextTabs.splice(tabIndex, 1)
    }
    if(nextTabs.length === 1) {
      nextActiveTab = 0
    }
    this.setState({
      activeTab: nextActiveTab,
      tabs: nextTabs
    })
  }

  setActiveProject = (nextActiveProject) => {
    this.setState({
      activeProject: nextActiveProject
    })
  }

  setActiveTab = (nextActiveTab) => {
    this.setState({
      activeTab: nextActiveTab
    })
  }

  render() {
    const {
      isActiveContent,
      projects,
      user
    } = this.props

    const {
      activeTab,
      tabs
    } = this.state

    return (
      <AppContentContainer isActiveContent={isActiveContent}>
        <ProjectsTabs
          activeTab={activeTab} 
          addTab={this.addTab}
          closeTab={this.closeTab}
          projects={projects}
          setActiveProject={this.setActiveProject}
          setActiveTab={this.setActiveTab}
          tabs={tabs}/>
        {tabs.map((activeProject, index) => {
          return (
            <Project
              key={index} 
              activeProject={activeProject}
              activeProjectIndex={index}
              isActiveTab={activeTab === index}
              projects={projects}
              setActiveProject={this.setActiveProject}
              user={user}/>
          )
        })}
      </AppContentContainer>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
`