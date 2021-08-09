import React from 'react'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CustomTextValidator from '../CustomTextValidator/CustomTextValidator'

export default function ContactField (props: any) {
  const { onChangeEmail, email, onChangePhoneNumber, phoneNumber, onChangeWWW, www } = props
  const { t } = useTranslation()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('CONTACT_FIELD_EMAIL')}
          onChange={onChangeEmail}
          name="email"
          value={email}
          variant="outlined"
          fullWidth
          id="email"
          validators={['isEmail']}
          errorMessages={[t('VALIDATION_EMAIL')]}
          type="email"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('CONTACT_FIELD_PHONE')}
          onChange={onChangePhoneNumber}
          name="phoneNumber"
          value={phoneNumber}
          variant="outlined"
          fullWidth
          id="phoneNumber"
          validators={['isPhoneNumber']}
          errorMessages={[t('VALIDATION_PHONE')]}
          type="tel"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('CONTACT_FIELD_WWW')}
          onChange={onChangeWWW}
          name="www"
          value={www}
          variant="outlined"
          fullWidth
          id="www"
          validators={['isValidUrl']}
          errorMessages={[t('VALIDATION_URL')]}
          type="url"
        />
      </Grid>

    </Grid>
  )
}
ContactField.prototype = {
  onChangeEmail: PropTypes.func,
  email: PropTypes.string,
  onChangePhoneNumber: PropTypes.func,
  phoneNumber: PropTypes.string,
  onChangeWWW: PropTypes.func,
  www: PropTypes.string
}
