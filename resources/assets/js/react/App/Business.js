//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import AppContentContainer from './AppContentContainer'
import AppContentLeftColumn from './AppContentLeftColumn'
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
    activeTab: 'DASHBOARD'
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
            changeActiveTab={this.changeActiveTab}/>
        </AppContentLeftColumn>
      </AppContentContainer>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``