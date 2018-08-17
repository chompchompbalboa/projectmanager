//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
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

    return (
      <Container>
        <Sidebar 
          activeContent={activeContent} 
          setActiveContent={this.setActiveContent}/>
        <Projects 
          isActiveContent={activeContent === 'PROJECTS'}/>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``