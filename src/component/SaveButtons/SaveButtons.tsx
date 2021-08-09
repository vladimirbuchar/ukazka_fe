import React from 'react'
import { Button, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import useStyles from '../../styles'
import { Link as ReactLink, useHistory } from 'react-router-dom'

export default function SaveButtons (props: any) {
  const { backUrl, onSave, showSaveButton, otherButtons } = props
  const history = useHistory()
  const classes = useStyles()
  const { t } = useTranslation()

  const saveAndBackAction = async (e: any) => {
    e.preventDefault()
    const result = await onSave()
    if (backUrl !== '' && result) {
      history.push(backUrl)
    }
  }
  return (
    <Grid container style={{ paddingBottom: '10px' }}>
      {(showSaveButton || showSaveButton === undefined) &&
        <Grid item style={{ paddingRight: '10px' }}>
          <Button type="submit"
            variant="contained"
            color="primary"
            className={`${classes.submit} ${classes.saveButtons}`}
            fullWidth={true}

          >{t('SAVE_BUTTON_SAVE')}</Button>
        </Grid>}
      <Grid item style={{ paddingRight: '10px' }}>
        <Button fullWidth={true} type="submit" variant="contained" color="primary" onClick={saveAndBackAction} className={`${classes.buttonSbmitPadding} ${classes.saveButtons}`} >{t('SAVE_BUTTON_SAVE_AND_BACK')}</Button>
      </Grid>
      <Grid item style={{ paddingRight: '10px' }}>
        <Button fullWidth={true} component={ReactLink} to={backUrl} variant="contained" color="primary" className={`${classes.buttonSbmitPadding} ${classes.saveButtons}`}>{t('SAVE_BUTTON_BACK')}</Button>
      </Grid>
      {otherButtons && otherButtons.map(function (item:any) {
        return <Grid item style={{ paddingRight: '10px' }}>
          {item}
        </Grid>
      })
      }
    </Grid>
  )
}
SaveButtons.prototype = {
  backUrl: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  detailUrl: PropTypes.string,
  detailUrlParams: PropTypes.array,
  showSaveButton: PropTypes.bool,
  otherButtons: PropTypes.array
}
