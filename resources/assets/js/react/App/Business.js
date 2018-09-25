//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import businessContentMap from './maps/businessContentMap'

import AppContentContainer from './AppContentContainer'
import AppContentLeftColumn from './AppContentLeftColumn'
import AppContentRightColumn from './AppContentRightColumn'
import BusinessHeader from './BusinessHeader'
import BusinessTabs from './BusinessTabs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
@connect(
  state => ({
    business: state.business
  })
)
export default class Business extends Component {

  state = {
    activeTab: 'EMPLOYEES'
  }

  tabs = [
    {id: "DASHBOARD"},
    {id: "EMPLOYEES"},
    {id: "PROJECTS"}
  ]

  buildContent = () => {
    const {
      business
    } = this.props
    const {
      activeTab
    } = this.state
    return this.tabs.map((tab, index) => {
      return React.createElement(
        businessContentMap[tab.id].component,
        {
          key: index,
          business: business,
          isActiveTab: (activeTab === tab.id),
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
      business,
      isActiveContent
    } = this.props
    const {
      activeTab
    } = this.state

    return (
      <AppContentContainer
      isActiveContent={isActiveContent}>
        <AppContentLeftColumn>
          <BusinessHeader 
            business={business}/>
          <BusinessTabs
            activeTab={activeTab}
            changeActiveTab={this.changeActiveTab}
            tabs={this.tabs}/>
        </AppContentLeftColumn>
        <AppContentRightColumn>
          {this.buildContent()}
        </AppContentRightColumn>
      </AppContentContainer>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``