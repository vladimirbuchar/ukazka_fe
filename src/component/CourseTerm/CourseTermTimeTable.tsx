import React from 'react'
import { IconButton, ListItemText, Menu, MenuItem } from '@material-ui/core'
import PropTypes from 'prop-types'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useTranslation } from 'react-i18next'
import { axiosInstance } from '../../axiosInstance'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
export function CourseTermTimeTable (props: any) {
  const { id, onReload } = props
  const { t } = useTranslation()
  const [anchorElActionMenu, setAnchorElActionMenu] = React.useState(null)
  const openActionMenu = Boolean(anchorElActionMenu)
  const cancelTerm = (event: any) => {
    const { itemid } = event.target.parentNode.parentNode.dataset
    axiosInstance.put('webportal/CourseTerm/CancelCourseTerm', { id: itemid, userAccessToken: GetUserToken(), courseTermId: GetUrlParam('id') }).then(function () {
      onReload()
    })
  }
  const restoreTerm = (event: any) => {
    const { itemid } = event.target.parentNode.parentNode.dataset
    axiosInstance.put('webportal/CourseTerm/RestoreCourseTerm', { id: itemid, userAccessToken: GetUserToken(), courseTermId: GetUrlParam('id') }).then(function () {
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
      <MenuItem button onClick={cancelTerm} data-itemid={id}>

        <ListItemText primary={t('COURSE_TERM_TIME_TABLE_CANCEL')} />
      </MenuItem>
      <MenuItem button onClick={restoreTerm} data-itemid={id}>

        <ListItemText primary={t('COURSE_TERM_TIME_TABLE_RESTORE')} />
      </MenuItem>
    </Menu>
  </span>)
}
CourseTermTimeTable.prototype = {
  id: PropTypes.string,
  onReload: PropTypes.func

}
