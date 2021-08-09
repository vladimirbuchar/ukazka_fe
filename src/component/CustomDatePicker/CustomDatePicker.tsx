import React from 'react'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

export default function CustomDatePicker (props: any) {
  const { selectedDate, onChangeDate, label, disablePast, minDate } = props

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid>
        <KeyboardDatePicker
          fullWidth
          disablePast={disablePast}
          minDate={minDate}
          disableToolbar
          variant="inline"
          format="dd.MM.yyyy"
          margin="normal"
          id="date-picker-inline"
          label={label}
          value={selectedDate}
          onChange={onChangeDate}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>

  )
}
CustomDatePicker.prototype = {
  selectedDate: PropTypes.any,
  onChangeDate: PropTypes.func,
  label: PropTypes.string,
  disablePast: PropTypes.bool,
  minDate: PropTypes.any

}
