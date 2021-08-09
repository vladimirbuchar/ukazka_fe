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
import PropTypes from 'prop-types'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import { AddCourseLessonItem } from '../../WebModel/CourseLessonItem/AddCourseLessonItem'
import { UpdateCourseLessonItem } from '../../WebModel/CourseLessonItem/UpdateCourseLessonItem'
import CodeBook from '../../component/CodeBook/CodeBook'
import { CodeBookItem } from './../../WebModel/Shared/CodeBookItem'
import _ from 'lodash'
import CustomHtmlEditor from '../../component/CustomHtmlEditor/CustomHtmlEditor'
import FileUpload from '../../component/FileUpload/FileUpload'
import FileUploader from '../../core/FileUploader'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { GetCodeBookDefaultValue } from '../../core/GetCodeBookDefaultValue'
import { useHistory } from 'react-router'

export default function CourseLessonItemEdit (props: any) {
  const { cbCourseLessonItemType } = props
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [courseLessonItemName, setCourseLessonItemName] = React.useState('')
  const [courseLessonItemDescription, setCourseLessonItemDescription] = React.useState('')
  const [courseLessonItemTemplate, setCourseLessonItemTemplate] = React.useState('')
  const [templateIdentificator, setTemplateIdentificator] = React.useState('')
  const [htmlBasicTemplate, setHtmlBasicTemplate] = React.useState('')
  const [files, setFiles] = React.useState([])
  const [fileName, setFileName] = React.useState('')
  const [fileId, setFileId] = React.useState('')
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [courseLessonYoutube, setCourseLessonYoutube] = React.useState('')
  const history = useHistory()
  const [changeFile, setChangeFile] = React.useState(false)

  const handleChangeHtmlBasicTemplate = (content: any) => {
    setHtmlBasicTemplate(content)
  }
  const onUpload = (files: any) => {
    setChangeFile(false)
    setFiles(files)
  }

  const onChangeCourseLessonItemTemplate = (e: any) => {
    setHtmlBasicTemplate('')
    setCourseLessonYoutube('')
    setFileId('')
    setFileName('')
    setFiles([])
    setChangeFile(true)
    const item = cbCourseLessonItemType.find((x: CodeBookItem) => x.id === e.target.value)
    setTemplateIdentificator(_.get(item, 'systemIdentificator', ''))
    setCourseLessonItemTemplate(e.target.value)
  }
  const handleChangeCourseLessonYoutube = (event: any) => {
    setCourseLessonYoutube(event.target.value)
  }

  const handleChangeCourseLessonItemName = (event: any) => {
    setCourseLessonItemName(event.target.value)
  }

  const handleChangeCourseLessonItemDescription = (event: any) => {
    setCourseLessonItemDescription(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('courseLessonId') : id, id === '' ? 'courseLesson' : 'courseLessonItem')
      setPermitions(permitions)
      if (id === '') {
        setValueTab(0)
        setShowLoading(false)
        setCourseLessonItemTemplate(await GetCodeBookDefaultValue('cb_courselessonitemtemplate', []))
      } else {
        await axiosInstance.get('webportal/CourseLessonItem/GetCourseLessonItemDetail', {
          params: {
            accessToken: GetUserToken(),
            courseLessonItemId: id
          }
        }).then(function (response: any) {
          setCourseLessonItemName(response?.data?.data?.name)
          setCourseLessonItemDescription(response?.data?.data?.description)
          setCourseLessonItemTemplate(response?.data?.data?.courseLessonItemTemplateId)
          setHtmlBasicTemplate(response?.data?.data?.html)
          setTemplateIdentificator(response?.data?.data?.templateIdentificator)
          setFileName(response?.data?.data?.originalFileName)
          setFileId(response?.data?.data?.fileId)
          setCourseLessonYoutube(response?.data?.data?.youtube)
          setShowLoading(false)
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
    if (!validate()) return
    return save().then(function (response: any) {
      if (files.length > 0) {
        FileUploader(files, id === '' ? response.data.data : id, 'courseLessonItem')
      }
      if (id === '') {
        history.push('/courselessonitem/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + GetUrlParam('materialId') + '&courseLessonId=' + GetUrlParam('courseLessonId'))
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
    if (!validate()) return
    return save().then(function (response: any) {
      if (files.length > 0) {
        FileUploader(files, id === '' ? response.data.data : id, 'courseLessonItem').then(function () {
          setShowLoading(false)
          history.push('/courselesson/edit?id=' + GetUrlParam('courseLessonId') + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + GetUrlParam('materialId') + '&gototab=courselessonitems')
          return true
        })
      } else {
        setShowLoading(false)
        history.push('/courselesson/edit?id=' + GetUrlParam('courseLessonId') + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + GetUrlParam('materialId') + '&gototab=courselessonitems')
        return true
      }
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }
  const save = () => {
    if (id === '') {
      const obj = new AddCourseLessonItem(courseLessonItemName, courseLessonItemDescription, GetUrlParam('courseLessonId'), GetUserToken(), courseLessonItemTemplate, htmlBasicTemplate, courseLessonYoutube)
      return axiosInstance.post('webportal/CourseLessonItem/AddCourseLessonItem', obj)
    } else {
      const obj = new UpdateCourseLessonItem(id, courseLessonItemName, courseLessonItemDescription, GetUserToken(), courseLessonItemTemplate, htmlBasicTemplate, courseLessonYoutube)
      return axiosInstance.put('webportal/CourseLessonItem/UpdateCourseLessonItem', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  const validate = () => {
    if ((templateIdentificator === 'BASIC_TEMPLATE_IMAGE' || templateIdentificator === 'VIDEO' || templateIdentificator === 'AUDIO') && (files.length === 0 && fileId === '')) {
      const message = [] as any
      message.push('EROR_FILE_IS_NOT_SELECT')
      setErrorMessage(message)
      setOpenError(true)
      setShowLoading(false)
      return false
    }
    if (templateIdentificator === 'YOUTUBE' && courseLessonYoutube === '') {
      const message = [] as any
      message.push('EROR_YOUTUBE_VIDEO')
      setErrorMessage(message)
      setOpenError(true)
      setShowLoading(false)
      return false
    }

    return true
  }
  const materialButtons = [] as any
  // materialButtons.push(<Button fullWidth={true} onClick={openPreview} className={`${classes.buttonSbmitPadding} ${classes.saveButtons}`} variant="contained" color="primary">{t("COURSE_LESSON_ITEM_PREVIEW")}</Button>)

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('COURSE_LESSON_ITEM_TITLE') + ' - ' + courseLessonItemName} showBackButton={true} backButtonUrl={'/courselesson/edit?id=' + GetUrlParam('courseLessonId') + '&organizationId=' + GetUrlParam('organizationId') + '&materialId=' + GetUrlParam('materialId') + '&gototab=courselessonitems'} organizationId={GetUrlParam('organizationId')} showChangeCulture={true} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('COURSE_LESSON_ITEM_TAB_BASIC_INFORMATION')} {...a11yProps(0)} />
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
                    label={t('COURSE_LESSON_ITEM_NAME')}
                    onChange={handleChangeCourseLessonItemName}
                    name='courseLessonItemName'
                    value={courseLessonItemName}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='courseLessonItemName'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_LESSON_ITEM_DESCRIPTION')}
                    onChange={handleChangeCourseLessonItemDescription}
                    name='courseLessonItemDescription'
                    value={courseLessonItemDescription}
                    variant='outlined'
                    fullWidth
                    id='courseLessonItemDescription'
                    rows={5}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CodeBook codeBookIdentificator="cb_courselessonitemtemplate" label={t('COURSE_LESSON_ITEM_TEMPLATE')} id="courseLessonItemTemplate" value={courseLessonItemTemplate} onChange={onChangeCourseLessonItemTemplate} autoTranslate={true} data={cbCourseLessonItemType} readonly={templateIdentificator === 'POWER_POINT'} removeItems={templateIdentificator === 'POWER_POINT' ? [] : ['POWER_POINT']} />
                </Grid>
                <Grid item xs={12}>
                  {(templateIdentificator === 'BASIC_TEMPLATE' || templateIdentificator === 'POWER_POINT') &&
                    <CustomHtmlEditor content={htmlBasicTemplate} onChangeContent={handleChangeHtmlBasicTemplate} />}

                </Grid>
                {(templateIdentificator === 'BASIC_TEMPLATE_IMAGE') &&
                  <FileUpload onUpload={onUpload} fileName={fileName} fileId={fileId} parentId={id} operation="courseLessonItem" changeFile={changeFile}
                    accept={
                      'image/*'
                    }
                  />
                }
                {(templateIdentificator === 'VIDEO') &&
                  <FileUpload onUpload={onUpload} fileName={fileName} fileId={fileId} parentId={id} operation="courseLessonItem" changeFile={changeFile}
                    accept={
                      'video/mp4,video/ogg'
                    }
                  />
                }
                {(templateIdentificator === 'AUDIO') &&
                  <FileUpload onUpload={onUpload} fileName={fileName} fileId={fileId} parentId={id} operation="courseLessonItem" changeFile={changeFile}
                    accept={
                      'audio/*'
                    }
                  />
                }
                {(templateIdentificator === 'YOUTUBE') &&
                  <Grid item xs={12}>
                    <CustomTextValidator
                      label={t('COURSE_LESSON_ITEM_YOUTUBE')}
                      onChange={handleChangeCourseLessonYoutube}
                      name='courseLessonYoutube'
                      value={courseLessonYoutube}
                      variant='outlined'
                      fullWidth
                      validators={['required']}
                      errorMessages={[t('VALIDATION_REQUIRED')]}
                      id='courseLessonYoutube'
                    />
                  </Grid>
                }
              </Grid>

              <SaveButtons onSave={saveBasicData} otherButtons={materialButtons} />

            </ValidatorForm>
          </TabPanel>

        </Paper>}

    </Container>
  )
}
CourseLessonItemEdit.prototype = {
  cbCourseLessonItemType: PropTypes.array
}
