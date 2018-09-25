//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import businessContentMap from './maps/businessContentMap'

import AppContentTabs from './AppContentTabs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const BusinessTabs = ({ activeTab, changeActiveTab, tabs }) => {

  return (
    <AppContentTabs 
      activeTab={activeTab}
      changeActiveTab={changeActiveTab}
      map={businessContentMap}
      tabs={tabs}/>
  )
}

export default BusinessTabs