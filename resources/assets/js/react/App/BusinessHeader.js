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
const BusinessHeader = ({ business }) => {
  return (
    <AppContentHeader header={business.name}>
      <Address>
        818 S. Dakota St.<br />
        Seattle, WA 98108
      </Address>
    </AppContentHeader>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
BusinessHeader.propTypes = {
  business: shape({
    name: string
  })
}
BusinessHeader.defaultProps = {
  business: {
    name: "Default Business"
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Address = styled.div`
  margin: 1vh 0;
  font-size: 1.1em;
`

export default BusinessHeader