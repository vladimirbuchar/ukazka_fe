import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
export default function QuestionDialog (props: any) {
  const { title, content, oclickYes, openDialog, onCloseDialog } = props
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
      <Button color="primary" autoFocus onClick={oclickYes}>
        {t('QUESTION_DIALOG_YES_BUTTON')}
      </Button>
      <Button onClick={onCloseDialog} color="primary">
        {t('QUESTION_DIALOG_NO_BUTTON')}
      </Button>
    </DialogActions>
  </Dialog>
  )
}
QuestionDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  oclickYes: PropTypes.func,
  openDialog: PropTypes.bool,
  onCloseDialog: PropTypes.func
}
