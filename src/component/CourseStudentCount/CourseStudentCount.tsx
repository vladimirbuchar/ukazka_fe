import React from 'react'
import { Grid } from '@material-ui/core'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CustomTextValidator from '../CustomTextValidator/CustomTextValidator'

export default function CourseStudentCount (props: any) {
  const { minimum, onChangeMinimum, maximum, onChangeMaximum } = props
  ValidatorForm.addValidationRule('isValidMinimumStudent', (value: any) => {
    if (value >= 0) {
      if (parseInt(value, 0) <= parseInt(maximum, 0)) {
        return true
      }
    }
    return false
  })
  ValidatorForm.addValidationRule('isValidMaximumStudent', (value: any) => {
    if (value === '') {
      return false
    }
    if (value >= 0) {
      if (parseInt(value, 0) >= parseInt(minimum, 0)) {
        return true
      }
    }
    return false
  })
  const { t } = useTranslation()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('COURSE_STUDENT_COUNT_MINIMUM')}
          onChange={onChangeMinimum}
          name="defaultMinimumStudents"
          value={minimum}
          variant="outlined"
          fullWidth
          id="defaultMinimumStudents"
          type="number"
          InputProps={{ inputProps: { min: 0, max: maximum } }}
          validators={['isGreaterThanZero']}
          errorMessages={[t('VALIDATION_GREATER_THAN_ZERO')]}

        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('COURSE_STUDENT_COUNT_MAXIMUM')}
          onChange={onChangeMaximum}
          name="defaultMaximumStudents"
          value={maximum}
          validators={['isGreaterThanZero']}
          errorMessages={[t('VALIDATION_GREATER_THAN_ZERO')]}
          variant="outlined"
          fullWidth
          id="defaultMaximumStudents"
          type="number"
          InputProps={{ inputProps: { min: minimum } }}
        />
      </Grid>
    </Grid>
  )
}
CourseStudentCount.prototype = {
  minimum: PropTypes.number,
  onChangeMinimum: PropTypes.func,
  maximum: PropTypes.number,
  onChangeMaximum: PropTypes.func
}
