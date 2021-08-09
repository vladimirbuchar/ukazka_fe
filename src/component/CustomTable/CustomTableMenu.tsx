import React from 'react'
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link as ReactLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import GetUserToken from '../../core/GetUserToken'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { axiosInstance } from '../../axiosInstance'
import QuestionDialog from '../QuestionDialog/QuestionDialog'
export default function CustomTableMenu (props: any) {
  const [anchorElActionMenu, setAnchorElActionMenu] = React.useState(null)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)

  const openActionMenu = Boolean(anchorElActionMenu)
  const { showEdit, editParams, editLinkUri, editLinkText, item, showDelete, deleteParams, deleteParamIdName, deleteUrl, deleteDialogTitle, deleteButtonText, replaceContent, deleteDialogContent, onReload, customActionButtons, customEditLink } = props

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }
  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }
  const handleDelete = () => {
    axiosInstance.delete(deleteUrl + '?' + deleteParamIdName + '=' + item.id + '&accessToken=' + GetUserToken() + '&' + deleteParams).then(function () {
      onReload()
      setOpenDeleteDialog(false)
    })
  }

  const handleMenuActionClick = (event: any) => {
    setAnchorElActionMenu(event.currentTarget)
  }

  const handleActionMenuClose = () => {
    setAnchorElActionMenu(null)
  }
  let editButton = null
  let deleteButton = null
  const customButtons = [] as any
  if (showEdit) {
    if (editParams === undefined || editParams === '') {
      editButton = <MenuItem button component={ReactLink} to={customEditLink === true ? editLinkUri : editLinkUri + '?id=' + item.id}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={editLinkText} />
      </MenuItem>
    } else {
      editButton = <MenuItem button component={ReactLink} to={customEditLink === true ? editLinkUri : editLinkUri + '?id=' + item.id + '&' + editParams}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary={editLinkText} />
      </MenuItem>
    }
  }
  if (showDelete) {
    if (deleteParams === undefined || deleteParams === '') {
      deleteButton = <MenuItem button onClick={handleClickOpenDeleteDialog}>

        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary={deleteButtonText} />
      </MenuItem>
    } else {
      deleteButton = <MenuItem button onClick={handleClickOpenDeleteDialog}>

        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary={deleteButtonText} />
      </MenuItem>
    }
  }
  if (customActionButtons) {
    customActionButtons.forEach(function (itemButton: any) {
      if (itemButton.show) {
        customButtons.push(<MenuItem button component={ReactLink} to={customEditLink === true ? editLinkUri + '&gototab=' + itemButton.tabName : editLinkUri + '?id=' + item.id + '&' + editParams + '&gototab=' + itemButton.tabName}>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary={itemButton.actionText} />
        </MenuItem>
        )
      }
    })
  }

  return (
    <span>
      {openDeleteDialog && <QuestionDialog title={deleteDialogTitle} openDialog={openDeleteDialog} onCloseDialog={handleCloseDeleteDialog}
        content={deleteDialogContent.replace('{' + replaceContent + '}', item[replaceContent])} oclickYes={handleDelete}
      />}
      {(showEdit || showDelete || customActionButtons?.filter((x: any) => x.show === true).length > 0) &&
        <IconButton
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleMenuActionClick}
        >
          <MoreVertIcon />
        </IconButton>}

      <Menu
        id="long-menu"
        anchorEl={anchorElActionMenu}
        keepMounted
        open={openActionMenu}
        onClose={handleActionMenuClose}
      >
        {editButton}
        {deleteButton}
        {customButtons}

      </Menu>

    </span>
  )
}
CustomTableMenu.prototype = {
  showEdit: PropTypes.bool,
  editParams: PropTypes.string,
  editLinkUri: PropTypes.string,
  editLinkText: PropTypes.string,
  item: PropTypes.any,
  showDelete: PropTypes.bool,
  deleteParams: PropTypes.string,
  deleteParamIdName: PropTypes.string,
  deleteUrl: PropTypes.string,
  deleteDialogTitle: PropTypes.string,
  deleteButtonText: PropTypes.string,
  deleteDialogContent: PropTypes.string,
  replaceContent: PropTypes.string,
  onReload: PropTypes.func,
  customActionButtons: PropTypes.array,
  customEditLink: PropTypes.bool
}
