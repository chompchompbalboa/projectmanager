//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { arrayOf, func, shape, string } from 'prop-types'
import styled from 'styled-components'

import colors from '../config/colors'
import projectsConfig from '../config/projects'

import Icon from './Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectTimelineHeader extends Component {

  static propTypes = {
    timelineTypes: arrayOf(shape({
      id: string, 
      text: string
    })),
    updateProject: func
  }

  static defaultProps = {
    timelineTypes: [
      {id: "TO_DO", text: "To Do"},
      {id: "NOTE", text: "Note"}
    ],
    updateProject: () => {console.warn("You need to define an updateProject function for ProjectTimelineHeader to work properly")}
  }

  state = {
    addOptionsVisible: false
  }

  addToTimeline = (type) => {
    const {
      activeProject: {
        timeline: {
          tiles
        }
      },
      updateProject
    } = this.props
    tiles.unshift({
      type: type
    })
    updateProject("timeline.tiles", tiles)
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
      timelineTypes
    } = this.props
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
            {timelineTypes.map((type, index) => {
              return (
                <AddOptionsOption
                  key={index}
                  onClick={() => this.addToTimeline(type.id)}>
                  {type.text}
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