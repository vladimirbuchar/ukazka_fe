import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import { Container, AppBar, Tabs, Tab, Paper, Button } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import a11yProps from '../../component/A11yProps/A11yProps'
import TabPanel from '../../component/TabPanel/TabPanel'
import { ValidatorForm } from 'react-material-ui-form-validator'
import CustomTable from '../../component/CustomTable/CustomTable'
import PageName from '../../component/PageName/PageName'
import CodeBook from '../../component/CodeBook/CodeBook'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import { Price } from '../../WebModel/Shared/Price'
import { AddCourse } from '../../WebModel/Course/AddCourse'
import { UpdateCourse } from '../../WebModel/Course/UpdateCourse'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import { Link as ReactLink, useHistory } from 'react-router-dom'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { GetCodeBookDefaultValue } from '../../core/GetCodeBookDefaultValue'
import CoursePrice from '../../component/CoursePrice/CoursePrice'
import CourseStudentCount from '../../component/CourseStudentCount/CourseStudentCount'
import _ from 'lodash'
import Link from '@material-ui/core/Link'
import CustomSelect from '../../component/CustomSelect/CustomSelect'
import SelectItem from '../../WebModel/Shared/SelectItem'

export default function CourseEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [courseName, setCourseName] = React.useState('')
  const [courseDescription, setCourseDescription] = React.useState('')
  const [isPrivateCourse, setIsPrivateCourse] = React.useState(false)
  const [coursePrice, setCoursePrice] = useState(0)
  const [courseSale, setCourseSale] = useState(0)
  const [defaultMinimumStudents, setDefaultMinimumStudents] = useState(0)
  const [defaultMaximumStudents, setDefaultMaximumStudents] = useState(0)
  const [courseType, setCourseType] = useState('')
  const [courseStatus, setCourseStatus] = useState('')
  const [courseTerm, setCourseTerm] = useState([])
  const goToTab = GetUrlParam('gototab')
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [branchList, setBranchList] = useState([])
  const [classRoomList, setClassRoomList] = useState([])
  const [certificateList, setCertificateList] = useState([])
  const [materialList, setMaterialList] = useState([])
  const [materialId, setMaterialId] = useState('')
  const [certificateId, setCertificateId] = useState('')
  const [automaticGenerateCertificate, setAutomaticGenerateCertificate] = React.useState(false)
  const [sendCertificateEmail, setSendCertificateEmail] = React.useState(false)
  const [courseWithLector, setCourseWithLector] = React.useState(false)
  const [courseTypeList, setCourseTypeList] = React.useState([])
  const [isOnlineCourse, setIsOnlineCourse] = React.useState(false)

  const [sendMessage, setSendMessage] = React.useState([])
  const [mailTemplate, setMailTemplate] = React.useState('')
  const history = useHistory()
  const openImportDialog = () => {
    setOpenDialog(true)
  }

  const materialButtons = [] as any

  materialButtons.push(<Button color="primary" variant="outlined" onClick={openImportDialog}>{t('COURSE_MATERIAL_POWERPOINT_IMPORT')}</Button>)
  materialButtons.push(<Button color="primary" variant="outlined" component={ReactLink} to={'/coursetest/edit?organizationId=' + GetUrlParam('organizationId') + '&courseId=' + id}>{t('COURSE_ADD_TEST')}</Button>)

  const clickBaseInformation = () => {
    history.push('/course/edit?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId'))
  }

  const clickTabTerm = () => {
    history.push('/course/edit?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=courseterm')
    getAllTermInCourse()
  }

  const getAllTermInCourse = () => {
    setShowLoading(true)
    axiosInstance.get('webportal/CourseTerm/GetAllTermInCourse', {
      params: {
        accessToken: GetUserToken(),
        courseId: GetUrlParam('id')
      }
    }).then(function (response) {
      response?.data?.data.forEach(function (item: any) {
        item.name = item.name.replace('CORSE_TERM_MONDAY', t('CORSE_TERM_MONDAY'))
        item.name = item.name.replace('CORSE_TERM_TUESDAY', t('CORSE_TERM_TUESDAY'))
        item.name = item.name.replace('CORSE_TERM_WEDNESDAY', t('CORSE_TERM_WEDNESDAY'))
        item.name = item.name.replace('CORSE_TERM_THURSDAY', t('CORSE_TERM_THURSDAY'))
        item.name = item.name.replace('COURSE_TERM_FRIDAY', t('COURSE_TERM_FRIDAY'))
        item.name = item.name.replace('COURSE_TERM_SATURDAY', t('COURSE_TERM_SATURDAY'))
        item.name = item.name.replace('COURSE_TERM_SUNDAY', t('COURSE_TERM_SUNDAY'))
      })
      setCourseTerm(response?.data?.data.map(function (item: any) {
        if (item.branch === 'ONLINE_BRANCH') {
          item.branch = t('ONLINE_STUDY')
        }
        if (item.classRoom === 'ONLINE_CLASSROOM') {
          item.classRoom = t('ONLINE_STUDY')
        }
        return item
      }))
      setShowLoading(false)
    })
  }

  const handleChangeCourseName = (event: any) => {
    setCourseName(event.target.value)
  }

  const handleChangeCourseDescription = (event: any) => {
    setCourseDescription(event.target.value)
  }
  const handleChangeIsPrivateCourse = (event: any) => {
    setIsPrivateCourse(event.target.checked)
  }

  const handleChangeCourseWithLector = (event: any) => {
    setCourseWithLector(event.target.checked)
  }
  const handleChangeSendCertificateEmail = (event: any) => {
    setSendCertificateEmail(event.target.checked)
    setMailTemplate('')
  }
  const handleChangeAutomaticGenerateCertificate = (event: any) => {
    setAutomaticGenerateCertificate(event.target.checked)
    setCertificateId('')
    setMailTemplate('')
    setSendCertificateEmail(false)
  }

  const handleChangeCoursePrice = (event: any) => {
    setCoursePrice(event.target.value)
  }

  const handleChangeCourseSale = (e: any) => {
    setCourseSale(e.target.value)
  }

  const handleChangeDefaultMinimumStudents = (e: any) => {
    setDefaultMinimumStudents(e.target.value)
  }
  const handleChangeDefaultMaximumStudents = (e: any) => {
    setDefaultMaximumStudents(e.target.value)
  }
  const handleChangeCourseType = (e: any) => {
    setCourseType(e.target.value)
  }
  const handleChangeCourseStatus = (e: any) => {
    setCourseStatus(e.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    if (valueTab === 0) {
      save().then(function (response: any) {
        if (id === '') {
          history.push('/course/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
        }
        setShowLoading(false)
        setValueTab(newValue)
      })
        .catch((error: any) => {
          showErorr(error?.response?.data?.errors)
          setValueTab(0)
        })
    } else {
      setValueTab(newValue)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      await axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_coursetype').then(function (response) {
        setCourseTypeList(response?.data?.data)
      })
      axiosInstance.get('webportal/SendMessage/GetSendMessageInOrganizationEmail', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        setSendMessage(response?.data?.data)
      })
      await axiosInstance.get('webportal/Branch/GetAllBranchInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        const tmp = [] as any
        response?.data?.data.forEach(function (item: any) {
          const key = item.id
          const value = item.name
          tmp[key] = value === 'ONLINE_BRANCH' ? t('ONLINE_STUDY') : value
        })
        setBranchList(tmp)
      })

      await axiosInstance.get('webportal/Certificate/GetCertificateInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        setCertificateList(response?.data?.data)
      })
      await axiosInstance.get('webportal/CourseMaterial/GetCourseMaterialInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        setMaterialList(response?.data?.data)
      })

      await axiosInstance.get('webportal/ClassRoom/GetAllClassRoomInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        const tmp = [] as any
        response?.data?.data.forEach(function (item: any) {
          const key = item.id
          const value = item.name
          tmp[key] = value === 'ONLINE_CLASSROOM' ? t('ONLINE_STUDY') : value
        })
        setClassRoomList(tmp)
      })

      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('organizationId') : id, id === '' ? 'organization' : 'course')
      setPermitions(permitions)
      if (goToTab === 'courseterm') {
        setValueTab(1)
        getAllTermInCourse()
      } else {
        setValueTab(0)
      }
      if (id === '') {
        setValueTab(0)
        setCourseType(await GetCodeBookDefaultValue('cb_coursetype', []))
        setCourseStatus(await GetCodeBookDefaultValue('cb_coursestatus', []))
        setMaterialId('')
        setShowLoading(false)
      } else {
        await axiosInstance.get('webportal/Course/GetCourseDetail', {
          params: {
            accessToken: GetUserToken(),
            courseId: id
          }
        }).then(function (response: any) {
          setIsPrivateCourse(response?.data?.data?.isPrivateCourse)
          setCourseSale(response?.data?.data?.coursePrice?.sale)
          setCoursePrice(response?.data?.data?.coursePrice?.price)
          setCourseName(response?.data?.data?.name)
          setCourseDescription(response?.data?.data?.description)
          setCourseStatus(response?.data?.data?.courseStatusId)
          setCourseType(response?.data?.data?.courseTypeId)
          setDefaultMinimumStudents(response?.data?.data?.minimumStudent)
          setDefaultMaximumStudents(response?.data?.data?.maximumStudent)
          setCertificateId(response?.data?.data?.certificateId)
          setAutomaticGenerateCertificate(response?.data?.data?.automaticGenerateCertificate)
          setMaterialId(response?.data?.data?.courseMaterialId)
          setSendCertificateEmail(response?.data?.data?.sendEmail)
          setMailTemplate(response?.data?.data?.sendMessageId)
          setCourseWithLector(response?.data?.data?.courseWithLector)
        })

        setShowLoading(false)
      }
    }
    fetchData()
  }, [])

  const saveBasicDataSubmit = async () => {
    setShowLoading(true)
    setOpenError(false)
    return save().then(function (response: any) {
      if (id === '') {
        history.push('/course/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
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
  const save = () => {
    if (id === '') {
      const price = new Price(coursePrice, courseSale)
      const obj = new AddCourse(isPrivateCourse, GetUserToken(), courseName, courseDescription, GetUrlParam('organizationId'), defaultMaximumStudents, defaultMinimumStudents, '', price, courseStatus, courseType, certificateId, automaticGenerateCertificate, materialId, sendCertificateEmail, mailTemplate, courseWithLector)
      return axiosInstance.post('webportal/Course/AddCourse', obj)
    } else {
      const price = new Price(coursePrice, courseSale)
      const obj = new UpdateCourse(id, isPrivateCourse, GetUserToken(), courseName, courseDescription, defaultMaximumStudents, defaultMinimumStudents, '', price, courseStatus, courseType, certificateId, automaticGenerateCertificate, materialId, sendCertificateEmail, mailTemplate, courseWithLector)
      return axiosInstance.put('webportal/Course/UpdateCourse', obj)
    }
  }

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  const handleSelectedCertificate = (event: any) => {
    setCertificateId(event.target.value)
  }

  const handleChangeMailTemplate = (event: any) => {
    setMailTemplate(event.target.value)
  }
  const handleSelectedMaterialList = (event: any) => {
    setMaterialId(event.target.value)
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('COURSE_TITLE_EDIT') + ' - ' + courseName} showBackButton={true} backButtonUrl={'/organization/course/?id=' + GetUrlParam('organizationId') + '&gototab=course'} organizationId={GetUrlParam('organizationId')} showChangeCulture={true} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
        <AccessForbiden />
      }

      <Paper>
        <AppBar position='static'>
          <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable" >
            {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator) &&
              <Tab label={t('COURSE_TAB_BASIC_INFORMATION')} {...a11yProps(0)} onClick={clickBaseInformation} />
            }
            {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator) &&
              <Tab label={t('COURSE_TAB_TERM')} {...a11yProps(1)} onClick={clickTabTerm} />
            }

          </Tabs>
        </AppBar>
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator) &&
          <TabPanel value={valueTab} index={0}>
            <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
            <ValidatorForm className={classes.form}
              onSubmit={saveBasicDataSubmit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_NAME')}
                    onChange={handleChangeCourseName}

                    name='courseName'
                    value={courseName}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='courseName'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('COURSE_DESCRIPTION')}
                    onChange={handleChangeCourseDescription}
                    name='courseDescription'
                    value={courseDescription}
                    variant='outlined'
                    fullWidth
                    id='courseDescription'
                    rows={5}
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomCheckBox
                    checked={isPrivateCourse}
                    onChange={handleChangeIsPrivateCourse}
                    name='isPrivateCourse'
                    label={t('COURSE_IS_PRIVATE_COURSE')} />

                </Grid>

                <Grid item xs={12}>
                  <CourseStudentCount minimum={defaultMinimumStudents} onChangeMinimum={handleChangeDefaultMinimumStudents} maximum={defaultMaximumStudents} onChangeMaximum={handleChangeDefaultMaximumStudents} />
                </Grid>

                <Grid item xs={12}>
                  <CoursePrice price={coursePrice} onChangePrice={handleChangeCoursePrice} sale={courseSale} onChangeSale={handleChangeCourseSale} />
                </Grid>
                <Grid item xs={12}>
                  <CodeBook codeBookIdentificator='cb_coursetype' label={t('COURSE_TYPE')} id='courseType' value={courseType} onChange={handleChangeCourseType} autoTranslate={true} />
                </Grid>
                <Grid item xs={12}>
                  <CustomCheckBox
                    checked={courseWithLector}
                    onChange={handleChangeCourseWithLector}
                    name='courseWithLector'
                    label={t('COURSE_WITH_LECTOR')} />
                </Grid>
                <Grid item xs={12}>
                  <CodeBook codeBookIdentificator='cb_coursestatus' label={t('COURSE_STATUS')} id='courseStatus' value={courseStatus} onChange={handleChangeCourseStatus} autoTranslate={true} />
                </Grid>
                <Grid item xs={12}>
                  <CustomSelect label={t('COURSE_TAB_MATERIAL')} data={materialList.map(function (e: any) {
                    return new SelectItem(e.id, e.name)
                  })} selectValue={materialId} onChangeValue={handleSelectedMaterialList} id="materialList" />
                </Grid>
                <Grid item xs={12}>
                  <CustomCheckBox
                    checked={automaticGenerateCertificate}
                    onChange={handleChangeAutomaticGenerateCertificate}
                    name='automaticGenerateCertificate'
                    label={t('COURSE_CERTIFICATE')} />

                </Grid>
                {automaticGenerateCertificate === true &&
                  <Grid item xs={12}>
                    <CustomSelect label ={t('COURSE_CERTIFICATE_PDF_TEMPLATE')}data={certificateList.map(function (e: any) {
                      return new SelectItem(e.id, e.name)
                    })} selectValue={certificateId} onChangeValue={handleSelectedCertificate} id="certificateList" multiple={false} />
                  </Grid>}
                {automaticGenerateCertificate === true &&
                  <Grid item xs={12}>
                    <CustomCheckBox
                      checked={sendCertificateEmail}
                      onChange={handleChangeSendCertificateEmail}
                      name='sendCertificateEmail'
                      label={t('COURSE_CERTIFICATE_SEND_EMAIL')} />

                  </Grid>}
                {automaticGenerateCertificate === true && sendCertificateEmail === true &&
                <Grid item xs={12}>
                  <CustomSelect label={t('COURSE_CERTIFICATE_SEND_EMAIL_MAIL')} data={sendMessage.map((e: any) => {
                    return new SelectItem(e.id, e.name)
                  })} selectValue={mailTemplate} onChangeValue={handleChangeMailTemplate} id="bankofQUestion" multiple={false} />
                </Grid>}

              </Grid>
              <SaveButtons onSave={saveBasicData} backUrl={'/organization/course/?id=' + GetUrlParam('organizationId') + '&gototab=course'} />

            </ValidatorForm>
          </TabPanel>
        }
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator) &&
          <TabPanel value={valueTab} index={1}>
            <CustomTable addLinkUri={'/courseterm/edit?courseId=' + id + '&organizationId=' + GetUrlParam('organizationId')} addLinkText={t('COURSE_TERM_BUTTON_ADD')}
              columns={
                [{
                  title: t('CORSE_TERM_FROM') + ' - ' + t('CORSE_TERM_TO'),
                  field: 'name',
                  render: (rowData: any) => <Link component={ReactLink} to={'/courseterm/edit' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('organizationId') + '&courseId=' + GetUrlParam('id')} variant="body2">
                    {rowData.name}
                  </Link>
                },
                { title: t('CORSE_TERM_BRANCH'), field: 'branchId', lookup: branchList },
                { title: t('CORSE_TERM_CLASSROOM'), field: 'classRoomId', lookup: classRoomList },
                { title: t('COURSE_TERM_STUDENT_ISACTIVE'), field: 'isActive', type: 'boolean' }
                ]
              }
              showAddButton={true}
              showEdit={true}
              showDelete={true}
              data={courseTerm}
              editParams={'organizationId=' + GetUrlParam('organizationId') + '&courseId=' + id}
              editLinkUri={'/courseterm/edit'}
              editLinkText={t('COURSE_TERM_EDIT')}
              deleteUrl={'webportal/CourseTerm/DeleteCourseTerm'}
              deleteDialogTitle={t('COURSE_TERM_DELETE_TITLE')}
              deleteDialogContent={t('COURSE_TERM_DELETE_CONTENT')}
              deleteParamIdName={'courseTermId'}
              replaceContent={'name'}
              deleteButtonText={t('COURSE_TERM_DELETE')}
              onReload={getAllTermInCourse}
              customActionButtons={
                [{ title: '', field: 'gotostudent', tabName: 'students', actionText: t('COURSE_TERM_STUDENT_SHOW'), show: true }]
              }
              linkColumnName="name"

            />
          </TabPanel>
        }

      </Paper>

    </Container>
  )
}
