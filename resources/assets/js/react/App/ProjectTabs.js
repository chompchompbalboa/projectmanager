//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import styled from 'styled-components'

import projectContentMap from './maps/projectContentMap'

import AppContentTabs from './AppContentTabs'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectTabs = ({ activeTab, changeActiveTab, tabs }) => {
  return (
    <AppContentTabs 
      activeTab={activeTab}
      changeActiveTab={changeActiveTab}
      map={projectContentMap}
      tabs={tabs}/>
  )
}

export default ProjectTabs