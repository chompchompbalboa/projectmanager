//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const AppContentHeader = ({ header, children }) => {

  return (
    <Container>
      <Header>{header}</Header>
      <Subheader>{children}</Subheader>
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
AppContentHeader.propTypes = {
  header: string
}
AppContentHeader.defaultProps = {
  header: "Default Header"
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  padding: 1.5vh 1vh;
`

const Header = styled.div`
  font-size: 1.4em;
  font-weight: bold`

const Subheader = styled.div``

export default AppContentHeader