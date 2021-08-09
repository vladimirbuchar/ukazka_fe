import React from 'react'
import { Typography } from '@material-ui/core'
import useStyles from '../../styles'
import PropTypes from 'prop-types'
export default function CompanyName (props: any) {
  const classes = useStyles()
  let { name } = props
  if (name === '') {
    name = window.localStorage.getItem('organizationName')
  }
  if (name === '') {
    return (
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
        FlexibleLMS
      </Typography>
    )
  } else {
    return (
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
        {name}
      </Typography>
    )
  }
}
CompanyName.prototype = {
  name: PropTypes.string
}
