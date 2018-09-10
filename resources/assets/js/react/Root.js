//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './App/reducers/reducers'
import { BrowserRouter } from 'react-router-dom'

import App from './App/App.js'
import Loading from './App/Loading.js'
import Website from './Website/Website.js'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Root extends Component {

  store = createStore(reducers)

  render() {

    return (
      <ReduxProvider store={this.store}>
        <App />
      </ReduxProvider>
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
