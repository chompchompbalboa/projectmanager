//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import _ from 'lodash'

import { updateProject } from './actions/projectsActions'

import projectContentMap from './maps/projectContentMap'

import colors from './config/colors'
import layout from './config/layout'

import AppContentLeftColumn from './AppContentLeftColumn'
import AppContentRightColumn from './AppContentRightColumn'
import ProjectHeader from './ProjectHeader'
import ProjectTabs from './ProjectTabs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
@connect(
  state => ({}),
  dispatch => ({
    updateProject: (projectIndex, key, value) => dispatch(updateProject(projectIndex, key, value))
  })
)
export default class Project extends Component {

  state = {
    activeTab: 'ACTIVITY',
    activeProject: this.props.activeProject
  }

  componentDidUpdate = (prevProps) => {
    if(prevProps.activeProject.id !== this.props.activeProject.id) {
      this.setState({
        activeProject: this.props.activeProject
      })
    }
  }

  buildProjectContent = () => {
    const {
      activeProjectIndex,
      user,
      updateProject
    } = this.props
    const {
      activeProject,
      activeTab
    } = this.state
    return activeProject.tabs.map((tab, index) => {
      return React.createElement(
        projectContentMap[tab.id].component,
        {
          key: index,
          isActiveTab: (activeTab === tab.id),
          activeProject: activeProject,
          activeProjectIndex: activeProjectIndex,
          updateProject: updateProject,
          user: user
        }
      )
    })
  }

  changeActiveTab = (nextActiveTab) => {
    this.setState({
      activeTab: nextActiveTab
    })
  }

  render() {
    const {
      isActiveTab
    } = this.props
    const {
      activeProject,
      activeTab,
      projects
    } = this.state
    
    return (
      <Container
        isActiveTab={isActiveTab}>
        <AppContentLeftColumn
          contentHasTabs>
          <ProjectHeader 
            activeProject={activeProject}
            project={projects}/>
          <ProjectTabs
            activeTab={activeTab}
            changeActiveTab={this.changeActiveTab}
            projectId={activeProject.id}
            tabs={activeProject.tabs}/>
        </AppContentLeftColumn>
        <AppContentRightColumn>
          {this.buildProjectContent()}
        </AppContentRightColumn>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  display: ${props => props.isActiveTab ? "block" : "none"};
`