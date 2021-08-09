import React from 'react'
import Organization from '../../component/Organization/Organization'
import { Container, Paper, Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import PageName from '../../component/PageName/PageName'
import useStyles from '../../styles'

export default function OrganizationList () {
  const { t } = useTranslation()
  const classes = useStyles()
  return (
    <Container component="main" maxWidth="xl">
      <PageName title={t('MY_ORGANIZATIONS')} />
      <Paper>
        <Box className={classes.organizationMenu} >
          <Organization />
        </Box>
      </Paper>
    </Container>
  )
}
