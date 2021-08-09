import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import { Container, AppBar, Tabs, Tab, Paper } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import a11yProps from '../../component/A11yProps/A11yProps'
import TabPanel from '../../component/TabPanel/TabPanel'
import { ValidatorForm } from 'react-material-ui-form-validator'
import PageName from '../../component/PageName/PageName'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import _ from 'lodash'
import CustomHtmlEditor from '../../component/CustomHtmlEditor/CustomHtmlEditor'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { useHistory } from 'react-router'
import { AddSendMesage } from '../../WebModel/SendMessage/AddSendMesage'
import { UpdateSendMessage } from '../../WebModel/SendMessage/UpdateSendMessage'
import CodeBook from '../../component/CodeBook/CodeBook'
import { CodeBookItem } from '../../WebModel/Shared/CodeBookItem'

export default function SendMessageEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [sendMessageName, setSendMessageName] = React.useState('')
  const [sendMessageHtml, setSendMessageHtml] = React.useState('')
  const [sendMessageType, setSendMessageType] = React.useState('')
  const [reply, setReply] = React.useState('')
  const [cbSendMessageType, setCbSendMessageType] = React.useState([])
  const [sendMessageIdentficator, setSendMessageIdentficator] = React.useState('')
  const [sendMessage, setSendMessage] = React.useState([])

  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const history = useHistory()

  const handleChangeCertificateHtml = (content: any) => {
    setSendMessageHtml(content)
  }
  const handleChangeCertificateName = (event: any) => {
    setSendMessageName(event.target.value)
  }
  const handleChangeReply = (event: any) => {
    setReply(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      await axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_sendmessagetype').then(function (response) {
        setCbSendMessageType(response?.data?.data)
      })

      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('organizationId') : id, id === '' ? 'organization' : 'sendmessage')
      setPermitions(permitions)
      if (id === '') {
        setValueTab(0)
        setShowLoading(false)
      } else {
        await axiosInstance.get('webportal/SendMessage/GetSendMessageDetail', {
          params: {
            accessToken: GetUserToken(),
            sendMessageId: id
          }
        }).then(function (response: any) {
          setSendMessageHtml(response?.data?.data?.html)
          setSendMessageName(response?.data?.data?.name)
          setSendMessageType(response?.data?.data?.sendMessageType)
          setReply(response?.data?.data?.reply)
          setShowLoading(false)
          axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_sendmessagetype').then(function (response2) {
            const item = response2.data.data.find((x: CodeBookItem) => x.id === response?.data?.data?.sendMessageType)
            setSendMessageIdentficator(_.get(item, 'systemIdentificator', ''))
          })
        })
      }
    }
    fetchData()
  }, [])

  const showErorr = (errors: []) => {
    if (errors?.length > 0) {
      const message = [] as any
      errors?.forEach((element: any) => {
        message.push(element.basicCode)
      })
      setErrorMessage(message)
      setOpenError(true)
      setShowLoading(false)
      return false
    }
    setShowLoading(false)
    return true
  }
  const saveBasicDataSubmit = async () => {
    setShowLoading(true)
    setOpenError(false)
    return save().then(function (response: any) {
      if (id === '') {
        history.push('/sendmessageedit/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
      }
      setShowLoading(false)

      return true
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }

  const saveBasicData = () => {
    setShowLoading(true)
    return save().then(function () {
      setShowLoading(false)
      return true
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }
  const save = () => {
    if (id === '') {
      const obj = new AddSendMesage(GetUrlParam('organizationId'), GetUserToken(), sendMessageName, sendMessageHtml, sendMessageType, reply)
      return axiosInstance.post('webportal/SendMessage/AddSendMessage', obj)
    } else {
      const obj = new UpdateSendMessage(id, GetUserToken(), sendMessageName, sendMessageHtml, GetUrlParam('organizationId'), sendMessageType, reply)
      return axiosInstance.put('webportal/SendMessage/UpdateSendMessage', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }
  const handleChangeCourseType = (e: any) => {
    setSendMessageType(e.target.value)
    const item = cbSendMessageType.find((x: CodeBookItem) => x.id === e.target.value)
    setSendMessageIdentficator(_.get(item, 'systemIdentificator', ''))
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('SEND_MESSAGE_TITLE') + ' - ' + sendMessageName} showBackButton={true} backButtonUrl={'/organization/edit?id=' + GetUrlParam('organizationId') + '&gototab=message'} organizationId={GetUrlParam('organizationId')} showChangeCulture={true} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('SEND_MESSAGE_TAB_BASIC_INFORMATION')} {...a11yProps(0)} />
            </Tabs>
          </AppBar>
          <TabPanel value={valueTab} index={0}>
            <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
            <ValidatorForm className={classes.form}
              onSubmit={saveBasicDataSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('MESSAGE_TEMPLATE_NAME')}
                    onChange={handleChangeCertificateName}
                    name='certificateName'
                    value={sendMessageName}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='certificateName'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CodeBook codeBookIdentificator='cb_sendmessagetype' label={t('MESSAGE_TEMPLATE_TYPE')} id='courseType' value={sendMessageType} onChange={handleChangeCourseType} autoTranslate={true} data={cbSendMessageType} />
                </Grid>
                {sendMessageIdentficator === 'EMAIL' &&
                  <Grid item xs={12}>
                    <CustomTextValidator
                      label={t('MESSAGE_TEMPLATE_REPLY')}
                      onChange={handleChangeReply}
                      name='reply'
                      value={reply}
                      variant='outlined'
                      fullWidth
                      id='reply'
                      validators={['required', 'isEmail']}
                      errorMessages={[t('VALIDATION_REQUIRED'), t('VALIDATION_EMAIL')]}

                    />
                  </Grid>
                }

                {sendMessageIdentficator === 'EMAIL' &&
                  <Grid item xs={12}>
                    <CustomHtmlEditor content={sendMessageHtml} onChangeContent={handleChangeCertificateHtml} enableTemplate={true} />

                  </Grid>
                }

              </Grid>

              <SaveButtons onSave={saveBasicData} backUrl={'/organization/edit?id=' + GetUrlParam('organizationId') + '&gototab=message'} showSaveButton={false} />

            </ValidatorForm>
          </TabPanel>

        </Paper>}

    </Container>
  )
}
