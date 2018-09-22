//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'

import AutosizeTextArea from 'react-autosize-textarea'

let styledTextArea = null
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
export default class TextArea extends Component {

  componentDidMount = () => {
    this.props.focus && styledTextArea.focus()
  }

  static propTypes = {
    backgroundColor: string,
    borderColor: string,
    borderRadius: string,
    color: string,
    focus: bool,
    margin: string,
    minHeight: string,
    padding: string,
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
    focus: false,
    margin: "0",
    minHeight: "0",
    padding: "0",
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
      padding,
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
        padding={padding}
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
const StyledTextArea = styled(({ backgroundColor, borderColor, borderRadius, color, margin, minHeight, padding, width, innerRef, ...rest }) => <AutosizeTextArea innerRef={c => styledTextArea = c} {...rest}/>)`
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  width: ${props => props.width};
  min-height: ${props => props.minHeight};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  outline: none;
  border: 1px solid ${props => props.borderColor};
  font-size: 0.95em;
  letter-spacing: 0.5px;
  resize: none;
`