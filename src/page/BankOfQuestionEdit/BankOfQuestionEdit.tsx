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
import { AddBankOfQuestion } from '../../WebModel/BankOfQuestion/AddBankOfQuestion'
import { UpdateBankOfQuestion } from '../../WebModel/BankOfQuestion/UpdateBankOfQuestion'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { useHistory } from 'react-router'

export default function BankOfQuestionEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [bankOfQuestionName, setBankOfQuestionName] = React.useState('')
  const [bankOfQuestionLessonDescription, setBankOfQuestionDescription] = React.useState('')
  const [questions, setQuestions] = React.useState([])
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const goToTab = GetUrlParam('gototab')
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [isDefault, setIsDefault] = React.useState(false)
  const history = useHistory()

  const handleChangeBankOfQuestionName = (event: any) => {
    setBankOfQuestionName(event.target.value)
  }

  const handleChangeBankOfQuestionDescription = (event: any) => {
    setBankOfQuestionDescription(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }
  const loadQuestions = () => {
    setShowLoading(true)
    axiosInstance.get('webportal/Question/GetQuestionInOrganization', {
      params: {
        accessToken: GetUserToken(),
        organizationId: GetUrlParam('organizationId')
      }
    }).then(function (response: any) {
      setQuestions(response?.data?.data)
      setShowLoading(false)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('organizationId') : id, id === '' ? 'organization' : 'bankOfQuestion')
      setPermitions(permitions)
      if (goToTab === 'questions') {
        setValueTab(1)
        loadQuestions()
      } else {
        setValueTab(0)
      }
      if (id === '') {
        setShowLoading(false)
        setValueTab(0)
      } else {
        await axiosInstance.get('webportal/BankOfQuestion/GetBankOfQuestionDetail', {
          params: {
            accessToken: GetUserToken(),
            bankOfQuestionId: id
          }
        }).then(function (response: any) {
          setBankOfQuestionName(response?.data?.data?.name)
          setBankOfQuestionDescription(response?.data?.data?.description)
          setIsDefault(response?.data?.data?.isDefault)
          setShowLoading(false)
        })
      }
    }
    fetchData()
  }, [])

  const saveBasicDataSubmit = async () => {
    setShowLoading(true)
    setOpenError(false)
    return save().then(function (response: any) {
      if (id === '') {
        history.push('/bankofquestion/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
      }
      setShowLoading(false)

      return true
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }

  const save = () => {
    if (id === '') {
      const obj = new AddBankOfQuestion(bankOfQuestionName, bankOfQuestionLessonDescription, GetUrlParam('organizationId'), GetUserToken())
      return axiosInstance.post('webportal/BankOfQuestion/AddBankOfQuestion', obj)
    } else {
      const obj = new UpdateBankOfQuestion(id, bankOfQuestionName, bankOfQuestionLessonDescription, GetUserToken())
      return axiosInstance.put('webportal/BankOfQuestion/UpdateBankOfQuestion', obj)
    }
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

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }
  const clickBasicTab = () => {
    history.push('/bankofquestion/edit?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId'))
  }
  const clickQuestionTab = () => {
    history.push('/bankofquestion/edit?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=questions')
    loadQuestions()
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('BANK_OF_QUESTION_TITLE') + ' - ' + (isDefault && bankOfQuestionName === 'DEFAULT_BANK_OF_QUESTION' ? t('DEFAULT_BANK_OF_QUESTION') : bankOfQuestionName)} showBackButton={true} backButtonUrl={'/organization/course/?id=' + GetUrlParam('organizationId') + '&gototab=bankOfQuestion'} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('BANK_OF_QUESTION_TAB_BASIC_INFORMATION')} {...a11yProps(0)} onClick={clickBasicTab}/>

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
                    label={t('BANK_OF_QUESTION_NAME')}
                    onChange={handleChangeBankOfQuestionName}
                    name='bankOfQuestionName'
                    value={(isDefault && bankOfQuestionName === 'DEFAULT_BANK_OF_QUESTION' ? t('DEFAULT_BANK_OF_QUESTION') : bankOfQuestionName)}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='bankOfQuestionName'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('BANK_OF_QUESTION_DESCRIPTION')}
                    onChange={handleChangeBankOfQuestionDescription}
                    name='bankOfQuestionLessonDescription'
                    value={bankOfQuestionLessonDescription}
                    variant='outlined'
                    fullWidth
                    id='bankOfQuestionLessonDescription'
                    rows={5}
                    multiline={true}
                  />
                </Grid>
              </Grid>
              <SaveButtons onSave={saveBasicData} backUrl={'/organization/course/?id=' + GetUrlParam('organizationId') + '&gototab=bankOfQuestion'} />

            </ValidatorForm>
          </TabPanel>

        </Paper>}

    </Container>
  )
}
