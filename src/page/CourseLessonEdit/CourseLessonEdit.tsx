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
import CustomDragAndDropPanel from '../../component/CustomDragAndDropPanel/CustomDragAndDropPanel'
import { AddCourseLesson } from '../../WebModel/CourseLesson/AddCourseLesson'
import { UpdateCourseLesson } from '../../WebModel/CourseLesson/UpdateCourseLesson'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { useHistory } from 'react-router'

export default function CourseLessonEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [courseLessonName, setCourseLessonName] = React.useState('')
  const [courseType, setCourseType] = React.useState('COURSE_ITEM')
  const [courseLessonDescription, setCourseLessonDescription] = React.useState('')
  const [courseLessonItems, setCourseLessonItems] = React.useState([])
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const history = useHistory()
  const goToTab = GetUrlParam('gototab')

  const handleChangeCourseLessonName = (event: any) => {
    setCourseLessonName(event.target.value)
  }

  const handleChangeCourseLessonDescription = (event: any) => {
    setCourseLessonDescription(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    if (valueTab === 0) {
      return save().then(function (response: any) {
        if (id === '') {
          history.push('/courselesson/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + GetUrlParam('materialId'))
          id = response.data.data
          setCourseType('COURSE_ITEM')
        }
        setShowLoading(false)
        if (newValue === 1) {
          loadCourseLessonItem()
        }
        setValueTab(newValue)
      })
        .catch((error: any) => {
          return showErorr(error?.response?.data?.errors)
        })
    } else {
      setValueTab(newValue)
    }
  }

  const onClickBase = () => {
    // history.push("/courselesson/edit?id="+GetUrlParam("id")+"&organizationId="+GetUrlParam("organizationId")+"&materialId="+GetUrlParam("materialId"))
  }
  const clickCourseLessonItem = () => {
    //   history.push("/courselesson/edit?id="+GetUrlParam("id")+"&organizationId="+GetUrlParam("organizationId")+"&materialId="+GetUrlParam("materialId")+"&gototab=courselessonitems")

  }
  const loadCourseLessonItem = () => {
    setShowLoading(true)
    axiosInstance.get('webportal/CourseLessonItem/GetCourseLessonItems', {
      params: {
        accessToken: GetUserToken(),
        courseLessonId: id
      }
    }).then(function (response: any) {
      setCourseLessonItems(response?.data?.data?.map(function (item: any) {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          customEditLink: '/courselessonitem/edit?id=' + item.id + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + GetUrlParam('materialId') + '&courseLessonId=' + id
        }
      }))
      setShowLoading(false)
    })
  }
  const moveItem = (result: any) => {
    const ids = result.map(function (item: any) {
      return item.id
    })

    axiosInstance.put('webportal/CourseLessonItem/UpdatePositionCourseLessonItem', {
      ids: ids,
      userAccessToken: GetUserToken()
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('materialId') : id, id === '' ? 'coursematerialedit' : 'courseLesson')
      setPermitions(permitions)
      if (goToTab === 'courselessonitems') {
        setValueTab(1)
      } else {
        setValueTab(0)
      }
      if (id === '') {
        setValueTab(0)
        setShowLoading(false)
      } else {
        await axiosInstance.get('webportal/CourseLesson/GetCourseLessonDetail', {
          params: {
            accessToken: GetUserToken(),
            courseLessonId: id
          }
        }).then(function (response: any) {
          setCourseLessonName(response?.data?.data?.name)
          setCourseLessonDescription(response?.data?.data?.description)
          setCourseType(response?.data?.data?.type)
        })
        loadCourseLessonItem()
        setShowLoading(false)
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

  const saveBasicData = () => {
    setShowLoading(true)
    return save().then(function (response: any) {
      if (id === '') {
        setCourseType('COURSE_ITEM')
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
      const obj = new AddCourseLesson(courseLessonName, courseLessonDescription, GetUrlParam('materialId'), GetUserToken(), 'COURSE_ITEM')
      return axiosInstance.post('webportal/CourseLesson/AddCourseLesson', obj)
    } else {
      const obj = new UpdateCourseLesson(id, courseLessonName, courseLessonDescription, GetUserToken())
      return axiosInstance.put('webportal/CourseLesson/UpdateCourseLesson', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }
  const saveBasicDataSubmit = async () => {
    setShowLoading(true)
    setOpenError(false)
    return save().then(function (response: any) {
      if (id === '') {
        history.push('/courselesson/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + GetUrlParam('materialId'))
      }
      setShowLoading(false)

      return true
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('COURSE_LESSON_TITLE') + ' - ' + courseLessonName} showBackButton={true} backButtonUrl={'/coursematerialedit?id=' + GetUrlParam('materialId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=coursematerial'} organizationId={GetUrlParam('organizationId')} showChangeCulture={true} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('COURSE_LESSON_TAB_BASIC_INFORMATION')} {...a11yProps(0)} onClick={onClickBase} />
              {(courseType === 'COURSE_ITEM' || id === '') &&
                <Tab label={t('COURSE_LESSON_TAB_LESSON_ITEMS')} {...a11yProps(1)} onClick={clickCourseLessonItem} />
              }

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
                    label={t('COURSE_LESSON_NAME')}
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
                    label={t('COURSE_ĹESSON_DESCRIPTION')}
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
              </Grid>
              <SaveButtons onSave={saveBasicData} backUrl={'/coursematerialedit/?id=' + GetUrlParam('materialId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=coursematerial'} />

            </ValidatorForm>
          </TabPanel>

          {courseType === 'COURSE_ITEM' &&
            <TabPanel value={valueTab} index={1}>
              <CustomDragAndDropPanel data={courseLessonItems} showAddButton={true} addLinkText={t('COURSE_ADD_LESSON_ITEM')}
                addLinkUri={'/courselessonitem/edit?courseLessonId=' + id + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + GetUrlParam('materialId')}
                onMove={moveItem}
                showEdit={true} editLinkUri={'/courselessonitem/edit'}
                showDelete={true}
                deleteUrl={'webportal/CourseLessonItem/DeleteCourseLessonItem'}
                deleteDialogTitle={t('COURSE_MATERIAL_DELETE_TITLE')}
                deleteDialogContent={t('COURSE_MATERIAL_DELETE_CONTENT')}
                deleteParamIdName={'courseLessonItemId'}
                replaceContent={'name'}
                deleteButtonText={t('COURSE_TERM_DELETE')}
                editLinkText={t('COURSE_TERM_EDIT')}
                onReload={loadCourseLessonItem}
              />

            </TabPanel>}

        </Paper>}

    </Container>
  )
}
