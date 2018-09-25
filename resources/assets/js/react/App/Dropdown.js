//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

import colors from './config/colors'
import layout from './config/layout'

import Icon from '../lib/Icon/Icon'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class Dropdown extends Component {

  state = {
    dropdownVisible: this.props.dropdownVisible,
    highlightedIndex: null,
    listedOptions: this.props.options,
    searchValue: ""
  }

  componentDidMount = () => {
    const {
      selectedOption
    } = this.props
    const {
      dropdownVisible
    } = this.state
    dropdownVisible && this.searchInput.focus()
    selectedOption === null && document.addEventListener('keydown', this.handleKeyDown, false)
  }

  componentDidUpdate = () => {
    const {
      selectedOption
    } = this.props
    const {
      dropdownVisible
    } = this.state
    dropdownVisible && this.searchInput.focus()
    selectedOption === null && document.addEventListener('keydown', this.handleKeyDown, false)
    selectedOption !== null && document.removeEventListener('keydown', this.handleKeyDown, false)
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.checkForClickOutside, false)
    document.removeEventListener('keypress', this.handleKeyDown, false)
  }

  changeSearchValue = (e) => {
    const {
      selectOption
    } = this.props
    const {
      dropdownVisible
    } = this.state
    selectOption(null)
    let nextSearchValue = e.target.value
    let nextListedOptions = this.filterListedOptions(nextSearchValue)
    let nextHighlightedIndex = null
    if (nextListedOptions.length === 1) {
      nextHighlightedIndex = 0
    }
    this.setState({
      dropdownVisible: true,
      listedOptions: nextListedOptions,
      highlightedIndex: nextHighlightedIndex,
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
      highlightedIndex,
      listedOptions
    } = this.state
    const {
      selectOption
    } = this.props

    if(e.keyCode == 13) { // Enter
      if(highlightedIndex !== null) {
        this.selectOption(listedOptions[highlightedIndex])
        this.toggleDropdown()
      }
    }
  }

  filterListedOptions = (searchValue) => {
    const {
      options
    } = this.props

    return options.filter((option) => {
      const stringToSearch = option.text
      const searchValueInString = stringToSearch.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      if (searchValueInString) {
        return option
      }
    })
  }

  handleClickOutside = () => {
    this.setState({
      dropdownVisible: false
    })
  }

  handleOptionClick = (option) => {
    const {
      selectOption
    } = this.props
    selectOption(option)
    this.toggleDropdown()
  }
  
  selectOption = (option) => {
    const {
      selectOption
    } = this.props
    selectOption(option)
  }

  toggleDropdown = () => {
    const {
      options
    } = this.props
    const {
      dropdownVisible
    } = this.state

    const nextDropdownVisible = !dropdownVisible
    if (nextDropdownVisible) {
      document.addEventListener('mousedown', this.checkForClickOutside, false)
    }
    else {
      document.removeEventListener('mousedown', this.checkForClickOutside, false)
    }
    this.setState({
      dropdownVisible: nextDropdownVisible,
      highlightedProjectId: null,
      listedOptions: options,
      searchValue: ""
    })
  }
  
  render() {
    const {
      selectedOption
    } = this.props
    const {
      dropdownVisible,
      highlightedIndex,
      listedOptions,
      searchValue
    } = this.state
    
    return (
      <Container
        innerRef={c => this.container = c}>
        <VisibleContainer
          onClick={this.toggleDropdown}>
          <StyledInput
            innerRef={c => this.searchInput = c}
            size={searchValue.length === 0 ? (selectedOption === null ? 1 : selectedOption.text.length) : searchValue.length}
            value={selectedOption ? selectedOption.text : searchValue}
            onChange={this.changeSearchValue}/>
        </VisibleContainer>
        <DropdownContainer
          visible={dropdownVisible}>
          <AddTabOptionsContainer>
            {listedOptions.map((option, index) => {
              return (
                <AddTabProject
                  key={index}
                  isHighlighted={highlightedIndex === index}
                  onClick={() => this.handleOptionClick(option)}>
                  {option.text}
                </AddTabProject>
              )
            })}
          </AddTabOptionsContainer>
        </DropdownContainer>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div`
  position: relative;
  margin-left: 0.1vw;
`

const VisibleContainer = styled.div``

const DropdownContainer = styled.div`
  z-index: 100;
  visibility: ${props => props.visible ? "auto" : "hidden"};
  position: absolute;
  margin-top: 1vh;
  width: 20vw;
  overflow-y: hidden;
  background-color: white;
  border: 1px solid ${colors.containerBorderColor};
`

const StyledInput = styled.input`
  padding: 0;
  border: none;
  outline: none;
  font-size: 1em;
  font-weight: 700;
  text-align: center;
`

const AddTabOptionsContainer = styled.div`
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