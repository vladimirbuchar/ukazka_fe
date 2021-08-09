import React from 'react'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import CustomTextValidator from '../CustomTextValidator/CustomTextValidator'

export default function CoursePrice (props: any) {
  const { t } = useTranslation()
  const { price, onChangePrice, sale, onChangeSale } = props
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('COURSE_PRICE_PRICE')}
          onChange={onChangePrice}
          validators={['isValidPrice']}
          errorMessages={[t('VALIDATION_PRICE')]}
          name="coursePrice"
          value={price}
          variant="outlined"
          fullWidth
          id="coursePrice"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}

        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextValidator
          label={t('COURSE_PRICE_SALE')}
          onChange={onChangeSale}
          name="courseSale"
          validators={['isValidSale']}
          errorMessages={[t('VALIDATION_SALE')]}
          value={sale}
          variant="outlined"
          fullWidth
          id="courseSale"
          type="number"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />
      </Grid>
    </Grid>
  )
}
CoursePrice.prototype = {
  price: PropTypes.string,
  onChangePrice: PropTypes.func,
  sale: PropTypes.string,
  onChangeSale: PropTypes.func
}
