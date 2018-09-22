//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentTabs = ({ activeTab, changeActiveTab, map, tabs }) => {
  return (
    <Container>
      {tabs.map((tab, index) => {
        return (
          <Tab 
            key={index}
            active={activeTab === tab.id}
            onClick={() => changeActiveTab(tab.id)}>
            {map[tab.id].text}
          </Tab>
        )
      })}
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid ${colors.containerBorderColor};
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

export default AppContentTabs