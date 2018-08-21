//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import SidebarMain from './SidebarMain'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class App extends Component {

  static propTypes = {
    activeContent: string,
    setActiveContent: func
  }

  render() {
    const {
      activeContent,
      setActiveContent
    } = this.props

    return (
      <Container>
        <SidebarMain 
          activeContent={activeContent}
          setActiveContent={setActiveContent}/>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``