import { Container, Paper } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import PageName from '../../component/PageName/PageName'

export default function Help () {
  const { t } = useTranslation()
  return (<Container component="main" maxWidth="xl">
    <PageName title={t('PAGE_HELP_TITLE')} />
    <Paper>

    </Paper>
  </Container>

  )
}
