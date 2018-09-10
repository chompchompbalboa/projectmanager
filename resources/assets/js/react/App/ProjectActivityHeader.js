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
export default class ProjectActivityHeader extends Component {

  state = {
    addTypesVisible: false,
    filterTypesVisible: false,
  }

  types = [
    "NOTE"
  ]

  static propTypes = {
    hiddenTypes: array
  }

  static defaultProps = {
    hiddenTypes: [
    ]
  }

  addToActivityList = (type) => {
    const {
      addToActivityList
    } = this.props
    addToActivityList(type)
    this.setState({
      addTypesVisible: false
    })
  }

  toggleAddTypesVisible = () => {
    const nextAddTypesVisible = !this.state.addTypesVisible
    this.setState({
      addTypesVisible: nextAddTypesVisible
    })
  }

  toggleFilterTypesVisible = () => {
    const nextFilterTypesVisible = !this.state.filterTypesVisible
    this.setState({
      filterTypesVisible: nextFilterTypesVisible
    })
  }

  toggleFilterOption = (option) => {
    const {
      toggleFilterOption
    } = this.props
    toggleFilterOption(option)
    this.setState({
      filterTypesVisible: false
    })
  }

  render() {
    const {
      hiddenTypes
    } = this.props
    const {
      addTypesVisible,
      filterTypesVisible
    } = this.state

    return (
      <Container>
        <StatusContainer>
          Status
        </StatusContainer>
        <ActionsContainer>
          <ActionContainer>
            <FilterButton onClick={this.toggleFilterTypesVisible}>
              <ActionButtonIcon>
                <Icon 
                  color="white"
                  icon="plus"/>
              </ActionButtonIcon>
              <ActionButtonText>Filter</ActionButtonText>
            </FilterButton>
            <FilterTypes isVisible={filterTypesVisible}>
              {this.types.map((option, index) => {
                return (
                  <FilterTypesOption
                    key={index}
                    filtered={_.indexOf(hiddenTypes, option) > -1}
                    onClick={() => this.toggleFilterOption(option)}>
                    {projectActivityMap[option].text}
                  </FilterTypesOption>
                )
              })}
            </FilterTypes>
          </ActionContainer>
          <ActionContainer>
            <AddButton onClick={this.toggleAddTypesVisible}>
              <ActionButtonIcon>
                <Icon 
                  color="white"
                  icon="plus"/>
              </ActionButtonIcon>
              <ActionButtonText>Add</ActionButtonText>
            </AddButton>
            <AddTypes isVisible={addTypesVisible}>
              {this.types.map((option, index) => {
                return (
                  <AddTypesOption
                    key={index}
                    onClick={() => this.addToActivityList(option)}>
                    {projectActivityMap[option].text}
                  </AddTypesOption>
                )
              })}
            </AddTypes>
          </ActionContainer>
        </ActionsContainer>
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
  margin-bottom: 1vh;
  width: 100%;
  padding: 2vh;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StatusContainer = styled.div``

const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const ActionContainer = styled.div`
  margin-left: 1vw;
  position: relative;
  width: 7vw;
  text-align: right;
`

const ActionButton = styled.div`
  user-select: none;
  cursor: pointer;
  padding: 0.75vh 1.5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  border-radius: 1px;
`

const ActionButtonIcon = styled.div``

const ActionButtonText = styled.div``

const ActionTypes = styled.div`
  position: absolute;
  z-index: 1;
  display: ${props => props.isVisible ? "block" : "none"};
  width: 100%;
`

const ActionTypesOption = styled.div`  
  cursor: pointer;
  user-select: none;
  padding: 0.75vh 1vh;
`

const AddButton = ActionButton.extend`
  background-color: ${colors.secondary};
`

const FilterButton = ActionButton.extend`
  background-color: ${colors.secondary};
`

const AddTypes = ActionTypes.extend`
  display: ${props => props.isVisible ? "block" : "none"};
`

const FilterTypes = ActionTypes.extend`
  display: ${props => props.isVisible ? "block" : "none"};
`

const AddTypesOption = ActionTypesOption.extend`
  background-color: white;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};
  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }
`

const FilterTypesOption = ActionTypesOption.extend`
  background-color: ${props => props.filtered ? "white" : colors.secondary};
  color: ${props => props.filtered ? colors.secondary : "white"};
  border: 1px solid ${colors.secondary};
  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }
`