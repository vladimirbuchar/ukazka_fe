import React from 'react'
import { useTranslation } from 'react-i18next'
import { ListItemIcon, ListItemText, Menu, MenuItem, TableCell, TableRow } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link as ReactLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import SchoolIcon from '@material-ui/icons/School'
export function ManagedCourseMenuItem (props: any) {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const { id, courseName, organizationId, isOrganizationOwner, isOrganizationAdministrator, isCourseAdministrator, isCourseEditor } = props
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const courseLink = '/course/edit?id=' + id + '&organizationId=' + organizationId

  return (
    <TableRow key={id}>

      <TableCell component="th" scope="row">
        <Link component={ReactLink} variant="body2" to={courseLink}>
          {courseName}
        </Link>

      </TableCell>

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
        {(isOrganizationOwner || isOrganizationAdministrator || isCourseAdministrator) &&
                <MenuItem button component={ReactLink} to={courseLink + '&gototab=courseterm'}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('ORGANIZATION_SHOW_COURSE_TERM')} />
                </MenuItem>
        }
        {(isOrganizationOwner || isOrganizationAdministrator || isCourseAdministrator || isCourseEditor) &&
                <MenuItem button component={ReactLink} to={courseLink + '&gototab=coursematerial'}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('ORGANIZATION_SHOW_COURSE_MATERIAL')} />
                </MenuItem>
        }

      </Menu>

      </TableCell>

    </TableRow>

  )
}
ManagedCourseMenuItem.propTypes = {
  courseName: PropTypes.string,
  id: PropTypes.string,
  organizationId: PropTypes.string,
  isOrganizationOwner: PropTypes.bool,
  isOrganizationAdministrator: PropTypes.bool,
  isCourseAdministrator: PropTypes.bool,
  isCourseEditor: PropTypes.bool
}
