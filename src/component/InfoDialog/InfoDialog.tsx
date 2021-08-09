import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
export default function InfoDialog (props: any) {
  const { title, content, openDialog, onCloseDialog } = props
  const { t } = useTranslation()
  return (<Dialog
    open={openDialog}
    onClose={onCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {content}
      </DialogContentText>
    </DialogContent>
    <DialogActions>

      <Button onClick={onCloseDialog} color="primary">
        {t('INFO_DIALOG_CLOSE_BUTTON')}
      </Button>
    </DialogActions>
  </Dialog>
  )
}
InfoDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,

  openDialog: PropTypes.bool,
  onCloseDialog: PropTypes.func
}
