//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import projectContentMap from './constants/projectContentMap'

import colors from './config/colors'
import layout from './config/layout'
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
  activeTab: string,
  changeActiveTab: func,
  projectId: number,
  tabs: arrayOf(shape({
    text: string
  }))
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  background-color: white;
  border-left: 0.5px solid rgb(244, 244, 244);
`

const Tab = styled.div`
  padding: 1vh 1.5vh;
  width: 100%;
  cursor: pointer;
  background-color: ${props => props.active ? colors.primary : "transparent"};
  color: ${props => props.active ? "white" : "black"};
  &:hover {
    background-color: ${colors.primary};
    color: white;
  }

`

export default ProjectContentTabs