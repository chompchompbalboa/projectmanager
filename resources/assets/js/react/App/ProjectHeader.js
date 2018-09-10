//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { number, shape, string } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'
import layout from './config/layout'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectContentHeader extends Component {

  static propTypes = {
    project: shape({
      id: number,
      code: string,
      name: string
    })
  }

  static defaultProps = {
    project: {
      id: 0,
      code: "000000",
      name: "Default Project"
    }
  }

  render() {
    const {
      activeProject,
      projects
    } = this.props
    return (
      <Container>
        <Info>
          <Name>{activeProject.name}</Name>
          <Code>{activeProject.code}</Code>
        </Info>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  padding: 1.5vh 1vh;
  display: flex;
  align-items: center;
`

const Info = styled.div``

const Name = styled.div`
  font-size: 1.4em;
  font-weight: bold`

const Code = styled.div``