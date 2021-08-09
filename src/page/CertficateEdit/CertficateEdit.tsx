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
import { AddCertificate } from '../../WebModel/Certificate/AddCertificate'
import { UpdateCertificate } from '../../WebModel/Certificate/UpdateCertificate'

export default function CertficateEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [certificateName, setCertifcateName] = React.useState('')
  const [certificateHtml, setCertificateHtml] = React.useState('')
  const [certificateValidTo, setCertificateValidTo] = React.useState(0)

  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const history = useHistory()

  const handleChangeCertificateHtml = (content: any) => {
    setCertificateHtml(content)
  }
  const handleChangeCertificateName = (event: any) => {
    setCertifcateName(event.target.value)
  }
  const handleChangeCertificateValidTo = (event: any) => {
    setCertificateValidTo(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('organizationId') : id, id === '' ? 'organization' : 'certificate')
      setPermitions(permitions)
      if (id === '') {
        setValueTab(0)
        setShowLoading(false)
      } else {
        await axiosInstance.get('webportal/Certificate/GetCertificateDetail', {
          params: {
            accessToken: GetUserToken(),
            certificateId: id
          }
        }).then(function (response: any) {
          setCertificateHtml(response?.data?.data?.html)
          setCertifcateName(response?.data?.data?.name)
          setCertificateValidTo(response?.data?.data?.certificateValidTo)
          setShowLoading(false)
        })
      }
    }
    fetchData()
  }, [])

  const showErorr = (errors:[]) => {
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
        history.push('/certificateedit/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
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
      const obj = new AddCertificate(GetUrlParam('organizationId'), GetUserToken(), certificateName, certificateHtml, certificateValidTo)
      return axiosInstance.post('webportal/Certificate/AddCertificate', obj)
    } else {
      const obj = new UpdateCertificate(id, GetUserToken(), certificateName, certificateHtml, GetUrlParam('organizationId'), certificateValidTo)
      return axiosInstance.put('webportal/Certificate/UpdateCertificate', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('CERTIFICATE_TITLE') + ' - ' + certificateName} showBackButton={true} backButtonUrl={'/organization/edit?id=' + GetUrlParam('organizationId') + '&gototab=cert'} organizationId={GetUrlParam('organizationId')} showChangeCulture={true} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('CERTIFICATE_TAB_BASIC_INFORMATION')} {...a11yProps(0)} />
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
                    label={t('CERTIFICATE_NAME')}
                    onChange={handleChangeCertificateName}
                    name='certificateName'
                    value={certificateName}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='certificateName'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('CERTIFICATE_VALID_TO')}
                    onChange={handleChangeCertificateValidTo}
                    name='certificateValidTo'
                    value={certificateValidTo}
                    variant='outlined'
                    fullWidth
                    id='certificateValidTo'
                    type='number'
                    validators={['isGreaterThanZero']}
                    errorMessages={[t('VALIDATION_GREATER_THAN_ZERO')]}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomHtmlEditor content={certificateHtml} onChangeContent={handleChangeCertificateHtml} enableTemplate={true} />

                </Grid>

              </Grid>

              <SaveButtons onSave={saveBasicData} backUrl={'/organization/edit?id=' + GetUrlParam('organizationId') + '&gototab=cert'} showSaveButton={false} />

            </ValidatorForm>
          </TabPanel>

        </Paper>}

    </Container>
  )
}
