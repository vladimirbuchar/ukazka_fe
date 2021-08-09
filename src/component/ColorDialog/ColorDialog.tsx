import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { SketchPicker } from 'react-color'
import PropTypes from 'prop-types'

export default function ColorDialog (props: any) {
  const { color, onChangeComplete } = props
  const { t } = useTranslation()
  const [openDialog, setOpenDialog] = React.useState(false)
  const onCloseDialog = () => {
    setOpenDialog(false)
  }
  const selectOpenDialog = () => {
    setOpenDialog(true)
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Dialog
          open={openDialog}
          onClose={onCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t('COLOR_DIALOG_TITLE')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <SketchPicker color={color} onChangeComplete={onChangeComplete} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>

            <Button onClick={onCloseDialog} color="primary">
              {t('COLOR_DIALOG_CLOSE_BUTTON')}
            </Button>
          </DialogActions>
        </Dialog>

        <Button onClick={selectOpenDialog} color="primary">
          {t('COLOR_DIALOG_SELECT_BUTTON')}
        </Button>

      </Grid>
    </Grid>

  )
}
ColorDialog.prototype = {
  color: PropTypes.any,
  onChangeComplete: PropTypes.func
}
