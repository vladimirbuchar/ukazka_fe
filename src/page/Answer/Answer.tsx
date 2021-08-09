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
import { AddAnswer } from '../../WebModel/Answer/AddAnswer'
import { UpdateAnswer } from '../../WebModel/Answer/UpdateAnswer'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import FileUpload from '../../component/FileUpload/FileUpload'
import _ from 'lodash'
import FileUploader from '../../core/FileUploader'

export default function Answer () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [answer, setAnswer] = React.useState('')
  const [isTrueAnswer, setIsTrueAnswer] = React.useState(false)
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [changeFile, setChangeFile] = React.useState(false)
  const [fileName, setFileName] = React.useState('')
  const [fileId, setFileId] = React.useState('')
  const [files, setFiles] = React.useState([])
  const [answerModeId, setAnswerModeId] = React.useState('')
  const [answerMode, setAnswerMode] = React.useState([])

  const handleChangeAnswer = (event: any) => {
    setAnswer(event.target.value)
  }

  const handleChangeIsTrueAnswer = (event: any) => {
    setIsTrueAnswer(event.target.checked)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }

  const onUpload = (files: any) => {
    setChangeFile(false)
    setFiles(files)
  }

  useEffect(() => {
    setShowLoading(true)
    const fetchData = async () => {
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('questionId') : id, id === '' ? 'question' : 'answer')
      setPermitions(permitions)
      axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_answermode').then(function (response) {
        setAnswerMode(response?.data?.data)
      })

      await axiosInstance.get('webportal/Question/GetQuestionDetail', {
        params: {
          accessToken: GetUserToken(),
          questionId: GetUrlParam('questionId')
        }
      }).then(function (response: any) {
        setAnswerModeId(response?.data?.data?.answerModeId)
      })
      if (id === '') {
        setShowLoading(false)
        setValueTab(0)
      } else {
        await axiosInstance.get('webportal/Answer/GetAnswerDetail', {
          params: {
            accessToken: GetUserToken(),
            answerId: id
          }
        }).then(function (response: any) {
          setAnswer(response?.data?.data?.answer)
          setIsTrueAnswer(response?.data?.data?.isTrueAnswer)
          setFileName(response?.data?.data?.fileName)
          setFileId(response?.data?.data?.fileId)
          setShowLoading(false)
        })
      }
    }
    fetchData()
  }, [])

  const saveBasicData = () => {
    setShowLoading(true)
    return save().then(function (response:any) {
      if (files.length > 0) {
        FileUploader(files, id === '' ? response.data.data : id, 'answer').then(function () {
          setShowLoading(false)
          return true
        })
      } else {
        setShowLoading(false)
        return true
      }
    })
      .catch((error: any) => {
        if (error?.response?.data?.errors?.length > 0) {
          const message = [] as any
          error?.response?.data?.errors?.forEach((element: any) => {
            message.push(element.basicCode)
          })
          setErrorMessage(message)
          setOpenError(true)
        }
        setShowLoading(false)
        return false
      })
  }
  const save = () => {
    if (id === '') {
      const obj = new AddAnswer(GetUrlParam('questionId'), answer, isTrueAnswer, GetUserToken(), answerModeId)
      return axiosInstance.post('webportal/Answer/AddAnswer', obj)
    } else {
      const obj = new UpdateAnswer(id, answer, isTrueAnswer, GetUserToken(), answerModeId)
      return axiosInstance.put('webportal/Answer/UpdateAnswer', obj)
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
      <PageName title={t('ANSWER_EDIT_TITLE') + ' - ' + answer} showBackButton={true} backButtonUrl={'/question/edit?id=' + GetUrlParam('questionId') + '&bankOfQuestionId=' + GetUrlParam('bankOfQuestionId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=answer'}/>
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('ANSWWER_TAB_BASIC_INFORMATION')} {...a11yProps(0)} />

            </Tabs>
          </AppBar>
          <TabPanel value={valueTab} index={0}>
            <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
            <ValidatorForm className={classes.form}
              onSubmit={saveBasicData}
            >
              <Grid container spacing={2}>
                {(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY' || _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE') &&
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('ANSWER')}
                    onChange={handleChangeAnswer}
                    name='answer'
                    value={answer}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='answer'
                  />
                </Grid>}
                {(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_IMAGE' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_AUDIO' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_VIDEO' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_IMAGE' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_AUDIO' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_VIDEO') &&
                <Grid item xs={12}>
                  <FileUpload onUpload={onUpload} fileName={fileName} fileId={fileId} parentId={id} operation="answerUpload" changeFile={changeFile}
                    accept={
                      (_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_IMAGE' ||
                                    _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_IMAGE'
                      )
                        ? 'image/*' : ((_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_VIDEO' ||
                                      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_VIDEO'
                        ) ? 'video/mp4,video/ogg' : ((_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_AUDIO' ||
                                      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_AUDIO'
                          ) ? 'audio/*' : ''))
                    }
                  />
                </Grid>}
                <Grid item xs={12}>
                  <CustomCheckBox
                    checked={isTrueAnswer}
                    onChange={handleChangeIsTrueAnswer}
                    name="isTrueAnswer"
                    label={t('IS_TRUE_ANSWER')} />
                </Grid>
              </Grid>
              <SaveButtons showSaveButton={false} onSave={saveBasicData} backUrl={'/question/edit?id=' + GetUrlParam('questionId') + '&bankOfQuestionId=' + GetUrlParam('bankOfQuestionId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=answer'} />

            </ValidatorForm>
          </TabPanel>

        </Paper>
      }
    </Container>
  )
}
