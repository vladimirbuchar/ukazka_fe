
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Divider, ListItemIcon, ListItemText, TableCell, TableRow } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PropTypes from 'prop-types'
import { Link as ReactLink } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import SchoolIcon from '@material-ui/icons/School'
import BusinessIcon from '@material-ui/icons/Business'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import QuestionDialog from '../QuestionDialog/QuestionDialog'
import { axiosInstance } from '../../axiosInstance'
import GetUserToken from '../../core/GetUserToken'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import AddIcon from '@material-ui/icons/Add'
import Link from '@material-ui/core/Link'

export function OrganizationItem (props: any) {
  const { t } = useTranslation()
  const { name, isOrganizationOwner, isOrganizationLector, isOrganizationStudent, isOrganizationAdministrator, isCourseEditor, isCourseAdministrator, id, onDelete, userId } = props
  const [openLeaveDialog, setOpenLeaveDeleteDialog] = React.useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const editLink = '/organization/edit/?id=' + id
  const branchLink = '/organization/branch/?id=' + id + '&gototab=branch'
  const courseLink = '/organization/course/?id=' + id + '&gototab=course'
  const userLink = '/organization/user/?id=' + id + '&gototab=user'
  const bankOfQuestionLink = '/organization/bankofquestion/?id=' + id + '&gototab=bankOfQuestion'
  const settingLink = '/organization/setting/?id=' + id + '&gototab=settings'
  const addBranchLink = '/branch/edit?organizationId=' + id
  const addUserLink = '/organization/adduser?organizationId=' + id
  const addCourseLink = '/course/edit?organizationId=' + id
  const addBankOfQuestion = '/bankofquestion/edit?organizationId=' + id

  const handleDeleteOrganization = () => {
    axiosInstance.delete('webportal/Organization/DeleteOrganization', {
      params: {
        organizationId: id,
        accessToken: GetUserToken()
      }
    }).then(function () {
      onDelete()
      setOpenDeleteDialog(false)
    })
  }

  const handleClickOpenDeleteDialog = () => {
    setOpenDeleteDialog(true)
  }
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false)
  }
  const handleLeaveUserFromOrganization = () => {
    axiosInstance.delete('webportal/OrganizationUser/DeleteUserFromOrganization', {
      params: {
        accessToken: GetUserToken(),
        userId: userId,
        organizationId: id
      }
    }).then(function () {
      onDelete()
      setOpenLeaveDeleteDialog(false)
    })
  }

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickOpenLeaveDialog = () => {
    setOpenLeaveDeleteDialog(true)
  }
  const handleCloseLeaveDialog = () => {
    setOpenLeaveDeleteDialog(false)
  }

  return (<TableRow key={id}>
    <TableCell component="th" scope="row">

      <Link component={ReactLink} variant="body2" to={isOrganizationOwner || isOrganizationAdministrator ? editLink : courseLink}>
        {name}
      </Link>

    </TableCell>
    <TableCell align="right">{isOrganizationOwner && t('ORGANIZATION_OWNER') + ' '}
      {isOrganizationLector && t('ORGANIZATION_LECTOR') + ' '}
      {isOrganizationStudent && t('ORGANIZATION_STUDENT') + ' '}
      {isOrganizationAdministrator && t('ORGANIZATION_ADMINISTRATOR') + ' '}
      {isCourseEditor && t('COURSE_EDITOR') + ' '}
      {isCourseAdministrator && t('COURSE_ADMINISTRATOR') + ' '}</TableCell>
    <TableCell align="right"><IconButton
      aria-controls="long-menu"
      aria-haspopup="true"
      onClick={handleClick}
    >
      <MoreVertIcon />
    </IconButton>
    <Menu
      id="long-menu"
      anchorEl={anchorEl}
      keepMounted
      open={open}
      onClose={handleClose}
    >
      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <MenuItem button component={ReactLink} to={editLink}>
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_EDIT')} />
                    </MenuItem>
      }
      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <Divider />}
      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <MenuItem button component={ReactLink} to={branchLink}>
                      <ListItemIcon>
                        <BusinessIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_BRANCH')} />

                    </MenuItem>
      }
      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <MenuItem button component={ReactLink} to={addBranchLink}>
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_ADD_BRANCH')} />
                    </MenuItem>
      }
      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <Divider />}

      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <MenuItem button component={ReactLink} to={userLink}>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_USER')} />
                    </MenuItem>
      }
      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <MenuItem button component={ReactLink} to={addUserLink}>
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_USER_ADD')} />
                    </MenuItem>
      }
      <Divider />
      <MenuItem button component={ReactLink} to={courseLink}>
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary={t('ORGANIZATION_COURSE')} />
      </MenuItem>
      {(isOrganizationOwner || isOrganizationAdministrator || isCourseAdministrator) &&
                    <MenuItem button component={ReactLink} to={addCourseLink}>
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_COURSE_ADD')} />
                    </MenuItem>
      }
      {(isOrganizationOwner || isOrganizationAdministrator || isCourseAdministrator || isCourseEditor) &&
                    <Divider />}
      {(isOrganizationOwner || isOrganizationAdministrator || isCourseAdministrator || isCourseEditor) &&
                    <MenuItem button component={ReactLink} to={bankOfQuestionLink}>
                      <ListItemIcon>
                        <QuestionAnswerIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_BANK_OF_QUESTION')} />
                    </MenuItem>
      }

      {(isOrganizationOwner || isOrganizationAdministrator || isCourseAdministrator || isCourseEditor) &&
                    <MenuItem button component={ReactLink} to={addBankOfQuestion}>
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_BANK_OF_QUESTION_ADD')} />
                    </MenuItem>
      }
      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <Divider />}
      {!isOrganizationOwner && <MenuItem button onClick={handleClickOpenLeaveDialog}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={t('ORGANIZATION_LEAVE')} />
      </MenuItem>
      }
      {(isOrganizationOwner || isOrganizationAdministrator) &&
                    <MenuItem button component={ReactLink} to={settingLink}>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_SETTING')} />
                    </MenuItem>
      }
      {isOrganizationOwner &&
                    <MenuItem button onClick={handleClickOpenDeleteDialog}>

                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary={t('ORGANIZATION_DELETE')} />
                    </MenuItem>
      }
      {openLeaveDialog && <QuestionDialog content={t('ORGANIZATION_LEAVE_CONTENT').replace('{name}', name)}
        oclickYes={handleLeaveUserFromOrganization}
        onCloseDialog={handleCloseLeaveDialog}
        openDialog={openLeaveDialog}
        title={t('ORGANIZATION_LEAVE_TITLE')} />

      }
      {openDeleteDialog && <QuestionDialog content={t('ORGANIZATION_DELETE_CONTENT').replace('{name}', name)}
        oclickYes={handleDeleteOrganization}
        onCloseDialog={handleCloseDeleteDialog}
        openDialog={openDeleteDialog}
        title={t('ORGANIZATION_DELETE_TITLE')} />
      }

    </Menu>

    </TableCell>

  </TableRow>

  )
}
OrganizationItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  isOrganizationOwner: PropTypes.bool,
  isOrganizationLector: PropTypes.bool,
  isOrganizationStudent: PropTypes.bool,
  isOrganizationAdministrator: PropTypes.bool,
  isCourseEditor: PropTypes.bool,
  isCourseAdministrator: PropTypes.bool,
  id: PropTypes.string,
  onDelete: PropTypes.func,
  userId: PropTypes.string.isRequired
}
