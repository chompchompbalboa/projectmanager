//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import colors from './config/colors'
import layout from './config/layout'

import Icon from '../lib/Icon/Icon'
import Input from './Input'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class ProjectsTabsAddTab extends Component {

  state = {
    dropdownVisible: false,
    highlightedProjectId: null,
    listedProjects: this.props.projects,
    searchValue: ""
  }

  componentDidMount = () => {
    this.searchInput.focus()
  }

  componentDidUpdate = () => {
    this.searchInput.focus()
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.checkForClickOutside, false)
    document.removeEventListener('keypress', this.checkForEnterKey, false)
  }

  changeSearchValue = (e) => {
    const {
      activeProject,
      addTab,
      projects
    } = this.props
    const {
      dropdownVisible
    } = this.state

    let nextSearchValue = e.target.value
    let nextListedProjects = this.filterListedProjects(nextSearchValue)
    let nextHighlightedProjectId = null
    if (nextListedProjects.length === 1) {
      nextHighlightedProjectId = nextListedProjects[0].id
    }
    this.setState({
      listedProjects: nextListedProjects,
      highlightedProjectId: nextHighlightedProjectId,
      searchValue: nextSearchValue
    })
  }

  checkForClickOutside = (e) => {
    if(this.container.contains(e.target)) {
      return
    }
    else {
      this.toggleDropdown()
    }
  }

  handleKeyDown = (e) => {
    const {
      highlightedProjectId,
      listedProjects
    } = this.state
    const {
      addTab,
      projects
    } = this.props

    if(e.keyCode == 13) { // Enter
      if(highlightedProjectId !== null) {
        addTab(_.find(projects, {id: highlightedProjectId}))
        this.toggleDropdown()
      }
    }
  }

  filterListedProjects = (searchValue) => {
    const {
      projects
    } = this.props

    return projects.filter((project) => {
      const stringToSearch = project.code + " - " + project.name
      const searchValueInString = stringToSearch.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      if (searchValueInString) {
        return project
      }
    })
  }

  handleClickOutside = () => {
    this.setState({
      dropdownVisible: false
    })
  }

  handleProjectClick = (project) => {
    const {
      addTab
    } = this.props

    addTab(project)
    this.toggleDropdown()
  }

  toggleDropdown = () => {
    const {
      projects
    } = this.props
    const {
      dropdownVisible
    } = this.state

    const nextDropdownVisible = !dropdownVisible
    if (nextDropdownVisible) {
      document.addEventListener('mousedown', this.checkForClickOutside, false)
      document.addEventListener('keydown', this.handleKeyDown, false)
    }
    else {
      document.removeEventListener('mousedown', this.checkForClickOutside, false)
      document.removeEventListener('keydown', this.handleKeyDown, false)
    }
    this.setState({
      dropdownVisible: nextDropdownVisible,
      highlightedProjectId: null,
      listedProjects: projects,
      searchValue: ""
    })
  }
  
  render() {
    const {
      addTab
    } = this.props
    const {
      dropdownVisible,
      highlightedProjectId,
      listedProjects,
      searchValue
    } = this.state
    
    return (
      <React.Fragment>
        <AddTabContainer
          innerRef={c => this.container = c}>
          <AddTabIconContainer
            onClick={this.toggleDropdown}>
            <Icon 
              color="white"
              icon={dropdownVisible ? "exit" : "plus"}
              size={dropdownVisible ? "1em" : "1.125em"}/>
          </AddTabIconContainer>
          <AddTabDropdown
            visible={dropdownVisible}>
            <StyledInput
              innerRef={c => this.searchInput = c}
              value={searchValue}
              onChange={this.changeSearchValue}/>
            <AddTabProjectsContainer>
              {listedProjects.map((project, index) => {
                return (
                  <AddTabProject
                    key={index}
                    isHighlighted={highlightedProjectId === project.id}
                    onClick={() => this.handleProjectClick(project)}>
                    {project.name}
                  </AddTabProject>
                )
              })}
            </AddTabProjectsContainer>
          </AddTabDropdown>
        </AddTabContainer>
      </React.Fragment>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const AddTabContainer = styled.div`
  position: relative;
  margin-left: 0.1vw;
`

const AddTabIconContainer = styled.div`  
  cursor: pointer;
  width: 1.25em;
  height: 1.25em;
  border-radius: 0.625em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  &:hover {
    background-color: ${colors.primary};
  }
`

const AddTabDropdown = styled.div`
  visibility: ${props => props.visible ? "auto" : "hidden"};
  position: absolute;
  margin-top: 1vh;
  width: 20vw;
  overflow-y: hidden;
  background-color: white;
  border: 1px solid ${colors.containerBorderColor};
`

const StyledInput = styled.input`
  padding: 1.5vh 0 1vh 0;
  margin-left: 1vw
  width: calc(100% - 2vw);
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(225,225,255);
  font-size: 1em;
`

const AddTabProjectsContainer = styled.div`
  margin: 1vh 0;
  max-height: 55vh;
  overflow-y: scroll;
`

const AddTabProject = styled.div`
  cursor: pointer;
  padding: 1vh 1vw;
  background-color: ${props => props.isHighlighted ? colors.primary : "white"};
  color: ${props => props.isHighlighted ? "white" : "black"};
  &:hover {
    background-color: ${colors.primary};
    color: white;
  }
`