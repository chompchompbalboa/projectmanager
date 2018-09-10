//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import projectContentMap from './maps/projectContentMap'

import colors from './config/colors'
import layout from './config/layout'

import ProjectHeader from './ProjectHeader'
import ProjectTabs from './ProjectTabs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
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
      user
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
          updateProject: this.updateProject,
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

  updateProject = (key, value) => {
    const {
      activeProject
    } = this.state
    const nextActiveProject = _.set(Object.assign({}, activeProject), key, value)
    this.setState({
      activeProject: nextActiveProject
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
        <LeftColumn>
          <ProjectHeader 
            activeProject={activeProject}
            project={projects}/>
          <ProjectTabs
            activeTab={activeTab}
            changeActiveTab={this.changeActiveTab}
            projectId={activeProject.id}
            tabs={activeProject.tabs}/>
        </LeftColumn>
        <RightColumn>
          {this.buildProjectContent()}
        </RightColumn>
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

const LeftColumn = styled.div`
  position: fixed;
  top: calc(${layout.project.tabsHeight} + ${layout.project.containerPadding});
  left: calc(${layout.sidebar.width} + ${layout.project.containerPadding});
  width: ${layout.project.leftColumnWidth};
  height: 100vh;
  overflow-y: scroll;
  background-color: ${colors.siteBackground};
`

const RightColumn = styled.div`
  position: fixed;
  top: calc(${layout.project.tabsHeight} + ${layout.project.containerPadding});
  left: calc(${layout.sidebar.width} + ${layout.project.containerPadding} + ${layout.project.leftColumnWidth} + ${layout.project.containerPadding});
  width: calc(100vw - ${layout.sidebar.width} - ${layout.project.containerPadding} - ${layout.project.leftColumnWidth} - ${layout.project.containerPadding} - ${layout.project.containerPadding});
  height: calc(100vh - ${layout.project.tabsHeight} - ${layout.project.containerPadding} - ${layout.project.containerPadding});
  overflow-y: scroll;
  background-color: ${colors.siteBackground};
`