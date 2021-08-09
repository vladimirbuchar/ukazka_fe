import React from 'react'
import useStyles from '../../styles'
import { axiosInstance } from '../../axiosInstance'
import QuestionDialog from '../QuestionDialog/QuestionDialog'
import { Container, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
export default function ButtonDelete (props: any) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const { deleteUrl, deleteDialogTitle, deleteButtonText, deleteDialogContent, onDelete, fullWidth } = props

  const classes = useStyles()
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }
  const handleDelete = () => {
    axiosInstance.delete(deleteUrl).then(function () {
      onDelete()
      setOpenDeleteDialog(false)
    })
  }

  return (

    <Container component="main" maxWidth="xl">
      {openDeleteDialog && <QuestionDialog title={deleteDialogTitle} openDialog={openDeleteDialog} onCloseDialog={handleCloseDeleteDialog}
        content={deleteDialogContent} oclickYes={handleDelete}
      />}
      <Button
        fullWidth={fullWidth}
        onClick={handleClickOpenDeleteDialog}
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<DeleteIcon />}

      >
        {deleteButtonText}
      </Button>
    </Container>
  )
}

ButtonDelete.propTypes = {
  deleteUrl: PropTypes.string,
  deleteDialogTitle: PropTypes.string,
  deleteButtonText: PropTypes.string,
  deleteDialogContent: PropTypes.string,
  onDelete: PropTypes.func,
  fullWidth: PropTypes.bool

}
