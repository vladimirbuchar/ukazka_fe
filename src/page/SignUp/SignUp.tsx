import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import useStyles from '../../styles'
import { Container } from '@material-ui/core'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { axiosInstance } from '../../axiosInstance'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import AddUser from '../../WebModel/User/AddUser'
import { Person } from '../../WebModel/Shared/Person'
import { getLanguage } from './../../i18n'
import PageName from '../../component/PageName/PageName'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import OrganizationEditBaseSetting from '../OrganizationEdit/OrganizationEditBaseSetting'
import { AddOrganization } from '../../WebModel/Organization/AddOrganization'
import { CodeBookItem } from '../../WebModel/Shared/CodeBookItem'
import { ContactInformation } from '../../WebModel/Shared/ContactInformation'
import { Address } from '../../WebModel/Shared/Address'
import GetUserToken from '../../core/GetUserToken'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { GetCodeBookDefaultValue } from '../../core/GetCodeBookDefaultValue'
export default function SignUp (props: any) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [registrationOk, setRegistrationOk] = React.useState(false)
  const [createNewOrganization, setCreateNewOrganization] = React.useState(false)
  const [organizatioName, setOrganizationName] = React.useState('')
  const [organizationDescription, setOrganizationDescription] = React.useState('')
  const [sendInquiryCourse, setSendInquiryCourse] = React.useState(false)
  const { cbCountry, cbAddressType } = props
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [countryContact, setCountryContact] = useState('')
  const [regionContact, setRegionContact] = useState('')
  const [cityContact, setCityContact] = useState('')
  const [streetContact, setStreetContact] = useState('')
  const [houseNumberContact, setHouseNumberContact] = useState('')
  const [zipCodeContact, setZipCodeContact] = useState('')
  const [contactEmail, setContactEmail] = React.useState('')
  const [contactPhone, setContactPhone] = React.useState('')
  const [contactWWW, setContactWWW] = React.useState('')
  const [cultureInsert, setCultureInsert] = React.useState('')

  const classes = useStyles()
  const handleSubmit = () => {
    let organization: AddOrganization |null
    if (createNewOrganization) {
      const addressOffice = cbAddressType.find((x: CodeBookItem) => x.systemIdentificator === 'RegisteredOfficeAddress')
      const addressOfficeId = _.get(addressOffice, 'id', '')
      const addressBilling = cbAddressType.find((x: CodeBookItem) => x.systemIdentificator === 'BillingAddress')
      const addressBillingId = _.get(addressBilling, 'id', '')
      const contactInformation = new ContactInformation(contactEmail, contactPhone, contactWWW)
      const addresses = []
      addresses.push(new Address(country, region, city, street, houseNumber, zipCode, addressOfficeId, cbCountry.find((x: CodeBookItem) => x.id === country).name))
      addresses.push(new Address(countryContact, regionContact, cityContact, streetContact, houseNumberContact, zipCodeContact, addressBillingId, cbCountry.find((x: CodeBookItem) => x.id === countryContact).name))
      organization = new AddOrganization(contactInformation, addresses, sendInquiryCourse, GetUserToken(), organizatioName, organizationDescription, cultureInsert)
    } else {
      organization = null
    }

    const orgId = window.localStorage.getItem('organizationId') || ''
    const obj = new AddUser(password1, password2, email, new Person(firstName, '', lastName, []), getLanguage(), createNewOrganization, organization, orgId)

    axiosInstance.post('web/User/AddUser', obj)
      .then(function () {
        setOpenError(false)
        setRegistrationOk(true)
      })
      .catch((error: any) => {
        if (error?.response?.data?.errors?.length > 0) {
          const message = [] as any
          error?.response?.data?.errors?.forEach((element: any) => {
            message.push(t(element.basicCode))
          })
          setErrorMessage(message)
          setOpenError(true)
        }
        return false
      })
    return false
  }
  const handleChange = (e: any) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangeFirstName = (e: any) => {
    setFirstName(e.currentTarget.value)
  }
  const handleChangeLastName = (e: any) => {
    setLastName(e.currentTarget.value)
  }
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
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }
  const handleChangeCreateNewOrganization = (event: any) => {
    setCreateNewOrganization(event.target.checked)
  }
  const handleChangeOrganizationName = (event: any) => {
    setOrganizationName(event.target.value)
  }

  const handleChangeOrganizationDescription = (event: any) => {
    setOrganizationDescription(event.target.value)
  }

  const handleChangeCountry = (e: any) => {
    setCountry(e.target.value)
  }

  const handleChangeStreet = (event: any) => {
    setStreet(event.target.value)
  }

  const handleChangeCity = (event: any) => {
    setCity(event.target.value)
  }

  const handleChangeRegion = (event: any) => {
    setRegion(event.target.value)
  }

  const handleChangeHouseNumber = (event: any) => {
    setHouseNumber(event.target.value)
  }

  const handleChangeZipCode = (event: any) => {
    setZipCode(event.target.value)
  }

  const handleChangeCountryContact = (e: any) => {
    setCountryContact(e.target.value)
  }

  const handleChangeStreetContact = (event: any) => {
    setStreetContact(event.target.value)
  }

  const handleChangeCityContact = (event: any) => {
    setCityContact(event.target.value)
  }

  const handleChangeRegionContact = (event: any) => {
    setRegionContact(event.target.value)
  }

  const handleChangeHouseNumberContact = (event: any) => {
    setHouseNumberContact(event.target.value)
  }

  const handleChangeZipCodeContact = (event: any) => {
    setZipCodeContact(event.target.value)
  }

  const handleChangeSendInquiryCourse = (event: any) => {
    setSendInquiryCourse(event.target.checked)
  }
  const handleChangeContactEmail = (event: any) => {
    setContactEmail(event.target.value)
  }

  const handleChangeContactPhone = (event: any) => {
    setContactPhone(event.target.value)
  }

  const handleChangeContactWWW = (event: any) => {
    setContactWWW(event.target.value)
  }
  const onChangeCultureInsert = (e: any) => {
    setCultureInsert(e.target.value)
  }
  useEffect(() => {
    const fetchData = async () => {
      const countryId = await GetCodeBookDefaultValue('cb_country', [])
      setCountry(countryId)
      setCountryContact(countryId)
      const cultureId = await GetCodeBookDefaultValue('cb_culture', [])
      setCultureInsert(cultureId)
    }
    fetchData()
  }, [])

  return (

    <Container component="main" maxWidth="xl">

      {registrationOk === false &&
        <div>
          <PageName title={t('SIGN_UP_TITLE')} />
          <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
          <ValidatorForm className={classes.form}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <CustomTextValidator
                  label={t('SIGN_UP_FIRST_NAME')}
                  onChange={handleChangeFirstName}
                  name="firstName"
                  value={firstName}
                  validators={['required']}
                  errorMessages={[t('VALIDATION_REQUIRED')]}
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  autoFocus
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextValidator
                  label={t('SIGN_UP_LAST_NAME')}
                  onChange={handleChangeLastName}
                  name="lastName"
                  value={lastName}
                  validators={['required']}
                  errorMessages={[t('VALIDATION_REQUIRED')]}
                  variant="outlined"
                  fullWidth
                  id="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('SIGN_UP_EMAIL_ADDRESS')}
                  onChange={handleChange}
                  name="email"
                  value={email}
                  validators={['required', 'isEmail']}
                  errorMessages={[t('VALIDATION_REQUIRED'), t('VALIDATION_EMAIL')]}
                  variant="outlined"
                  fullWidth
                  id="email"
                />

              </Grid>
              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('SIGN_UP_PASSWORD')}
                  onChange={handleChangePassword1}
                  name="password"
                  value={password1}
                  validators={['required']}
                  errorMessages={[t('VALIDATION_REQUIRED')]}
                  variant="outlined"
                  fullWidth
                  id="password"
                  type="password"
                />

              </Grid>
              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('SIGN_UP_PASSWORD_AGAIN')}
                  onChange={handleChangePassword2}
                  name="repeatPassword"
                  value={password2}
                  validators={['isPasswordMatch', 'required']}
                  errorMessages={[t('VALIDATION_PASSWORD'), t('VALIDATION_REQUIRED')]}
                  variant="outlined"
                  fullWidth
                  id="repeatPassword"
                  type="password"
                />
              </Grid>
              {window.localStorage.getItem('organizationId') === '' &&
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CustomCheckBox
                      checked={createNewOrganization}
                      onChange={handleChangeCreateNewOrganization}
                      name="createNewOrganization"
                      label={t('SIGN_UP_CREATE_NEW_ORGANIZATION')} />
                    {createNewOrganization === true && <OrganizationEditBaseSetting
                      handleChangeOrganizationName={handleChangeOrganizationName}
                      organizatioName={organizatioName}
                      handleChangeOrganizationDescription={handleChangeOrganizationDescription}
                      organizationDescription={organizationDescription}
                      handleChangeSendInquiryCourse={handleChangeSendInquiryCourse}
                      sendInquiryCourse={sendInquiryCourse}
                      id={''}
                      cultureInsert={cultureInsert}
                      onChangeCultureInsert={onChangeCultureInsert}
                      country={country}
                      handleChangeCountry={handleChangeCountry}
                      region={region}
                      handleChangeRegion={handleChangeRegion}
                      city={city}
                      handleChangeCity={handleChangeCity}
                      street={street}
                      handleChangeStreet={handleChangeStreet}
                      houseNumber={houseNumber}
                      handleChangeHouseNumber={handleChangeHouseNumber}
                      zipCode={zipCode}
                      handleChangeZipCode={handleChangeZipCode}
                      cbCountry={cbCountry}
                      countryContact={countryContact}
                      handleChangeCountryContact={handleChangeCountryContact}
                      regionContact={regionContact}
                      handleChangeRegionContact={handleChangeRegionContact}
                      cityContact={cityContact}
                      handleChangeCityContact={handleChangeCityContact}
                      streetContact={streetContact}
                      handleChangeStreetContact={handleChangeStreetContact}
                      houseNumberContact={houseNumberContact}
                      handleChangeHouseNumberContact={handleChangeHouseNumberContact}
                      zipCodeContact={zipCodeContact}
                      handleChangeZipCodeContact={handleChangeZipCodeContact}
                      handleChangeContactEmail={handleChangeContactEmail}
                      contactEmail={contactEmail}
                      handleChangeContactPhone={handleChangeContactPhone}
                      contactPhone={contactPhone}
                      handleChangeContactWWW={handleChangeContactWWW}
                      contactWWW={contactWWW}

                    />}
                  </Grid>

                </Grid>}

            </Grid>

            <Button type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>{t('SIGN_UP_SUBMIT_BUTTON')}</Button>

            <Grid container justify="flex-end">
              <Grid item>
                <Link href={window.localStorage.getItem('loginUrl') || '/'} variant="body2">
                  {t('SIGN_UP_LINK_TO_SIGN_IN')}
                </Link>

              </Grid>
            </Grid>
          </ValidatorForm>

        </div>
      }
      {registrationOk &&
        <div>
          <PageName title={t('SIGN_UP_TITLE')} />
          {t('SIGN_UP_REGISTRATION_OK')}
        </div>
      }

    </Container>

  )
}
SignUp.prototype = {
  cbCountry: PropTypes.array,
  cbAddressType: PropTypes.array

}
