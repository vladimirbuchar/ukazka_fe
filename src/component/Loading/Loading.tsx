import { CircularProgress } from '@material-ui/core'
import React from 'react'
import useStyles from '../../styles'
import PropTypes from 'prop-types'
export default function Loading (props: any) {
  const classes = useStyles()
  const { showLoading } = props
  if (showLoading) {
    return (<div className={classes.loadingpanel}>
      <CircularProgress className={classes.loading} />
    </div>)
  }
  return null
}
Loading.prototype = {
  showLoading: PropTypes.bool
}
