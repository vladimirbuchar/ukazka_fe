import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import FileUpload from '../FileUpload/FileUpload'
import FileUploader from '../../core/FileUploader'
export default function ImportLessonDialog (props: any) {
  const { openDialog, onCloseDialog, objectOwner, onReload, accept } = props
  const { t } = useTranslation()
  const [files, setFiles] = React.useState([])
  const onUpload = (files: any) => {
    setFiles(files)
  }
  const oclickYes = async () => {
    if (files.length > 0) {
      FileUploader(files, objectOwner, 'courseLesson', '/api/webportal/CourseLesson/ImportCourseLessonFromPowerPoint').then(function () {
        onReload()
      }).finally(function () {
        onCloseDialog()
        setFiles([])
      })
    }
  }
  const onClickNo = () => {
    setFiles([])
    onCloseDialog()
  }
  return (<Dialog
    open={openDialog}
    onClose={onClickNo}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{t('IMPORT_DIALOG_TITLE')}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        <FileUpload onUpload={onUpload} accept={accept} />
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" autoFocus onClick={oclickYes} disabled={files.length === 0}>
        {t('IMPORT_YES_BUTTON')}
      </Button>
      <Button onClick={onClickNo} color="primary">
        {t('IMPORT_NO_BUTTON')}
      </Button>
    </DialogActions>
  </Dialog>
  )
}
ImportLessonDialog.propTypes = {
  openDialog: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  objectOwner: PropTypes.string,
  onReload: PropTypes.func,
  accept: PropTypes.string
}
