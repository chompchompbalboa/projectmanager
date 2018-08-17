//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import projectContentMap from '../constants/projectContentMap'

import projectsConfig from '../config/projects'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectContentTabs = ({ activeTab, changeActiveTab, projectId, tabs }) => {
  return (
    <Container>
      {tabs.map((tab, index) => {
        return (
          <Tab 
            key={index}
            active={activeTab === tab.id}
            onClick={() => changeActiveTab(tab.id)}>
            {projectContentMap[tab.id].text}
          </Tab>
        )
      })}
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectContentTabs.propTypes = {
  tabs: arrayOf(shape({
    text: string
  })),
  projectId: number

}
ProjectContentTabs.defaultProps = {
  tabs: [
    {id: 'TIMELINE'},
    {id: 'FILES'},
    {id: 'FINANCES'},
    {id: 'PURCHASING'},
    {id: 'DESIGN'}
  ],
  projectId: 0
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: sticky;
  top: ${projectsConfig.headerHeight};
  width: 100%;
  background-color: white;
  border-left: 0.5px solid rgb(244, 244, 244);
`

const Tab = styled.div`
  padding: 1vh 1.5vh;
  width: 100%;
  cursor: pointer;
  background-color: ${props => props.active ? projectsConfig.tabActiveBackgroundColor : "transparent"};
  color: ${props => props.active ? "white" : "black"};
  &:hover {
    background-color: ${projectsConfig.tabActiveBackgroundColor};
    color: white;
  }

`

export default ProjectContentTabs