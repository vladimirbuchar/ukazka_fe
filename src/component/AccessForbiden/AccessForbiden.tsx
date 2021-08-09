import React from 'react'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export default function AccessForbiden () {
  const { t } = useTranslation()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {t('ACCESS_FORBIDDEN')}
      </Grid>
    </Grid>
  )
}
