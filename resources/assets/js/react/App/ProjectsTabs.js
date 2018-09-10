//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import layout from './config/layout'

import ProjectsTabsAddTab from './ProjectsTabsAddTab'
import ProjectsTabsOpenTabs from './ProjectsTabsOpenTabs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectsTabs extends Component {

  render() {
    const { 
      activeTab, 
      addTab,
      closeTab,
      projects,
      setActiveTab, 
      tabs 
    } = this.props

    return (
      <Container>
        <ProjectsTabsOpenTabs 
          activeTab={activeTab}
          closeTab={closeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}/>
        <ProjectsTabsAddTab
          projects={projects}
          addTab={addTab}/>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: ${layout.sidebar.width};
  width: calc(100vw - ${layout.sidebar.width});
  height: ${layout.project.tabsHeight};
  background-color: rgb(200,200,200);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`