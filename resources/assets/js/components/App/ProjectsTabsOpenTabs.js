//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import colors from './config/colors'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectsTabsOpenTabs extends Component {
  
  state = {
    closeTabHover: null
  }

  closeTab = (index) => {
    const {
      closeTab
    } = this.props
    closeTab(index)
    this.setState({
      closeTabHover: null
    })
  }

  render() {
    const {
      activeTab,
      closeTab,
      setActiveTab,
      tabs
    } = this.props
    const {
      closeTabHover
    } = this.state
    return (
      <React.Fragment>
        {tabs.map((tab, index) => {
          const isActiveTab = (activeTab === index)
          return (
            <Tab
              key={index}
              isActiveTab={isActiveTab}
              isFirstTab={index === 0}
              siteBackground={colors.siteBackground}
              darkBackground={"black"}>
              <ChangeTab
                onClick={() => setActiveTab(index)}>
                <TabText>
                  {tab.name}
                </TabText>
              </ChangeTab>
              <CloseTabContainer
                onClick={() => this.closeTab(index)}
                onMouseEnter={() => this.setState({ closeTabHover: index })}
                onMouseLeave={() => this.setState({ closeTabHover: null })}>
                <Icon 
                  color={isActiveTab ? (closeTabHover === index ? "white" : "black") : "white"}
                  icon="exit"
                  size="1em"/>
              </CloseTabContainer>
            </Tab>
          )
        })}
      </React.Fragment>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Tab = styled.div`
  margin-left: ${props => props.isFirstTab ? "0" : "-0.5vw"};
  position: relative;
  cursor: pointer;
  height: 100%;
  background-color: ${props => props.isActiveTab ? props.siteBackground : "rgb(40, 44, 55)"};
  color: ${props => props.isActiveTab ? "black" : "rgb(245,245,245)"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  &:after {
    height: 100%;
    width: 100%;
    background-color: rgb(200,200,200);
    position: absolute;
    content: "";
    transform: rotate(65deg);
    transform-origin: bottom right;
  }
`

const ChangeTab = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const TabText = styled.div`
  vertical-align: center;
  margin-left: 1vw;
  padding-right: 2vw;
  font-size: 0.95em;
`

const CloseTabContainer = styled.div`
  margin-right: 1.25vw;
  width: 1.25em;
  height: 1.25em;
  border-radius: 0.625em;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${colors.primary};
  }
`