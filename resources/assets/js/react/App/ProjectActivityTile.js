//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import moment from 'moment'
import { bool, func, number, object, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import colors from './config/colors'

import { deleteProjectData } from './actions/projectsActions'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
@connect(
  state => ({}),
  dispatch => ({
    deleteProjectData: (activeProjectIndex, dataType, id) => dispatch(deleteProjectData(activeProjectIndex, dataType, id))
  })
)
export default class ProjectActivityTile extends Component {

  state = {
    saving: false
  }

  static propTypes = {
    author: shape({
      id: number,
      name: string
    }),
    createdAt: string,
    isEditable: bool,
    icon: string,
    updateKey: string,
    updateProject: func
  }

  static defaultProps = {
    isEditable: false
  }

  deleteTile = (tileData) => {
    const {
      activeProjectIndex,
      deleteProjectData
    } = this.props
    deleteProjectData(activeProjectIndex, tileData.type, tileData.id)
    if(tileData.id > 0) {
      const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      fetch('/app/delete', {
        method: "DELETE",
        body: JSON.stringify(tileData),
        credentials: "same-origin",
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': token
      }}).then(response => {
        return response.json()
      }).then(response => {
        if (response.success) {
          console.log(response)
        }
      })
    } 
  }

  saveTile = (tileData) => {
    this.setState({
      saving: true
    })
    const {
      activeProjectIndex,
      updateProject,
      updateKey
    } = this.props
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/app/save', {
      method: "PUT",
      body: JSON.stringify(tileData),
      credentials: "same-origin",
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRF-TOKEN': token
    }}).then(response => {
      return response.json()
    }).then(response => {
      if (response.success) {
        this.setState({
          saving: false
        })
        updateProject(activeProjectIndex, updateKey, response.data)
      }
    })
  }

  render() {
    const { 
      isEditable,
      isFirst,
      isLast,
      icon,
      message,
      tileData, 
      children 
    } = this.props
    const {
      saving
    } = this.state

    return (
      <Container>
        <FeedLineContainer>
          <Line visible={!isFirst}/>
          <IconContainer>
            <Icon
              size="3vh"
              icon={icon}/>
          </IconContainer>
          <Line visible={!isLast}/>
        </FeedLineContainer>
        <ContentContainer>
          <Header>
            <Description>
              <Author>{tileData.data.author.name}</Author>
              <Message>&nbsp;{message}</Message>
            </Description>
            <Date>
              <CreatedAt>{moment(tileData.data.createdAt).format('MMMM Do, h:mm a')}</CreatedAt>
            </Date>
          </Header>
          <Divider />
          <Body>
            <Content>
              {children}
            </Content>
            <Actions 
              visible={isEditable}>
              <SaveButton
                onClick={() => this.saveTile(tileData)}>{saving ? "Saving..." : "Save"}</SaveButton>
              <DeleteButton
                onClick={() => this.deleteTile(tileData)}>Delete</DeleteButton>
            </Actions>
          </Body>
        </ContentContainer>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  width: 100%;
  display: flex;
`

const FeedLineContainer = styled.div`
  width: 7.5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Line = styled.div`
  width 1px;
  background-color: ${props => props.visible ? colors.containerBorderColor : "transparent"};
  height: calc((100% - 5vh) / 2);
`

const IconContainer = styled.div`
  height: 5vh;
  width: 5vh;
  border: 1px solid ${colors.containerBorderColor};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`

const ContentContainer = styled.div`
  margin: 1vh 0;
  padding: 1vw;
  width: 100%;
  background-color: white;
  border: 1px solid ${colors.containerBorderColor};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Description = styled.div`
  display: flex;
`

const Author = styled.div`
  font-weight: 700;
`

const Message = styled.div``

const Content = styled.div`
  width: 100%;
`

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Date = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  color: rgb(90,90,90);
`

const CreatedAt = styled.div`
  font-style: italic;
  text-align: center;
`

const Divider = styled.div`
  margin: 1vh 0;
  height: 1px;
  background-color: ${colors.containerBorderColor};
  width: 100%;
`

const Actions = styled.div`
  width: 15%;
  display: ${props => props.visible ? "flex" : "none"};
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const ActionButton = styled.div`
  width: 100%;
  cursor: pointer;
  margin-bottom: 0.5vh;
  padding: 0.5vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.sidebar.background};
  color: white;
`

const SaveButton = ActionButton.extend`
  &:hover {
    background-color: ${colors.positiveActionColor};
  }
`
const DeleteButton = ActionButton.extend`
  &:hover {
    background-color: ${colors.negativeActionColor};
  }
`