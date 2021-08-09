import React, { ChangeEvent, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import { Link as ReactLink } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import PageName from '../../component/PageName/PageName'
import { ValidatorForm } from 'react-material-ui-form-validator'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import PropTypes from 'prop-types'

export default function SignIn (props: any) {
  const { t } = useTranslation()
  const classes = useStyles()
  const [openError, setOpenError] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  const { loginFacebook, loginGoogle, passwordReset, registration } = props
  const handleChangeRememberMe = (event: any) => {
    setRememberMe(event.target.checked)
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = window.location.href
      if (url.indexOf('/elearning/') === -1) {
        window.localStorage.setItem('organizationName', '')
        window.localStorage.setItem('organizationId', '')
        window.localStorage.setItem('logoutUrl', '')
        window.localStorage.setItem('loginUrl', '')
      }
    }
    fetchData()
  }, [])

  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const onHandleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value)
  }
  const onHandlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.currentTarget.value)
  }
  const onLogin = (e: any) => {
    const orgId = window.localStorage.getItem('organizationId') || ''
    axiosInstance.get('web/User/GetUserToken', { params: { UserEmail: userName, UserPassword: userPassword, organizationId: orgId } })
      .then(function (response) {
        loginUser(response)
      })
    e.preventDefault(false)
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }
  const responseGoogle = (response: any) => {
    const orgId = window.localStorage.getItem('organizationId') || ''
    axiosInstance.get('web/User/LoginSocialNetwork', { params: { organizationId: orgId, UserEmail: response.profileObj.email, Id: response.profileObj.googleId, Type: 'GOOGLE', firstName: response.profileObj.givenName, lastName: response.profileObj.familyName, avatar: response.profileObj.imageUrl } })
      .then(function (response) {
        loginUser(response)
      })
  }

  const responseFacebook = (response: any) => {
    const name = response.name
    const arr = name.split(' ')
    let firstName = ''
    let lastName = ''
    if (arr.length > 0) {
      firstName = arr[0]
      arr[0] = ''
      lastName = arr.join().trim().replace(',', ', ')
    }
    const orgId = window.localStorage.getItem('organizationId') || ''
    axiosInstance.get('web/User/LoginSocialNetwork', { params: { UserEmail: response.email, Id: response.id, Type: 'FACEBOOK', firstName: firstName, lastName: lastName, organizationId: orgId } })
      .then(function (response) {
        loginUser(response)
      })
  }
  const loginUser = (response: any) => {
    if (response?.status === 200) {
      sessionStorage.setItem('userToken', response?.data?.data?.token)
      sessionStorage.setItem('userId', response?.data?.data?.id)
      sessionStorage.setItem('userAvatar', response?.data?.data?.avatar)
      sessionStorage.setItem('userAvatarIsUrl', response?.data?.data?.isAvatarUrl)
      sessionStorage.setItem('userAvatarFullName', response?.data?.data?.fullName)
      if (rememberMe) {
        localStorage.setItem('userId', response?.data?.data?.id)
        localStorage.setItem('userToken', response?.data?.data?.token)
      }
      window.location.href = '/dashboard'
    } else {
      setOpenError(true)
      setUserName('')
      setUserPassword('')
    }
  }

  return (
    <Container component="main" maxWidth="xl">
      <PageName title={t('SIGN_IN')} />
      <CustomAlert open={openError} onClose={handleClose} severity="error" message={[t('SIGNIN_BAD_LOGIN')]} />
      <Grid container>
        <Grid item lg={6}>
          <ValidatorForm className={classes.form} onSubmit={onLogin}>

            <CustomTextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label={t('EMAIL_ADDRESS')}
              name="email"
              autoComplete="email"
              value={userName}
              onChange={onHandleUserName}
            />
            <CustomTextValidator
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label={t('PASSWORD')}
              type="password"
              id="password"
              autoComplete='off'
              value={userPassword}
              onChange={onHandlePassword}
            />
            <CustomCheckBox checked={rememberMe} label={t('REMEMBER_ME')} name="remember" onChange={handleChangeRememberMe} />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t('SIGN_IN_BUTTON')}
            </Button>

          </ValidatorForm>
        </Grid>
        <Grid container lg={6} style={{ paddingLeft: '15px' }}>
          {loginGoogle === true &&
            <Grid item xs={12}>
              <GoogleLogin
                clientId="551300145832-bs3phv8qkgvgt90qflevu2dkk9kqk1b1.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </Grid>
          }
          {loginFacebook === true &&
            <Grid item xs={12}>
              <FacebookLogin

                appId="767775187418350"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
              />
            </Grid>}
          {passwordReset === true && <Grid item xs={12} >
            <Link component={ReactLink} to="/passwordreset" variant="body2">
              {t('FORGOT_PASSWORD')}
            </Link>
          </Grid>}
          {registration === true &&
            <Grid item xs={12}>
              <Link component={ReactLink} to="/signup" variant="body2">
                {t('SIGN_UP')}
              </Link>
            </Grid>}
        </Grid>
      </Grid>
    </Container>
  )
}
SignIn.prototype = {
  loginFacebook: PropTypes.bool,
  loginGoogle: PropTypes.bool,
  passwordReset: PropTypes.bool,
  registration: PropTypes.bool
}
