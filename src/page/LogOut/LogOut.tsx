import React from 'react'
import { Container } from '@material-ui/core'
import Loading from '../../component/Loading/Loading'
import PageName from '../../component/PageName/PageName'
export default function LogOut () {
  const logOutUrl = window.localStorage.getItem('logoutUrl') || '/'
  sessionStorage.clear()
  localStorage.removeItem('userId')
  localStorage.removeItem('userToken')
  window.location.href = logOutUrl

  return (
    <Container component="main" maxWidth="xs">
      <Loading showLoading={true} />
      <PageName title="" />
    </Container>
  )
}
