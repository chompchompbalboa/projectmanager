//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React, { Component } from 'react'
import { bool, func, number, string } from 'prop-types'
import styled from 'styled-components'

import colors from './config/colors'

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
    disabled: bool,
    focus: bool,
    margin: string,
    minHeight: string,
    padding: string,
    placeholder: string,
    rows: number,
    value: string,
    width: string,
    onChange: func
  }

  static defaultProps = {
    backgroundColor: colors.textareaBackground,
    borderColor: "white",
    borderRadius: "0.35em",
    color: "black",
    disabled: false,
    focus: false,
    margin: "0",
    minHeight: "0",
    padding: "0.6vh 0.8vh",
    placeholder: "...",
    rows: 1,
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
      isEditable,
      margin, 
      minHeight, 
      padding,
      placeholder,  
      rows,
      value, 
      width, 
      onChange 
    } = this.props
    return (
      <StyledTextArea
        backgroundColor={isEditable ? backgroundColor : "transparent"}
        borderColor={borderColor}
        borderRadius={borderRadius}
        color={color}
        disabled={!isEditable}
        margin={margin}
        minHeight={minHeight}
        padding={isEditable ? padding : "0"}
        placeholder={placeholder === null ? "" : placeholder}
        rows={rows}
        value={value === null ? "" : value}
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
  border-radius: ${props => props.borderRadius};
  font-size: 0.95em;
  letter-spacing: 0.5px;
  resize: none;
`