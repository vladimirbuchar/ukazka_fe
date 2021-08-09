import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import PropTypes from 'prop-types'

export default function CustomCheckBox (props: any) {
  const { checked, onChange, name, label } = props
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          name={name}
          color="primary"
          {...props}
        />
      }
      label={label}
    />
  )
}
CustomCheckBox.prototype = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string
}
