import React from 'react'
import { Container } from '@material-ui/core'
import PageName from '../../component/PageName/PageName'
import { useTranslation } from 'react-i18next'

export default function Error500 () {
  const { t } = useTranslation()
  return (
    <Container component='main' maxWidth='xl'>
      <PageName title={t('ERROR500_TITLE')} />
      {t('ERROR500_TEXT')}
    </Container>
  )
}
