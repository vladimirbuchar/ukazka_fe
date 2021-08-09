import React from 'react'
import { Grid } from '@material-ui/core'
import CodeBook from '../CodeBook/CodeBook'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import CustomTextValidator from '../CustomTextValidator/CustomTextValidator'

export default function AddressField (props: any) {
  const { idPrefix, country, onChangeCountry, region, onChangeRegion, city, onChangeCity, street, onChangeStreet, houseNumber, onChangeHouseNumber, zipCode, onChangeZipCode, cbCountry } = props
  const { t } = useTranslation()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CodeBook codeBookIdentificator="cb_country" label={t('ADDRESS_CONTRY')} id={idPrefix + 'country'} value={country} onChange={onChangeCountry} autoTranslate={false} data={cbCountry} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('ADDRESS_REGION')}
          onChange={onChangeRegion}
          name={idPrefix + 'region'}
          value={region}
          variant="outlined"
          fullWidth
          id={idPrefix + 'region'}

        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('ADDRESS_CITY')}
          onChange={onChangeCity}
          name={idPrefix + 'city'}
          value={city}
          variant="outlined"
          fullWidth
          id={idPrefix + 'city'}

        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('ADDRESS_STREET')}
          onChange={onChangeStreet}
          name={idPrefix + 'street'}
          value={street}
          variant="outlined"
          fullWidth
          id={idPrefix + 'street'}

        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('ADDRESS_HOUSE_NUMBER')}
          onChange={onChangeHouseNumber}
          name={idPrefix + 'houseNumber'}
          value={houseNumber}
          variant="outlined"
          fullWidth
          id={idPrefix + 'houseNumber'}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('ADDRESS_ZIP_CODE')}
          onChange={onChangeZipCode}
          name={idPrefix + 'zipCode'}
          value={zipCode}
          variant="outlined"
          fullWidth
          id={idPrefix + 'zipCode'}
        />
      </Grid>

    </Grid>
  )
}
AddressField.prototype = {
  idPrefix: PropTypes.string,
  country: PropTypes.string,
  onChangeCountry: PropTypes.func,
  region: PropTypes.string,
  onChangeRegion: PropTypes.func,
  city: PropTypes.string,
  onChangeCity: PropTypes.func,
  street: PropTypes.string,
  onChangeStreet: PropTypes.func,
  houseNumber: PropTypes.string,
  onChangeHouseNumber: PropTypes.func,
  zipCode: PropTypes.string,
  onChangeZipCode: PropTypes.func,
  cbCountry: PropTypes.array
}
