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
import { AddQuestion } from '../../WebModel/Question/AddQuestion'
import { UpdateQuestion } from '../../WebModel/Question/UpdateQuestion'
import CodeBook from '../../component/CodeBook/CodeBook'
import CustomTable from '../../component/CustomTable/CustomTable'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { GetCodeBookDefaultValue } from '../../core/GetCodeBookDefaultValue'
import { useHistory } from 'react-router'
import { AddAnswer } from '../../WebModel/Answer/AddAnswer'
import { UpdateAnswer } from '../../WebModel/Answer/UpdateAnswer'
import CustomSelect from '../../component/CustomSelect/CustomSelect'
import SelectItem from '../../WebModel/Shared/SelectItem'
import _ from 'lodash'
import FileUpload from '../../component/FileUpload/FileUpload'
import FileUploader from '../../core/FileUploader'

export default function Question () {
  const { t } = useTranslation()
  let id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [question, setQuestion] = React.useState('')
  const [answerModeId, setAnswerModeId] = React.useState('')
  const [questionModeId, setQuestionModeId] = React.useState('')
  const [answers, setAnswers] = React.useState([])
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [bankOfQuestion, setBankOfQuestion] = React.useState([])
  const [bankOfQuestionId, setBankOfQuestionId] = React.useState('')
  const [answerMode, setAnswerMode] = React.useState([])
  const [questionMode, setQuestionMode] = React.useState([])
  const [files, setFiles] = React.useState([])
  const history = useHistory()
  const [changeFile, setChangeFile] = React.useState(false)
  const [fileName, setFileName] = React.useState('')
  const [fileId, setFileId] = React.useState('')
  const onUpload = (files: any) => {
    setChangeFile(false)
    setFiles(files)
  }

  const handleChangeQuestion = (event: any) => {
    setQuestion(event.target.value)
  }
  const deleteAnswerInQuestion = () => {
    if (id !== '') {
      axiosInstance.delete('webportal/Answer/DeleteAnswerInQuestion?questionId=' + id + '&accessToken=' + GetUserToken()).then(function () {
        loadAnswers()
      })
    }
  }

  const handleChangeanswerModeId = (event: any) => {
    deleteAnswerInQuestion()
    setAnswerModeId(event.target.value)
  }

  const handleChangeQuestionModeId = (event: any) => {
    setQuestionModeId(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }
  const loadAnswers = () => {
    setShowLoading(true)
    axiosInstance.get('webportal/Answer/GetAnswersInQuestion', {
      params: {
        accessToken: GetUserToken(),
        questionId: id
      }
    }).then(function (response: any) {
      setAnswers(response?.data?.data)
      setShowLoading(false)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('organizationId') : id, id === '' ? 'organization' : 'question')
      setPermitions(permitions)
      axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_answermode').then(function (response) {
        setAnswerMode(response?.data?.data)
      })
      axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_questionmode').then(function (response) {
        setQuestionMode(response?.data?.data)
      })

      if (id === '') {
        setValueTab(0)
        setShowLoading(false)
        setAnswerModeId(await (GetCodeBookDefaultValue('cb_answermode', [])))
        setQuestionModeId(await (GetCodeBookDefaultValue('cb_questionmode', [])))
      } else {
        await axiosInstance.get('webportal/Question/GetQuestionDetail', {
          params: {
            accessToken: GetUserToken(),
            questionId: id
          }
        }).then(function (response: any) {
          setQuestion(response?.data?.data?.question)
          setAnswerModeId(response?.data?.data?.answerModeId)
          setBankOfQuestionId(response?.data?.data?.bankOfQuestionId)
          setQuestionModeId(response?.data?.data?.questionModeId)
          setFileName(response?.data?.data?.originalFileName)
          setFileId(response?.data?.data?.fileId)
          loadAnswers()
        })
        setShowLoading(false)
      }

      axiosInstance.get('webportal/BankOfQuestion/GetBankOfQuestionInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        setBankOfQuestion(response?.data?.data)
        if (id === '') {
          setBankOfQuestionId(response?.data?.data?.find((x: any) => x.isDefault).id)
        }
        setShowLoading(false)
      })
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
    if (!validateAnswerCount()) {
      return
    }
    return save().then(function (response: any) {
      if (id === '') {
        history.push('/question/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId') + '&bankOfQuestionId=' + bankOfQuestionId)
      }
      if (files.length > 0) {
        FileUploader(files, id === '' ? response.data.data : id, 'question').then(function () {
          setShowLoading(false)
          return true
        })
      } else {
        setShowLoading(false)
        return true
      }
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }

  const saveBasicData = async () => {
    setShowLoading(true)
    if (!validateAnswerCount()) {
      return
    }

    return save().then(function (response: any) {
      if (files.length > 0) {
        FileUploader(files, id === '' ? response.data.data : id, 'question').then(function () {
          setShowLoading(false)
        })
      } else {
        setShowLoading(false)
      }
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }
  const save = (validate: boolean = true) => {
    if (id === '') {
      const obj = new AddQuestion(bankOfQuestionId, answerModeId, question, GetUserToken(), validate, questionModeId)
      return axiosInstance.post('webportal/Question/AddQuestion', obj)
    } else {
      const obj = new UpdateQuestion(id, answerModeId, question, GetUserToken(), bankOfQuestionId, questionModeId)
      return axiosInstance.put('webportal/Question/UpdateQuestion', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  const basicTab = () => {
    history.push('/question/edit?id=' + GetUrlParam('id') + '&bankOfQuestionId=' + bankOfQuestionId + '&organizationId=' + GetUrlParam('organizationId'))
  }

  const addActionFileMode = () => {
    save(false).then(function (response: any) {
      if (id === '') {
        history.push('/answer/edit?questionId=' + response.data.data + '&bankOfQuestionId=' + bankOfQuestionId + '&organizationId=' + GetUrlParam('organizationId'))
      } else {
        history.push('/answer/edit?questionId=' + id + '&bankOfQuestionId=' + bankOfQuestionId + '&organizationId=' + GetUrlParam('organizationId'))
      }
    })
  }

  const addAction = (newData: any) => {
    save(false).then(function (response: any) {
      if (id === '') {
        history.push('/question/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId') + '&bankOfQuestionId=' + bankOfQuestionId)
        id = response.data.data
      }
      const obj = new AddAnswer(id, newData.answer, newData.isTrueAnswer, GetUserToken(), answerModeId)
      axiosInstance.post('webportal/Answer/AddAnswer', obj).then(function () {
        loadAnswers()
      })
    })
  }

  const updateAction = (oldData: any, newData: any) => {
    const obj = new UpdateAnswer(oldData.id, newData.answer, newData.isTrueAnswer, GetUserToken(), answerModeId)
    axiosInstance.put('webportal/Answer/UpdateAnswer', obj).then(function () {
      loadAnswers()
    })
  }
  const handleChangeBankOfQuestion = (e: any) => {
    setBankOfQuestionId(e.target.value)
  }
  const validateAnswerCount = () => {
    if (_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY' ||
      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE' ||
      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_IMAGE' ||
      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_AUDIO' ||
      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_VIDEO' ||
      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_IMAGE' ||
      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_AUDIO' ||
      _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_VIDEO'
    ) {
      if (answers.filter((x: any) => x.isTrueAnswer).length === 0) {
        const message = [] as any
        message.push('ERROR.QUESTION.NEED_TRUE_ANSWER')
        setErrorMessage(message)
        setOpenError(true)
        setShowLoading(false)
        return false
      }
    }
    return true
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('QUESTION_EDIT_TITLE') + ' - ' + question} showBackButton={true} backButtonUrl={'/organization/edit/?id=' + GetUrlParam('organizationId') + '&gototab=question'} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('QUESTION_TAB_BASIC_INFORMATION')} {...a11yProps(0)} onClick={basicTab} />
            </Tabs>
          </AppBar>
          <TabPanel value={valueTab} index={0}>
            <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
            <ValidatorForm className={classes.form}
              onSubmit={saveBasicDataSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CodeBook codeBookIdentificator="cb_questionmode" label={t('QUESTION_QUESTION_MODE')} id={'questionmode'} value={questionModeId} onChange={handleChangeQuestionModeId} autoTranslate={true} />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('QUESTION')}
                    onChange={handleChangeQuestion}
                    name='question'
                    value={question}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='question'
                  />
                </Grid>
                {(_.get(questionMode.find((x: any) => x.id === questionModeId), 'systemIdentificator') === 'IMAGE_QUESTION' || _.get(questionMode.find((x: any) => x.id === questionModeId), 'systemIdentificator') === 'VIDEO_QUESTION' || _.get(questionMode.find((x: any) => x.id === questionModeId), 'systemIdentificator') === 'AUDIO_QUESTION') && <Grid item xs={12}>

                  <FileUpload onUpload={onUpload} fileName={fileName} fileId={fileId} parentId={id} operation="question" changeFile={changeFile}
                    accept={
                      _.get(questionMode.find((x: any) => x.id === questionModeId), 'systemIdentificator') === 'IMAGE_QUESTION' ? 'image/*'
                        : (_.get(questionMode.find((x: any) => x.id === questionModeId), 'systemIdentificator') === 'VIDEO_QUESTION' ? 'video/mp4,video/ogg'
                          : (_.get(questionMode.find((x: any) => x.id === questionModeId), 'systemIdentificator') === 'AUDIO_QUESTION' ? 'audio/*' : ''))
                    }
                  />
                </Grid>
                }

                <Grid item xs={12}>
                  <CustomSelect label={t('QUESTION_BANK_OF_QUESTION')} data={bankOfQuestion.map((e: any) => {
                    if (e.isDefault) {
                      e.name = t('DEFAULT_BANK_OF_QUESTION')
                    }
                    return new SelectItem(e.id, e.name)
                  })} selectValue={bankOfQuestionId} onChangeValue={handleChangeBankOfQuestion} id="bankofQUestion" multiple={false} />
                </Grid>
                <Grid item xs={12}>
                  <CodeBook codeBookIdentificator="cb_answermode" label={t('QUESTION_ANSWER_MODE')} id={'answermode'} value={answerModeId} onChange={handleChangeanswerModeId} autoTranslate={true} />
                </Grid>

                {(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY' || _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_IMAGE' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_AUDIO' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_VIDEO' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_IMAGE' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_AUDIO' ||
                  _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_VIDEO'
                ) &&
                  <Grid item xs={12}>
                    <CustomTable addLinkText={t('QUESTION_ANSWER_BUTTON_ADD')}

                      columns={
                        [
                          {
                            title: t('QUESTION_ANSWER_TABLE_TITLE'),
                            field: 'preivewUrl',
                            hidden: !(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_IMAGE' || _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_IMAGE'),
                            render: (rowData: any) =>
                              <img src={rowData.preivewUrl} width={100} />

                          },
                          {
                            title: t('QUESTION_ANSWER_TABLE_TITLE'),
                            field: 'preivewUrl',
                            hidden: !(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_AUDIO' || _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_AUDIO'),
                            render: (rowData: any) =>
                              <audio controls >
                                <source src={rowData.preivewUrl} type="audio/mpeg" />
                                <source src={rowData.preivewUrl} type="audio/ogg" />

                              </audio>

                          },
                          {
                            title: t('QUESTION_ANSWER_TABLE_TITLE'),
                            field: 'preivewUrl',
                            hidden: !(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_VIDEO' || _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_VIDEO'),
                            render: (rowData: any) =>
                              <video controls width='100%' style={{
                                height: '100vh'
                              }}>
                                <source src={rowData.preivewUrl} type="video/mp4" />
                                <source src={rowData.preivewUrl} type="video/ogg" />

                              </video>

                          },
                          {
                            title: t('QUESTION_ANSWER_TABLE_TITLE'),
                            field: 'answer',
                            hidden: (_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_IMAGE' ||
                              _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_AUDIO' ||
                              _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE_VIDEO' ||
                              _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_IMAGE' ||
                              _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_AUDIO' ||
                              _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY_VIDEO')
                          },

                          { title: t('QUESTION_ANSWER_TABLE_IS_TRUE_ANSWER'), field: 'isTrueAnswer', type: 'boolean' }

                        ]
                      }
                      editable={(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY' || _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE')}
                      showAddButton={true}
                      editParams={'questionId=' + id + '&bankOfQuestionId=' + bankOfQuestionId + '&organizationId=' + GetUrlParam('organizationId')}
                      showEdit={true}
                      showDelete={true}
                      data={answers}
                      editLinkUri={'/answer/edit'}
                      editLinkText={t('ANSWER_EDIT')}
                      deleteUrl={'webportal/Answer/DeleteAnswer'}
                      deleteDialogTitle={t('QUESTION_ANSWER_DELETE_TITLE')}
                      deleteDialogContent={t('QUESTION_ANSWER_DELETE_CONTENT')}
                      deleteParamIdName={'answerId'}
                      onReload={loadAnswers}
                      replaceContent={'answer'}
                      deleteButtonText={t('QUESTION_ANSWER_DELETE')}
                      addAction={(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY' || _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE') ? addAction : addActionFileMode}
                      editAction={(_.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_MANY' || _.get(answerMode.find((x: any) => x.id === answerModeId), 'systemIdentificator') === 'SELECT_ONE') ? updateAction : undefined}
                      title={t('QUESTION_ANSWERS')}

                    />

                  </Grid>}
              </Grid>
              <SaveButtons onSave={saveBasicData} backUrl={'/organization/edit/?id=' + GetUrlParam('organizationId') + '&gototab=question'} />

            </ValidatorForm>
          </TabPanel>
        </Paper>}

    </Container>
  )
}
