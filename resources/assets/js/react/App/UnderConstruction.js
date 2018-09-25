//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const UnderConstruction = ({ from, height }) => {
  return (
    <Container
      height={height}>
      <Icon
        icon="construction"
        size="6vh"/>
      <Text>
        We're still working on this part of the app
      </Text>
      <From>
        {from}
      </From>
    </Container>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
UnderConstruction.propTypes = {
  from: string,
  height: string
}
UnderConstruction.defaultProps = {
  from: "",
  height: "100%"
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 1.25em;
`

const Text = styled.div`
  margin-top: 1vh
`

const From = styled.div`
  font-weight: normal;
`

export default UnderConstruction