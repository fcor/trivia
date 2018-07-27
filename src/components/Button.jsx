import React from 'react'

const Button = ({children, onClick}) =>
  <button
    onClick = {onClick}
    className="button">
    {children}
  </button>

export default Button
