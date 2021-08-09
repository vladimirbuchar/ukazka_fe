import React from 'react'
import { Container } from '@material-ui/core'
import PageName from '../../component/PageName/PageName'
import { useTranslation } from 'react-i18next'

export default function Error404 () {
  const { t } = useTranslation()
  return (
    <Container component='main' maxWidth='xl'>
      <PageName title={t('ERROR404_TITLE')} />
      {t('ERROR404_TEXT')}
    </Container>
  )
}
