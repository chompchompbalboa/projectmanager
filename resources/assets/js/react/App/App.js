//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { setBusinessStore } from './actions/businessActions'
import { setProjectsStore } from './actions/projectsActions'
import { setUserStore } from './actions/userActions'

import Business from './Business'
import Projects from './Projects'
import Sidebar from './Sidebar'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
@connect(
  null,
  dispatch => ({
    setBusinessStore: (nextStore) => dispatch(setBusinessStore(nextStore)),
    setProjectsStore: (nextStore) => dispatch(setProjectsStore(nextStore)),
    setUserStore: (nextStore) => dispatch(setUserStore(nextStore)),
  })
)
export default class App extends Component {

  state = {
    activeContent: 'BUSINESS',
    loading: true
  }

  componentDidMount = () => {
    this.fetchInitialData()
  }

  fetchInitialData = () => {
    const {
      setBusinessStore,
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
      setBusinessStore(response.business)
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

    return (
      <Container>
        <Sidebar 
          activeContent={activeContent} 
          setActiveContent={this.setActiveContent}/>
        {!loading && <Projects isActiveContent={activeContent === 'PROJECTS'}/>}
        {!loading && <Business isActiveContent={activeContent === 'BUSINESS'}/>}
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``