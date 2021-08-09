import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import { Container, AppBar, Tabs, Tab, Paper, Button } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import a11yProps from '../../component/A11yProps/A11yProps'
import TabPanel from '../../component/TabPanel/TabPanel'
import { ValidatorForm } from 'react-material-ui-form-validator'
import PageName from '../../component/PageName/PageName'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { useHistory } from 'react-router'
import { UpdateStudentGroup } from '../../WebModel/StudentGroup/UpdateStudentGroup'
import { AddStudentGroup } from '../../WebModel/StudentGroup/AddStudentGroup'
import CustomDragAndDropPanel from '../../component/CustomDragAndDropPanel/CustomDragAndDropPanel'
import ImportLessonDialog from '../../component/ImportLessonDialog/ImportLessonDialog'
import { Link as ReactLink } from 'react-router-dom'
import FileUpload from '../../component/FileUpload/FileUpload'
import FileUploader from '../../core/FileUploader'
import CustomTable from '../../component/CustomTable/CustomTable'
import Link from '@material-ui/core/Link'

export default function CourseMaterialEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [courseMaterialName, setCourseMaterialName] = React.useState('')

  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [courseMaterial, setCourseMaterial] = React.useState([])
  const history = useHistory()
  const [openDialog, setOpenDialog] = React.useState(false)
  const gototab = GetUrlParam('gototab')
  const [changeFile, setChangeFile] = React.useState(false)
  const [files, setFiles] = React.useState([])
  const [attachFiles, setAttachFiles] = React.useState([])
  const openImportDialog = () => {
    setOpenDialog(true)
  }
  const loadFiles = () => {
    axiosInstance.get('webportal/CourseMaterial/GetFiles', {
      params: {
        accessToken: GetUserToken(),
        courseMaterialId: id
      }
    }).then(function (response: any) {
      setAttachFiles(response?.data?.data)
      setShowLoading(false)
    })
  }

  const onUpload = (files: any) => {
    setChangeFile(false)
    setFiles(files)
    setShowLoading(true)
    if (files.length > 0) {
      FileUploader(files, id, 'courseMaterial').then(function () {
        loadFiles()
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }

  const materialButtons = [] as any

  materialButtons.push(<Button color="primary" variant="outlined" onClick={openImportDialog}>{t('COURSE_MATERIAL_POWERPOINT_IMPORT')}</Button>)
  materialButtons.push(<Button color="primary" variant="outlined" component={ReactLink} to={'/coursetest/edit?organizationId=' + GetUrlParam('organizationId') + '&materialId=' + id}>{t('COURSE_ADD_TEST')}</Button>)

  const onCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleChangeCourseMaterialName = (event: any) => {
    setCourseMaterialName(event.target.value)
  }

  const getAllCourseLesson = () => {
    setShowLoading(true)
    axiosInstance.get('webportal/CourseLesson/GetAllLessonInCourse', {
      params: {
        accessToken: GetUserToken(),
        materialId: GetUrlParam('id')
      }
    }).then(function (response: any) {
      setCourseMaterial(response?.data?.data)
      setShowLoading(false)
    })
  }

  const handleChangeTab = (event: any, newValue: any) => {
    if (valueTab === 0) {
      return save().then(function (response: any) {
        if (id === '') {
          history.push('/coursematerialedit/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
          id = response.data.data
        }
        setShowLoading(false)
        if (newValue === 1) {
          getAllCourseLesson()
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
  const clickTabMateriial = () => {
    history.push('/coursematerialedit/?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=coursematerial')
    getAllCourseLesson()
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('organizationId') : id, id === '' ? 'organization' : 'coursematerialedit')
      setPermitions(permitions)
      if (id === '') {
        setValueTab(0)
        setShowLoading(false)
      } else {
        await axiosInstance.get('webportal/CourseMaterial/GetCourseMaterialDetail', {
          params: {
            accessToken: GetUserToken(),
            courseMaterialId: id
          }
        }).then(function (response: any) {
          setCourseMaterialName(response?.data?.data?.name)
          setShowLoading(false)
        })
        loadFiles()
        if (gototab === 'coursematerial') {
          setValueTab(1)
          getAllCourseLesson()
        }
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
        history.push('/coursematerialedit/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
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
      const obj = new AddStudentGroup(GetUrlParam('organizationId'), GetUserToken(), courseMaterialName)
      return axiosInstance.post('webportal/CourseMaterial/AddCourseMaterial', obj)
    } else {
      const obj = new UpdateStudentGroup(id, GetUserToken(), courseMaterialName)
      return axiosInstance.put('webportal/CourseMaterial/UpdateCourseMaterial', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }
  const moveItem = (result: any) => {
    const ids = result.map(function (item: any) {
      return item.id
    })

    axiosInstance.put('webportal/CourseLesson/UpdatePositionCourseLesson', {
      ids: ids,
      userAccessToken: GetUserToken()
    })
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('COURSE_MATERIAL_TITLE') + ' - ' + courseMaterialName} showBackButton={true} backButtonUrl={'/organization/edit?id=' + GetUrlParam('organizationId') + '&gototab=coursematerial'} organizationId={GetUrlParam('organizationId')} showChangeCulture={true} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('COURSE_MATERIAL_BASIC_INFORMATION')} {...a11yProps(0)} />
              {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
                <Tab label={t('COURSE_TAB_MATERIAL_LESSON')} {...a11yProps(1)} onClick={clickTabMateriial} />
              }
              {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
                <Tab label={t('COURSE_TAB_MATERIAL_LESSON_FILES')} {...a11yProps(2)} onClick={clickTabMateriial} />
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
                    label={t('COURSE_MATERIAL_NAME')}
                    onChange={handleChangeCourseMaterialName}
                    name='certificateName'
                    value={courseMaterialName}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='courseMaterialName'
                  />
                </Grid>

              </Grid>

              <SaveButtons onSave={saveBasicData} backUrl={'/organization/edit?id=' + GetUrlParam('organizationId') + '&gototab=coursematerial'} />

            </ValidatorForm>
          </TabPanel>

        </Paper>}
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
        <TabPanel value={valueTab} index={1}>
          <CustomDragAndDropPanel data={courseMaterial.map(function (item: any) {
            return {
              id: item.id,
              name: item.type === 'COURSE_ITEM_POWER_POINT' ? item.name + ' (' + t('LESSON_FROM_POWERPOINT') + ')' : item.name,
              description: item.description,
              customEditLink: item.type === 'COURSE_TEST' ? '/coursetest/edit?organizationId=' + GetUrlParam('organizationId') + '&id=' + item.id + '&materialId=' + id : '/courselesson/edit?id=' + item.id + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + id,
              customActionButtons: item.type === 'COURSE_TEST' || item.type === 'COURSE_ITEM_POWER_POINT' ? [] : [{ fullWitdh: true, tabName: 'courselessonitems', actionText: t('COURSE_MATERIAL_ITEM_SHOW') }]
            }
          })} showAddButton={true} addLinkText={t('COURSE_ADD_LESSON')} addLinkUri={'/courselesson/edit?materialId=' + id + '&organizationId=' + GetUrlParam('organizationId')}
          onMove={moveItem} showEdit={true} editLinkUri={'/courselesson/edit'} showDelete={true}
          deleteUrl={'webportal/CourseLesson/DeleteCourseLesson'}
          deleteDialogTitle={t('COURSE_MATERIAL_DELETE_TITLE')}
          deleteDialogContent={t('COURSE_MATERIAL_DELETE_CONTENT')}
          deleteParamIdName={'courseLessonId'}
          replaceContent={'name'}
          deleteButtonText={t('COURSE_TERM_DELETE')}
          onReload={getAllCourseLesson}
          editLinkText={t('COURSE_EDIT_LESSON')}
          customAddButtons={materialButtons}

          />
          <ImportLessonDialog openDialog={openDialog} onCloseDialog={onCloseDialog} objectOwner={GetUrlParam('id')} onReload={getAllCourseLesson} accept={'.pptx,.ppt'} />

        </TabPanel>

      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && <TabPanel value={valueTab} index={2}>
        <FileUpload onUpload={onUpload} parentId={id} operation="courseLessonItem" changeFile={changeFile} multiple={true} />
        <CustomTable columns={
          [
            {
              title: t('COURSE_MATERIAL_FILE_NAME'),
              field: 'originalFileName',
              render: (rowData:any) => <Link href={rowData.url} target="blank" variant="body2">
                {rowData.originalFileName}
              </Link>
            }

          ]
        }
        showAddButton={false}
        showEdit={false}
        showDelete={true}
        data={attachFiles}
        deleteUrl={'webportal/FileUpload/FileDelete'}
        deleteDialogTitle={t('BANK_OF_QUESTION_QUESTION_DELETE_TITLE')}
        deleteDialogContent={t('BANK_OF_QUESTION_QUESTION_DELETE_CONTENT')}
        deleteParamIdName={'objectId'}
        onReload={loadFiles}
        replaceContent={'question'}
        deleteButtonText={t('BANK_OF_QUESTION_QUESTION_DELETE')}
        deleteParams={'parentId=' + id + '&operation=courseMaterial'}

        />

      </TabPanel>
      }

    </Container>
  )
}
