import React from 'react'
import { Avatar } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { Link as ReactLink } from 'react-router-dom'
import PropTypes from 'prop-types'
export default function UserAvatar (props:any) {
  const { onChangeOpacity } = props
  let isUrlAvatar = sessionStorage.getItem('userAvatarIsUrl')
  let userAvatar = sessionStorage.getItem('userAvatar')
  let userAvatarFullName = sessionStorage.getItem('userAvatarFullName')
  if (isUrlAvatar === null || isUrlAvatar === undefined || isUrlAvatar === 'undefined') {
    isUrlAvatar = 'false'
  }
  if (userAvatar === null || userAvatar === undefined || userAvatar === 'undefined') {
    userAvatar = ''
  }
  if (userAvatarFullName === null || userAvatarFullName === undefined || userAvatarFullName === 'undefined') {
    userAvatarFullName = ''
  }
  if (isUrlAvatar === 'true') {
    return <Link to={'/myprofile'} component={ReactLink} variant="body2" title={userAvatarFullName} onClick={onChangeOpacity}>
      <Avatar alt={userAvatarFullName} src={userAvatar} />
    </Link>
  } else {
    return <Link to={'/myprofile'} component={ReactLink} variant="body2" title={userAvatarFullName} onClick={onChangeOpacity}>
      <Avatar alt={userAvatarFullName}>{userAvatar.toUpperCase()}</Avatar>
    </Link>
  }
}
UserAvatar.prototype = {
  onChangeOpacity: PropTypes.func
}
