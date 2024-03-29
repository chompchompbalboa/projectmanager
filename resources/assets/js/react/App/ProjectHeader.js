//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'

import AppContentHeader from './AppContentHeader'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const ProjectHeader = ({ activeProject }) => {

  return (
    <AppContentHeader header={activeProject.name}>
      {activeProject.code}
    </AppContentHeader>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
ProjectHeader.propTypes = {
  activeProject: shape({
    code: string,
    name: string
  })
}
ProjectHeader.defaultProps = {
  activeProject: {
    code: "000000",
    name: "Default Project"
  }
}

export default ProjectHeader