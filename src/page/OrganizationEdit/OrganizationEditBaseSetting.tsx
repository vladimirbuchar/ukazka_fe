import React, { } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import AddressField from '../../component/AddressField/AddressField'
import ContactField from '../../component/ContactField/ContactField'
import PropTypes from 'prop-types'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import CodeBook from '../../component/CodeBook/CodeBook'
export default function OrganizationEditBaseSetting (props: any) {
  const { t } = useTranslation()
  const {
    handleChangeOrganizationName, organizatioName, handleChangeOrganizationDescription, organizationDescription, handleChangeSendInquiryCourse,
    sendInquiryCourse, id, cultureInsert, onChangeCultureInsert, country, handleChangeCountry, region, handleChangeRegion, city, handleChangeCity, street,
    handleChangeStreet, houseNumber, handleChangeHouseNumber, zipCode, handleChangeZipCode, cbCountry, countryContact, handleChangeCountryContact,
    regionContact, handleChangeRegionContact, cityContact, handleChangeCityContact, streetContact, handleChangeStreetContact, houseNumberContact,
    handleChangeHouseNumberContact, zipCodeContact, handleChangeZipCodeContact, handleChangeContactEmail, contactEmail, handleChangeContactPhone,
    contactPhone, handleChangeContactWWW, contactWWW

  } = props
  return (

    <Grid container spacing={2}>
      <Grid item xs={12}>

        <CustomTextValidator
          label={t('ORGNIZATION_NAME')}
          onChange={handleChangeOrganizationName}
          name="organizatioName"
          value={organizatioName}
          validators={['required']}
          errorMessages={[t('VALIDATION_REQUIRED')]}
          variant="outlined"
          fullWidth
          id="organizatioName"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('ORGNIZATION_DESCRIPTION')}
          onChange={handleChangeOrganizationDescription}
          name="organizationDescription"
          value={organizationDescription}
          variant="outlined" fullWidth
          id="organizationDescription"
          rows={5}
          multiline={true}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomCheckBox onChange={handleChangeSendInquiryCourse} checked={sendInquiryCourse} name="sendInquiryCourse" label={t('ORGNIZATION_SEND_INQUIRY_COURSE')} />
      </Grid>
      {id === '' &&
          <Grid item xs={12}>
            <CodeBook codeBookIdentificator="cb_culture" label={t('ORGANIZATION_DEFAULT_CULTURE')} id={'culture'} value={cultureInsert} onChange={onChangeCultureInsert} autoTranslate={true} />
          </Grid>
      }

      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          {t('ORGANIZATION_MAIN_BRANCH')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddressField idPrefix="" country={country} onChangeCountry={handleChangeCountry} region={region} onChangeRegion={handleChangeRegion}
          city={city} onChangeCity={handleChangeCity} street={street} onChangeStreet={handleChangeStreet} houseNumber={houseNumber}
          onChangeHouseNumber={handleChangeHouseNumber} zipCode={zipCode} onChangeZipCode={handleChangeZipCode} cbCountry={cbCountry} />

      </Grid>

      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          {t('ORGANIZATION_MAIN_BRANCH_CONTACT')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AddressField idPrefix="contact" country={countryContact} onChangeCountry={handleChangeCountryContact} region={regionContact} onChangeRegion={handleChangeRegionContact}
          city={cityContact} onChangeCity={handleChangeCityContact} street={streetContact} onChangeStreet={handleChangeStreetContact} houseNumber={houseNumberContact}
          onChangeHouseNumber={handleChangeHouseNumberContact} zipCode={zipCodeContact} onChangeZipCode={handleChangeZipCodeContact} cbCountry={cbCountry} />

      </Grid>
      <Grid item xs={12}>
        <ContactField onChangeEmail={handleChangeContactEmail} email={contactEmail} onChangePhoneNumber={handleChangeContactPhone}
          phoneNumber={contactPhone} onChangeWWW={handleChangeContactWWW} www={contactWWW} />
      </Grid>

    </Grid>
  )
}
OrganizationEditBaseSetting.prototype = {
  handleChangeOrganizationName: PropTypes.func,
  organizatioName: PropTypes.string,
  handleChangeOrganizationDescription: PropTypes.func,
  organizationDescription: PropTypes.string,
  handleChangeSendInquiryCourse: PropTypes.func,
  sendInquiryCourse: PropTypes.bool,
  id: PropTypes.string,
  cultureInsert: PropTypes.string,
  onChangeCultureInsert: PropTypes.func,
  country: PropTypes.string,
  handleChangeCountry: PropTypes.func,
  region: PropTypes.string,
  handleChangeRegion: PropTypes.func,
  city: PropTypes.string,
  handleChangeCity: PropTypes.func,
  street: PropTypes.string,
  handleChangeStreet: PropTypes.func,
  houseNumber: PropTypes.string,
  handleChangeHouseNumber: PropTypes.func,
  zipCode: PropTypes.string,
  handleChangeZipCode: PropTypes.func,
  cbCountry: PropTypes.array,
  countryContact: PropTypes.string,
  handleChangeCountryContact: PropTypes.func,
  regionContact: PropTypes.string,
  handleChangeRegionContact: PropTypes.func,
  cityContact: PropTypes.string,
  handleChangeCityContact: PropTypes.func,
  streetContact: PropTypes.string,
  handleChangeStreetContact: PropTypes.func,
  houseNumberContact: PropTypes.string,
  handleChangeHouseNumberContact: PropTypes.func,
  zipCodeContact: PropTypes.string,
  handleChangeZipCodeContact: PropTypes.string,
  handleChangeContactEmail: PropTypes.func,
  contactEmail: PropTypes.string,
  handleChangeContactPhone: PropTypes.func,
  contactPhone: PropTypes.string,
  handleChangeContactWWW: PropTypes.func,
  contactWWW: PropTypes.string

}
