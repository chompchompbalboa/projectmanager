//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import projectContentMap from '../constants/projectContentMap'

import projectsConfig from '../config/projects'
import sidebarConfig from '../config/sidebar'

import ProjectHeader from './ProjectHeader'
import ProjectTabs from './ProjectTabs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Project extends Component {

  state = {
    activeTab: 'TIMELINE',
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
          updateProject: this.updateProject
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
      activeProject,
      activeTab
    } = this.state

    return (
      <Container>
        <ProjectHeader 
          project={activeProject}/>
        <ProjectContent>
          <ProjectContentLeftColumn>
            {this.buildProjectContent()}
          </ProjectContentLeftColumn>
          <ProjectContentRightColumn>
            <ProjectTabs
              activeTab={activeTab}
              changeActiveTab={this.changeActiveTab}
              projectId={activeProject.id}
              tabs={activeProject.tabs}/>
          </ProjectContentRightColumn>
        </ProjectContent>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: fixed;
  top: 0;
  left: ${sidebarConfig.mainWidth + sidebarConfig.activeWidth + "vw"};
  width: calc(100vw - ${sidebarConfig.mainWidth + sidebarConfig.activeWidth + "vw"});
  height: 100vh;
  overflow-y: scroll;
`

const ProjectContent = styled.div`
  padding: ${projectsConfig.containerPadding};
  display: flex;
  justify-content: space-between;
`

const ProjectContentLeftColumn = styled.div`
  width: calc(83% - (${projectsConfig.containerPadding} / 2));
`

const ProjectContentRightColumn = styled.div`
  width: 17%;
`