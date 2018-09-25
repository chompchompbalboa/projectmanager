//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Dropdown from './Dropdown'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
@connect(
  state => ({
    business: state.business
  })
)
export default class DropdownEmployees extends Component {

  state = {
    selectedOption: null
  }

  onOptionSelect = (option) => {
    const {
      onOptionSelect
    } = this.props
    this.setState({
      selectedOption: option
    })
    onOptionSelect(option)
  }

  setOptions = () => {
    const {
      business: {
        employees
      }
    } = this.props
    return employees.map((employee, index) => {
      return {
        id: employee.id,
        text: employee.name
      }
    })
  }
  
  render() {
    const {
      business,
      onOptionSelect
    } = this.props
    const {
      selectedOption
    } = this.state
    return (
      <Container>
        <Dropdown
          dropdownVisible={true}
          options={this.setOptions()}
          selectOption={this.onOptionSelect}
          selectedOption={selectedOption}/>
      </Container>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const Container = styled.div``