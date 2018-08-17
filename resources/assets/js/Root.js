//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App.js'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Root extends Component {
  render() {
    return (
      <App />
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
