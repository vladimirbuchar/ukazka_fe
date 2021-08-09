import React from 'react'
import { Container, Paper, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import PageName from '../../component/PageName/PageName'
import useStyles from '../../styles'
import MyCourse from '../../component/MyCourse/MyCourse'
import PropTypes from 'prop-types'

export default function MyCourseList (props:any) {
  const { t } = useTranslation()
  const { onCancelOpacity } = props
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xl">
      <PageName title={t('MY_COURSE')} />
      <Paper>
        <Box className={classes.organizationMenu} >
          <MyCourse onChangeOpacity={onCancelOpacity}/>
        </Box>
      </Paper>
    </Container>
  )
}
MyCourseList.prototype = {
  onCancelOpacity: PropTypes.func
}
