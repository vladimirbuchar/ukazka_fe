import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import Organization from '../../component/Organization/Organization'
import PageName from '../../component/PageName/PageName'
import MyCourse from '../../component/MyCourse/MyCourse'
import ManagedCourse from '../../component/ManagedCourse/ManagedCourse'
import PropTypes from 'prop-types'

export default function Dashboard (props:any) {
  const { t } = useTranslation()
  const classes = useStyles()
  const { onChangeOpacity } = props

  return (
    <Container component="main" maxWidth="xl">
      <PageName title={t('DASHBOARD_TITLE')} />
      {window.localStorage.getItem('organizationId') === '' &&
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"

        >
          <Typography className={classes.heading}>{t('DASHBOARD_ORGANIZATION_TITLE')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Organization />
        </ExpansionPanelDetails>
      </ExpansionPanel>}
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>{t('DASHBOARD_COURSE_TITLE')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

          <MyCourse hideFinishCourse={true} onChangeOpacity={onChangeOpacity} />

        </ExpansionPanelDetails>
      </ExpansionPanel>

      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>{t('DASHBOARD_COURSE_MANAGED_COURSE')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>

          <ManagedCourse />

        </ExpansionPanelDetails>
      </ExpansionPanel>

    </Container>
  )
}
Dashboard.prototype = {
  onChangeOpacity: PropTypes.func
}
