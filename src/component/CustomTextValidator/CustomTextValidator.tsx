import React from 'react'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import validator from 'validator'

export default function CustomTextValidator (props: any) {
  ValidatorForm.addValidationRule('isGreaterThanZero', (value: Number) => {
    return value >= 0
  })
  ValidatorForm.addValidationRule('isValidPrice', (value: number) => {
    return value >= 0
  })
  ValidatorForm.addValidationRule('isValidSale', (value: number) => {
    return value >= 0 && value <= 100
  })
  ValidatorForm.addValidationRule('isPhoneNumber', (value) => {
    if (value === '') {
      return true
    }
    const isValidPhoneNumber = validator.isMobilePhone(value)
    return (isValidPhoneNumber)
  })
  ValidatorForm.addValidationRule('isValidUrl', (value) => {
    if (value === '') {
      return true
    }
    const isValidUrl = validator.isURL(value)
    return (isValidUrl)
  })
  return (<TextValidator {...props} />)
}
