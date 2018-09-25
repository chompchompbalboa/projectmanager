//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import AppContentContainer from './AppContentContainer'
import UnderConstruction from './UnderConstruction'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Settings extends Component {

  render() {
    const {
      isActiveContent
    } = this.props

    return (
      <AppContentContainer
      isActiveContent={isActiveContent}>
        <UnderConstruction
          from="Settings"
          height="100vh"/>
      </AppContentContainer>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``