//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import moment from 'moment'
import { arrayOf, func, shape, string } from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import colors from './config/colors'
import projectsConfig from './config/projects'

import projectDataMap from './constants/projectDataMap'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectTimelineHeader extends Component {

  addOptions = [
    "NOTE"
  ]

  static propTypes = {
    updateProject: func
  }

  static defaultProps = {
    updateProject: () => {console.warn("You need to define an updateProject function for ProjectTimelineHeader to work properly")}
  }

  state = {
    addOptionsVisible: false
  }

  addToTimeline = (type) => {
    const {
      activeProject: {
        id,
        data
      },
      updateProject,
      user
    } = this.props
    // Get the settings for the current type being added
    let currentAddOption = _.cloneDeep(projectDataMap[type])
    // Copy the project's data for the current type being added. If it doesn't
    // exists yet, initialize with an empty array
    let nextArray = (
      typeof(data[currentAddOption.dataKey]) !== "undefined"
      ? data[currentAddOption.dataKey].slice()
      : []
    )
    // Initialize the data for the new object by copying the default values
    let addOptionData = currentAddOption.data
    // Set the createdAt Time
    addOptionData.createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
    // Add the current user as the author
    addOptionData.author = user
    // Set the projectId
    addOptionData.project = {id: id}
    // Push the data to the array
    nextArray.push({
      type: type,
      data: addOptionData,
      editable: true
    })
    // Update the project and collapse the menu
    updateProject("data." + currentAddOption.dataKey, nextArray)
    this.setState({
      addOptionsVisible: false
    })
  }

  toggleAddOptionsVisible = () => {
    const nextAddOptionsVisible = !this.state.addOptionsVisible
    this.setState({
      addOptionsVisible: nextAddOptionsVisible
    })
  }

  render() {
    const {
      addOptionsVisible
    } = this.state

    return (
      <Container>
        <StatusContainer>
          Status
        </StatusContainer>
        <AddContainer>
          <AddButton onClick={this.toggleAddOptionsVisible}>
            <AddButtonIcon>
              <Icon 
                color="white"
                icon="plus"/>
            </AddButtonIcon>
            <AddButtonText>Add</AddButtonText>
          </AddButton>
          <AddOptions isVisible={addOptionsVisible}>
            {this.addOptions.map((option, index) => {
              return (
                <AddOptionsOption
                  key={index}
                  onClick={() => this.addToTimeline(option)}>
                  {projectDataMap[option].text}
                </AddOptionsOption>
              )
            })}
          </AddOptions>
        </AddContainer>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: sticky;
  top: ${projectsConfig.headerHeight};
  margin-bottom: 1vh;
  width: 100%;
  padding: 2vh;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StatusContainer = styled.div``

const AddContainer = styled.div`
  position: relative;
  width: 11vw;
  text-align: right;
`

const AddButton = styled.div`
  cursor: pointer;
  padding: 0.75vh 1.5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.secondary};
  color: white;
  border-radius: 1px;
`

const AddButtonText = styled.div`
  user-select: none;
`

const AddButtonIcon = styled.div``

const AddOptions = styled.div`
  position: absolute;
  z-index: 1;
  display: ${props => props.isVisible ? "block" : "none"};
  width: 100%;
`

const AddOptionsOption = styled.div`
  cursor: pointer;
  user-select: none;
  background-color: white;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};
  padding: 0.75vh 1vh;
  &:hover {
    background-color: ${colors.secondary};
    color: white;
  }
`