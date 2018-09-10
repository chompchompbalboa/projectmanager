//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import AutosizeTextArea from 'react-autosize-textarea'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class TextArea extends Component {

  static propTypes = {
    backgroundColor: string,
    borderColor: string,
    borderRadius: string,
    color: string,
    margin: string,
    minHeight: string,
    placeholder: string,
    disabled: bool,
    value: string,
    width: string,
    onChange: func
  }

  static defaultProps = {
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: "1em",
    color: "black",
    margin: "0",
    minHeight: "0",
    placeholder: "",
    disabled: false,
    value: "",
    width: "100%",
    onChange: () => {console.warn("You need to define an onChange function for TextArea to work properly")}
  }

  render() {
    const { 
      backgroundColor, 
      borderColor, 
      borderRadius, 
      color, 
      margin, 
      minHeight, 
      placeholder, 
      disabled, 
      value, 
      width, 
      onChange 
    } = this.props
    return (
      <StyledTextArea
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderRadius={borderRadius}
        color={color}
        margin={margin}
        minHeight={minHeight}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        width={width}
        onChange={onChange}/>
    )
  }
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledTextArea = styled(({ backgroundColor, borderColor, borderRadius, color, margin, minHeight, width, innerRef, ...rest }) => <AutosizeTextArea {...rest}/>)`
  margin: ${props => props.margin};
  padding: 0.5em;
  width: ${props => props.width};
  min-height: ${props => props.minHeight};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  outline: none;
  border: 1px solid ${props => props.borderColor};
  border-radius: ${props => props.borderRadius};
  font-size: 0.95em;
  letter-spacing: 0.5px;
  resize: none;
`