import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import { Link as ReactLink } from 'react-router-dom'
import useStyles from '../../styles'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
export function ButtonEdit (props: any) {
  const classes = useStyles()
  const { text, uri, fullWidth } = props
  return (<Button
    fullWidth={fullWidth}
    variant="contained"
    color="primary"
    className={classes.button}
    startIcon={<EditIcon />}
    component={ReactLink} to={uri}
  >
    {text}
  </Button>)
}
ButtonEdit.prototype = {
  text: PropTypes.string,
  uri: PropTypes.string,
  fullWidth: PropTypes.bool
}
