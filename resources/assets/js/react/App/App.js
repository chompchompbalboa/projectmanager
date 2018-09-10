//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { setProjectsStore } from './actions/projectsActions'
import { setUserStore } from './actions/userActions'

import Projects from './Projects'
import Sidebar from './Sidebar'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
@connect(
  state => ({
    projects: state.projects,
    user: state.user
  }),
  dispatch => ({
    setProjectsStore: (nextStore) => dispatch(setProjectsStore(nextStore)),
    setUserStore: (nextStore) => dispatch(setUserStore(nextStore)),
  })
)
export default class App extends Component {

  state = {
    activeContent: 'PROJECTS',
    loading: true
  }

  componentDidMount = () => {
    this.fetchInitialData()
  }

  fetchInitialData = () => {
    const {
      setProjectsStore,
      setUserStore
    } = this.props
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/app/initial-data', {
      method: "GET",
      credentials: "same-origin",
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
    }}).then(response => {
      return response.json()
    }).then(response => {
      setProjectsStore(response.projects)
      setUserStore(response.user)
      this.setState({
        loading: false
      })
    })
  }

  setActiveContent = (nextActiveContent) => {
    this.setState({
      activeContent: nextActiveContent
    })
  }

  render() {
    const { 
      activeContent,
      loading
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
        {!loading &&
          <Projects 
            isActiveContent={activeContent === 'PROJECTS'}
            projects={projects}
            user={user}/>
        }
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``