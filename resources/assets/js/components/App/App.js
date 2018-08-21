//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'

import Projects from './Projects'
import Sidebar from './Sidebar'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class App extends Component {

  state = {
    activeContent: 'PROJECTS'
  }

  setActiveContent = (nextActiveContent) => {
    this.setState({
      activeContent: nextActiveContent
    })
  }

  render() {
    const { 
      activeContent 
    } = this.state

    const {
      projects, 
      user
    } = this.props

    return (
      <Container>
        <Sidebar 
          activeContent={activeContent} 
          setActiveContent={this.setActiveContent}/>
        <Projects 
          isActiveContent={activeContent === 'PROJECTS'}
          projects={projects}
          user={user}/>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``