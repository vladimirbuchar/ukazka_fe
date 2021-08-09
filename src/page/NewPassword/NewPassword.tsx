import { Avatar, Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useStyles from '../../styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { axiosInstance } from '../../axiosInstance'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { ValidatorForm } from 'react-material-ui-form-validator'
import SetNewPassword from '../../WebModel/User/SetNewPassword'
import GetUrlParam from '../../core/GetUrlParam'

export default function NewPassword () {
  const { t } = useTranslation()
  const classes = useStyles()

  const [password1, setPassword1] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const [passwordChanged, setPasswordChanged] = React.useState(false)
  const handleChangePassword1 = (e: any) => {
    setPassword1(e.currentTarget.value)
  }

  const handleChangePassword2 = (e: any) => {
    setPassword2(e.currentTarget.value)
  }
  ValidatorForm.addValidationRule('isPasswordMatch', () => {
    if (password1 !== password2) {
      return false
    }
    return true
  })

  const onResetPassword = (e: any) => {
    const obj = new SetNewPassword(GetUrlParam('id'), password1, password2)
    axiosInstance.put('web/User/SetNewPassword', obj)
      .then(function () {
        setPasswordChanged(true)
      })
    e.preventDefault(false)
  }
  return (<Container component="main" maxWidth="xs">

    <div className={classes.paper}>

      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t('NEW_PASSWORD_SETTING')}
      </Typography>
      {passwordChanged === false &&
      <ValidatorForm className={classes.form}
        onSubmit={onResetPassword}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextValidator
              label={t('NEW_PASSWORD_PASSWORD')}
              onChange={handleChangePassword1}
              name="password"
              value={password1}
              validators={['required']}
              errorMessages={[t('VALIDATION_REQUIRED')]}
              variant="outlined"
              fullWidth
              id="password"
              autoComplete="current-password"
              type="password"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextValidator
              label={t('NEW_PASSWORD_PASSWORD_AGAIN')}
              onChange={handleChangePassword2}
              name="repeatPassword"
              value={password2}
              validators={['isPasswordMatch', 'required']}
              errorMessages={[t('VALIDATION_PASSWORD'), t('VALIDATION_REQUIRED')]}
              variant="outlined"
              fullWidth
              id="repeatPassword"
              autoComplete="current-password"
              type="password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {t('NEW_PASSWORD_RESET_BUTTON')}
        </Button>
      </ValidatorForm>
      }
      {passwordChanged === true && t('PASSWORD_WAS_CHANGE')
      }

    </div>

  </Container>

  )
}
