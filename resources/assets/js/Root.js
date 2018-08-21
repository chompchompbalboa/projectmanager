//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App/App.js'
import Loading from './components/App/Loading.js'
import Website from './components/Website/Website.js'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Root extends Component {

  state = {
    loading: true,
    projects: null,
    user: null
  }

  componentDidMount = () => {
    this.fetchInitialData()
  }

  fetchInitialData = () => {
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
      this.setState({
        loading: false,
        projects: response.projects,
        user: response.user
      })
    })
  }

  render() {
    const {
      loading,
      projects,
      user
    } = this.state

    return (
      loading
      ? <Loading />
      : <App 
          projects={projects}
          user={user}/>
    )
  }
}
//-----------------------------------------------------------------------------
// Mount to DOM
//-----------------------------------------------------------------------------
if (document.getElementById('react')) {
    ReactDOM.render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>,
    document.getElementById('react'));
}
