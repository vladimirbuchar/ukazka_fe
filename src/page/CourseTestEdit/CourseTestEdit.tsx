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
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import { AddCourseTest } from '../../WebModel/CourseTest/AddCourseTest'
import { UpdateCourseTest } from '../../WebModel/CourseTest/UpdateCourseTest'
import CustomSelect from '../../component/CustomSelect/CustomSelect'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import SelectItem from '../../WebModel/Shared/SelectItem'
import MaxTest from './MaxTest.json'

export default function CourseTestEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [courseLessonName, setCourseLessonName] = React.useState('')
  const [courseLessonDescription, setCourseLessonDescription] = React.useState('')
  const [isRandomGenerateQuestion, setIsRandomGenerateQuestion] = React.useState(false)
  const [questionCountInTest, setQuestionCountInTest] = React.useState(0)
  const [timeLimit, setTimeLimit] = React.useState(0)
  const [desiredSuccess, setDesiredSuccess] = React.useState(0)
  const [selectedBankOfQuestion, setSelectedBankOfQuestion] = React.useState([] as any)
  const [bankOfQuestion, setBankOfQuestion] = React.useState([] as any)
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [bankOfQuestionError, setBankOfQuestionError] = React.useState(false)
  const [isSaveError, setIsSaveError] = React.useState(true)
  const [maxTestCombo, setMaxTestCombo] = React.useState(0)
  const [maxTest, setMaxTest] = React.useState(0)

  const handleSelectedBankOfQuestion = (event: any) => {
    setSelectedBankOfQuestion(event.target.value as never[])
    setBankOfQuestionError(false)
    if (event.target.value.length === 0) {
      setBankOfQuestionError(true)
    }
  }
  const handleSelectedMaxTestCombo = (event: any) => {
    setMaxTestCombo(event.target.value)
    if (event.target.value === 0 || event.target.value === -1) {
      setMaxTest(event.target.value)
    } else {
      setMaxTest(0)
    }
  }

  const handleChangeCourseLessonName = (event: any) => {
    setCourseLessonName(event.target.value)
  }

  const handleChangeCourseLessonDescription = (event: any) => {
    setCourseLessonDescription(event.target.value)
  }
  const handleChangeIsRandomGenerateQuestion = (event: any) => {
    setIsRandomGenerateQuestion(event.target.checked)
  }
  const handleChangeQuestionCountInTest = (event: any) => {
    setQuestionCountInTest(event.target.value)
  }
  const handleChangeMaxText = (event: any) => {
    setMaxTest(event.target.value)
  }
  const handleChangeTimeLimit = (event: any) => {
    setTimeLimit(event.target.value)
  }
  const handleChangeDesiredSuccess = (event: any) => {
    setDesiredSuccess(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('materialId') : id, id === '' ? 'coursematerialedit' : 'courseLesson')
      setPermitions(permitions)
      axiosInstance.get('webportal/BankOfQuestion/GetBankOfQuestionInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        setBankOfQuestion(response?.data?.data)
      })
      if (id === '') {
        setShowLoading(false)
        setValueTab(0)
      } else {
        await axiosInstance.get('webportal/CourseTest/GetCourseTestDetail', {
          params: {
            accessToken: GetUserToken(),
            courseLessonId: id
          }
        }).then(function (response: any) {
          setCourseLessonName(response?.data?.data?.name)
          setCourseLessonDescription(response?.data?.data?.description)
          setIsRandomGenerateQuestion(response?.data?.data?.isRandomGenerateQuestion)
          setQuestionCountInTest(response?.data?.data?.questionCountInTest)
          setTimeLimit(response?.data?.data?.timeLimit)
          setDesiredSuccess(response?.data?.data?.desiredSuccess)
          setSelectedBankOfQuestion(response?.data?.data?.bankOfQuestion)
          if (response?.data?.data?.maxRepetition > 0) {
            setMaxTestCombo(-2)
          } else {
            setMaxTestCombo(response?.data?.data?.maxRepetition)
          }
          setMaxTest(response?.data?.data?.maxRepetition)
          setShowLoading(false)
        })
      }
    }
    fetchData()
  }, [])

  const saveBasicData = (event: any) => {
    setShowLoading(true)
    if (selectedBankOfQuestion.length === 0) {
      setBankOfQuestionError(true)
      setShowLoading(false)
      return
    }
    return save().then(function (response: any) {
      setShowLoading(false)
      setIsSaveError(false)
      return true
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
        setIsSaveError(true)
        return false
      })
  }
  const save = () => {
    if (id === '') {
      const obj = new AddCourseTest(courseLessonName, courseLessonDescription, GetUrlParam('materialId'), GetUserToken(), 'COURSE_TEST', isRandomGenerateQuestion, questionCountInTest, timeLimit, desiredSuccess, selectedBankOfQuestion, maxTest)
      return axiosInstance.post('webportal/CourseTest/AddCourseTest', obj)
    } else {
      const obj = new UpdateCourseTest(id, courseLessonName, courseLessonDescription, GetUserToken(), isRandomGenerateQuestion, questionCountInTest, timeLimit, desiredSuccess, selectedBankOfQuestion, maxTest)
      return axiosInstance.put('webportal/CourseTest/UpdateCourseTest', obj)
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

      <PageName title={t('COURSE_TEST_TITLE') + ' - ' + courseLessonName} showBackButton={true} backButtonUrl={'/coursematerialedit/?id=' + GetUrlParam('materialId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=coursematerial'} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('COURSE_TEST_TAB_BASIC_INFORMATION')} {...a11yProps(0)} />

            </Tabs>
          </AppBar>
          <TabPanel value={valueTab} index={0}>
            <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
            <ValidatorForm className={classes.form}
              onSubmit={saveBasicData}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_TEST_NAME')}
                    onChange={handleChangeCourseLessonName}
                    name='courseLessonName'
                    value={courseLessonName}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='courseLessonName'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_TEST_DESCRIPTION')}
                    onChange={handleChangeCourseLessonDescription}
                    name='courseLessonDescription'
                    value={courseLessonDescription}
                    variant='outlined'
                    fullWidth
                    id='courseLessonDescription'
                    rows={5}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomCheckBox checked={isRandomGenerateQuestion} onChange={handleChangeIsRandomGenerateQuestion} name='isRandomGenerateQuestion' label={t('COURSE_TEST_RANDOM_GENERATE_QUESTION')} />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_TEST_QUESTION_COUNT_IN_TEST')}
                    onChange={handleChangeQuestionCountInTest}
                    name='questionCountInTest'
                    value={questionCountInTest}
                    validators={['required', 'isGreaterThanZero']}
                    errorMessages={[t('VALIDATION_REQUIRED'), t('VALIDATION_GREATER_THAN_ZERO')]}
                    variant='outlined'
                    fullWidth
                    id='questionCountInTest'
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_TEST_TIME_LIMIT')}
                    onChange={handleChangeTimeLimit}
                    name='timeLimit'
                    value={timeLimit}
                    validators={['required', 'isGreaterThanZero']}
                    errorMessages={[t('VALIDATION_REQUIRED'), t('VALIDATION_GREATER_THAN_ZERO')]}
                    variant='outlined'
                    fullWidth
                    id='timeLimit'
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_TEST_DESIRED_SUCCESS')}
                    onChange={handleChangeDesiredSuccess}
                    name='desiredSuccess'
                    value={desiredSuccess}
                    validators={['required', 'isGreaterThanZero']}
                    errorMessages={[t('VALIDATION_REQUIRED'), t('VALIDATION_GREATER_THAN_ZERO')]}
                    variant='outlined'
                    fullWidth
                    id='desiredSuccess'
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomSelect label={t('COURSE_TEST_BANKOF_QUESTION')} data={bankOfQuestion.map(function (e: any) {
                    if (e.name === 'DEFAULT_BANK_OF_QUESTION') {
                      e.name = t('DEFAULT_BANK_OF_QUESTION')
                    }

                    return new SelectItem(e.id, e.name)
                  })} selectValue={selectedBankOfQuestion} onChangeValue={handleSelectedBankOfQuestion} id="bankOfQuestion" showSelectValue={false} multiple={true} error={bankOfQuestionError} errorMessage={t('COURSE_TEST_BANKOF_QUESTION_IS_NOT_SELECT')} />
                </Grid>

                <Grid item xs={12}>
                  <CustomSelect label={t('COURSE_TEST_MAX_TEST')} data={MaxTest.map(function (e: any) {
                    return new SelectItem(e.Id, t(e.Text))
                  })} selectValue={maxTestCombo} onChangeValue={handleSelectedMaxTestCombo} id="maxTest" />
                </Grid>
                {maxTestCombo === -2 &&
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_TEST_MAX_TEST_TRUE_CUSTOM_TEXT')}
                    onChange={handleChangeMaxText}
                    name='maxTest'
                    value={maxTest}
                    validators={['required', 'isGreaterThanZero']}
                    errorMessages={[t('VALIDATION_REQUIRED'), t('VALIDATION_GREATER_THAN_ZERO')]}
                    variant='outlined'
                    fullWidth
                    id='maxTest'
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                }

              </Grid>
              <SaveButtons showSaveButton={false} onSave={saveBasicData} backUrl={'/coursematerialedit/?id=' + GetUrlParam('materialId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=coursematerial'} />

            </ValidatorForm>
          </TabPanel>

        </Paper>}

    </Container>
  )
}
