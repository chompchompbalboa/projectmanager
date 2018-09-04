//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Input = ({ color, disabled, display, fontSize, margin, placeholder, value, width, onChange }) => {
  return (
    <StyledInput
      color={color}
      disabled={disabled}
      display={display}
      fontSize={fontSize}
      margin={margin}
      placeholder={placeholder}
      width={width}
      value={value}
      onChange={onChange}/>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Input.propTypes = {
  color: string,
  disabled: bool,
  fontSize: string,
  margin: string,
  placeholder: string,
  value: string,
  width: string,
  onChange: func
}
Input.defaultProps = {
  color: "black",
  disabled: false,
  fontSize: "1em",
  margin: "0",
  padding: "0",
  placeholder: "",
  value: "",
  width: "100%",
  onChange: () => {console.warn("You need to define an onChange function for Input to work properly")}
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  display: ${props => props.display};
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width};
  background-color: transparent;
  color: ${props => props.color};
  outline: none;
  border: none;
  font-size: ${props => props.fontSize};
`

export default Input