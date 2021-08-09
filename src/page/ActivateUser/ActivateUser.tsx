import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import GetUrlParam from '../../core/GetUrlParam'
import UserActivate from '../../WebModel/User/UserActivate'
import PageName from '../../component/PageName/PageName'
export default function ActivateUser () {
  const { t } = useTranslation()
  const id = GetUrlParam('id')
  useEffect(() => {
    const fetchData = async () => {
      const obj = new UserActivate(id)
      axiosInstance.put('web/User/ActivateUser', obj)
    }
    fetchData()
  }, [])

  return (

    <Container component="main" maxWidth="xl">
      <PageName title={t('ACTIVATE_TITLE')} />
      {t('ACTIVATE_TEXT')}

    </Container>

  )
}
