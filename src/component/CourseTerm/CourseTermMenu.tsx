import React from 'react'
import { IconButton, ListItemText, Menu, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useTranslation } from 'react-i18next'
import { axiosInstance } from '../../axiosInstance'
import GetUserToken from '../../core/GetUserToken'
export function CourseTermMenu (props: any) {
  const { id, onReload } = props
  const { t } = useTranslation()
  const [anchorElActionMenu, setAnchorElActionMenu] = React.useState(null)
  const openActionMenu = Boolean(anchorElActionMenu)
  const resetCourse = (event: any) => {
    const { itemid } = event.target.parentNode.parentNode.dataset
    axiosInstance.put('webportal/Course/ResetCourse', { studentTermId: itemid, userAccessToken: GetUserToken() }).then(function () {
      onReload()
    })
  }
  const handleActionMenuClose = () => {
    setAnchorElActionMenu(null)
  }
  const handleMenuActionClick = (event: any) => {
    setAnchorElActionMenu(event.currentTarget)
  }
  return (<span>
    <IconButton
      onClick={handleMenuActionClick}
    >
      <MoreVertIcon />
    </IconButton>
    <Menu
      id="long-menu"
      anchorEl={anchorElActionMenu}
      keepMounted
      open={openActionMenu}
      onClose={handleActionMenuClose}
    >
      <MenuItem button onClick={resetCourse} data-itemid={id}>

        <ListItemText primary={t('COURSE_TERM_RESET')} />
      </MenuItem>
    </Menu>
  </span>)
}
CourseTermMenu.prototype = {
  id: PropTypes.string,
  onReload: PropTypes.func

}
