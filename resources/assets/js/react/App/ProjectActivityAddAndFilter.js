//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { array } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import layout from './config/layout'
import colors from './config/colors'

import projectActivityMap from './maps/projectActivityMap'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectActivityAddAndFilter extends Component {

  state = {
    addHover: false,
    filterHover: false
  }

  types = [
    "UPDATE",
    "QUESTION"
  ]

  static propTypes = {
    hiddenTypes: array
  }

  static defaultProps = {
    hiddenTypes: []
  }

  render() {
    const {
      addToActivityList,
      hiddenTypes,
      toggleTypeFilter
    } = this.props

    const {
      addHover,
      filterHover
    } = this.state

    const iconMap = {
      UPDATE: "update",
      QUESTION: "question"
    }

    return (
      <Container>
        {this.types.map((type, index) => {
          const isFiltered = _.indexOf(hiddenTypes, type) > -1
          return (
            <Type
              key={index}>
              <AddContainer
                backgroundColor={addHover === index ? colors.positiveActionColor : colors.sidebar.background}
                onClick={() => addToActivityList(type)}
                onMouseEnter={() => this.setState({ addHover: index })}
                onMouseLeave={() => this.setState({ addHover: false })}>
                <Icon
                  color="white"
                  icon="plus"
                  size="2em"/>
              </AddContainer>
              <FilterContainer
                color={isFiltered ? "rgb(180, 180, 200)": colors.sidebar.background}
                onClick={() => toggleTypeFilter(type)}
                onMouseEnter={() => this.setState({ filterHover: index })}
                onMouseLeave={() => this.setState({ filterHover: false })}>
                <Icon
                  color={isFiltered ? "rgb(180, 180, 200)": colors.sidebar.background}
                  icon={iconMap[type]}
                  size="2em"/>
                <Text>
                  {projectActivityMap[type].text}
                </Text>
              </FilterContainer>
            </Type>
          )
        })}
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: sticky;
  top: ${layout.project.header};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Type = styled.div` 
  cursor: pointer;
  user-select: none;
  width: 100%;
  margin-bottom: 2vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  color: white;
`

const FilterContainer = styled.div`
  padding: 1.25vh;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors.sidebar.background};
  background-color: white;
  color: ${props => props.color};
`

const AddContainer = styled.div`
  margin-left: -1px;
  padding: 1.25vh;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  color: white;
`

const Text = styled.div``