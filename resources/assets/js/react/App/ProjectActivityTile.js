//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import moment from 'moment'
import { bool, func, number, object, shape, string } from 'prop-types'
import styled from 'styled-components'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectTimelineTile extends Component {

  state = {
    saving: false
  }

  static propTypes = {
    author: shape({
      id: number,
      name: string
    }),
    createdAt: string,
    editable: bool,
    updateKey: string,
    updateProject: func
  }

  static defaultProps = {
    editable: false
  }

  componentDidMount = () => {
  }

  formatDate = (date) => {
    return moment(date).format('MMMM Do YYYY, h:mm a')
  }

  saveTile = (saveData) => {
    this.setState({
      saving: true
    })
    const {
      updateProject,
      updateKey
    } = this.props
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    fetch('/app/save', {
      method: "PUT",
      body: JSON.stringify(saveData),
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
        updateProject("data", response.project.data)
      }
    })
  }

  render() {
    const { 
      author, 
      createdAt,
      editable,
      saveData, 
      children 
    } = this.props
    const {
      saving
    } = this.state

    return (
      <Container>
        <Content>
          {children}
        </Content>
        <Footer>
          <Information>
            <Author>{author.name}</Author>
            <CreatedAt>{this.formatDate(createdAt)}</CreatedAt>
          </Information>
          <Actions 
            visible={editable}>
            <SaveButton
              onClick={() => this.saveTile(saveData)}>{saving ? "Saving..." : "Save"}</SaveButton>
          </Actions>
        </Footer>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  margin: 1.5vh 0;
  width: 100%;
  background-color: white;
`

const Content = styled.div`
  padding: 1vh;
  width: 100%;
`

const Footer = styled.div`
  padding: 1vh 2vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(215, 223, 237);
  font-size: 0.8em;
`

const Information = styled.div`
  display: flex;
`

const Author = styled.div`
  margin-right: 0.5vw;
`

const CreatedAt = styled.div`
  font-style: italic;
`

const Actions = styled.div`
  display: ${props => props.visible ? "flex" : "none"};
  justify-content: space-between;
  align-items: center;
`

const ActionButton = styled.div`
  cursor: pointer;
  margin-left: 0.5vw;
  padding: 0.5vh 1.25vh;
  background-color: rgb(50,75,125);
  color: white;
`

const SaveButton = ActionButton.extend``