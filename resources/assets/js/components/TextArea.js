//-----------------------------------------------------------------------------
// Imports
//-----------------------------------------------------------------------------
import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

import AutosizeTextArea from 'react-autosize-textarea'
//-----------------------------------------------------------------------------
// Component
//-----------------------------------------------------------------------------
const TextArea = ({ backgroundColor, borderColor, borderRadius, color, margin, minHeight, placeholder, value, width, onChange }) => {
  return (
    <StyledTextArea
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      color={color}
      margin={margin}
      minHeight={minHeight}
      placeholder={placeholder}
      width={width}
      onChange={onChange}/>
  )
}
//-----------------------------------------------------------------------------
// Props
//-----------------------------------------------------------------------------
TextArea.propTypes = {
  backgroundColor: string,
  borderColor: string,
  borderRadius: string,
  color: string,
  margin: string,
  minHeight: string,
  placeholder: string,
  value: string,
  width: string,
  onChange: func
}
TextArea.defaultProps = {
  backgroundColor: "white",
  borderColor: "white",
  borderRadius: "1em",
  color: "black",
  margin: "0",
  minHeight: "5em",
  placeholder: "",
  value: "",
  width: "100%",
  onChange: () => {console.warn("You need to define an onChange function for TextArea to work properly")}
}
//-----------------------------------------------------------------------------
// Styled Components
//-----------------------------------------------------------------------------
const StyledTextArea = styled(({ backgroundColor, borderColor, borderRadius, color, margin, minHeight, width, ...rest }) => <AutosizeTextArea {...rest}/>)`
  margin: ${props => props.margin};
  padding: 0.5em 1em;
  width: ${props => props.width};
  min-height: ${props => props.minHeight};
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  outline: none;
  border: 1px solid ${props => props.borderColor};
  border-radius: ${props => props.borderRadius};
  font-size: 0.95em;
  letter-spacing: 0.5px;
`

export default TextArea