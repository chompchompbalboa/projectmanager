//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const Input = ({ backgroundColor, borderColor, borderRadius, color, margin, placeholder, value, width, onChange }) => {
  return (
    <StyledInput
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      color={color}
      margin={margin}
      placeholder={placeholder}
      width={width}
      onChange={onChange}/>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
Input.propTypes = {
  backgroundColor: string,
  borderColor: string,
  borderRadius: string,
  color: string,
  margin: string,
  placeholder: string,
  value: string,
  width: string,
  onChange: func
}
Input.defaultProps = {
  backgroundColor: "white",
  borderColor: "white",
  borderRadius: "1em",
  color: "black",
  margin: "0",
  placeholder: "",
  value: "",
  width: "100%",
  onChange: () => {console.warn("You need to define an onChange function for Input to work properly")}
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledInput = styled.input`
  margin: ${props => props.margin};
  padding: 0.5em 1em;
  width: ${props => props.width};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  outline: none;
  border: 1px solid ${props => props.borderColor};
  border-radius: ${props => props.borderRadius};
  font-size: 0.95em;
  letter-spacing: 0.5px;
`

export default Input