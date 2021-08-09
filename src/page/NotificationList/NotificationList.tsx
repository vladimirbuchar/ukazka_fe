import React, { useEffect } from 'react'
import { Container, Paper, AppBar, Tabs, Tab, Grid } from '@material-ui/core'
import PageName from '../../component/PageName/PageName'
import { useTranslation } from 'react-i18next'
import a11yProps from '../../component/A11yProps/A11yProps'
import TabPanel from '../../component/TabPanel/TabPanel'
import { axiosInstance } from '../../axiosInstance'
import GetUserToken from '../../core/GetUserToken'
import Loading from '../../component/Loading/Loading'

export default function Notifications () {
  const { t } = useTranslation()
  const [valueTab, setValueTab] = React.useState(0)
  const [notificationList, setNotificationList] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }

  const loadNotifications = async () => {
    setShowLoading(true)
    await axiosInstance.get('webportal/Notification/GetMyNotification', {
      params: {
        accessToken: GetUserToken()
      }
    }).then(function (response) {
      setNotificationList(response?.data?.data)
      axiosInstance.put('webportal/Notification/SetIsNewNotificationToFalse', {
        userAccessToken: GetUserToken()
      })
      setShowLoading(false)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      loadNotifications()
    }
    fetchData()
  }, [])

  return (
    <Container component="main" maxWidth="xl">

      <Loading showLoading={showLoading} />
      <PageName title={t('NOTIFICATION_TITLE')} />
      <Paper>
        <AppBar position="static">
          <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
            <Tab label={t('NOTIFICATION_TITLE')} {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={valueTab} index={0}>
          {notificationList?.map((e: any, keyIndex: any) => {
            return (<Grid xs={12} key={keyIndex}>
              {
                e.notificationIdentificator === 'INVITE_TO_ORGANIZATION' && t('NOTIFICATION_INVITE_TO_ORGANIZATION').replace('{organizationName}', e.data['{organizationName}'])
              }

            </Grid>)
          })
          }
        </TabPanel>

      </Paper>
    </Container>
  )
}
