import { Button, Container } from '@material-ui/core'
import React, { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import useStyles from '../../styles'
import { axiosInstance } from '../../axiosInstance'
import { getLanguage } from '../../i18n'
import GeneratePasswordResetEmail from '../../WebModel/User/GeneratePasswordResetEmail'
import { ValidatorForm } from 'react-material-ui-form-validator'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import PageName from '../../component/PageName/PageName'

export default function PasswordReset () {
  const { t } = useTranslation()
  const classes = useStyles()
  const [userName, setUserName] = React.useState('')
  const [emailWasSend, setEmailWasSend] = React.useState(false)
  const onHandleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value)
  }
  const onResetPassword = (e: any) => {
    const obj = new GeneratePasswordResetEmail(userName, getLanguage())
    axiosInstance.post('web/User/GeneratePasswordResetEmail', obj)
      .then(function () {
        setEmailWasSend(true)
      })
    e.preventDefault(false)
  }
  return (<Container component="main" maxWidth="xl">

    <PageName title={t('PASSWORD_RESET_TITLE')} />

    {emailWasSend === false && <ValidatorForm className={classes.form}
      onSubmit={onResetPassword}>
      <CustomTextValidator
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label={t('PASSWORD_RESET_EMAIL_ADDRESS')}
        name="email"
        autoFocus
        validators={['required']}
        errorMessages={[t('VALIDATION_REQUIRED')]}
        value={userName}
        onChange={onHandleUserName}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {t('PASSWORD_RESET_BUTTON')}
      </Button>
    </ValidatorForm>}
    {emailWasSend === true &&
          t('PASSWORD_RESET_EMAIL_WAS_SEND')
    }

  </Container>

  )
}
