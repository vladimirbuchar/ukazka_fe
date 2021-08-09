import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import { Container, AppBar, Tabs, Tab, Paper } from '@material-ui/core'
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
import CoursePrice from '../../component/CoursePrice/CoursePrice'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import CourseStudentCount from '../../component/CourseStudentCount/CourseStudentCount'
import CustomDatePicker from '../../component/CustomDatePicker/CustomDatePicker'
import CustomSelect from '../../component/CustomSelect/CustomSelect'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import { AddCourseTerm } from '../../WebModel/CourseTerm/AddCourseTerm'
import { UpdateCopurseTerm } from '../../WebModel/CourseTerm/UpdateCopurseTerm'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import SelectItem from '../../WebModel/Shared/SelectItem'
import Loading from '../../component/Loading/Loading'
import { GetCodeBookDefaultValue } from '../../core/GetCodeBookDefaultValue'
import { useHistory } from 'react-router'
import { getLanguage } from '../../i18n'
import { AddStudentToCourseTerm } from '../../WebModel/CourseTermStudent/AddStudentToCourseTerm'
import { CourseTermMenu } from '../../component/CourseTerm/CourseTermMenu'
import AddBox from '@material-ui/icons/AddBox'
import { CourseTermTimeTable } from '../../component/CourseTerm/CourseTermTimeTable'

export default function CourseTermEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [coursePrice, setCoursePrice] = useState(0)
  const [courseWithLector, setCourseWithLector] = useState(0)
  const [courseSale, setCourseSale] = useState(0)
  const [defaultMinimumStudents, setDefaultMinimumStudents] = useState(0)
  const [defaultMaximumStudents, setDefaultMaximumStudents] = useState(0)
  const [registrationFrom, setRegistrationFrom] = useState(new Date())
  const [registrationTo, setRegistrationTo] = useState(new Date())
  const [courseTermFrom, setCourseTermFrom] = useState(new Date())
  const [courseTermTo, setCourseTermTo] = useState(new Date())
  const [branch, setBranch] = useState('')
  const [branchList, setBranchList] = useState([])
  const [classRoom, setClassRoom] = useState('')
  const [classRoomList, setClassRoomList] = useState([])
  const [courseTimeFrom, setCourseTimeFrom] = useState('')
  const [courseTimeTo, setCourseTimeTo] = useState('')
  const [monday, setMonday] = useState(false)
  const [tuesday, setTuesday] = useState(false)
  const [wednesday, setWednesday] = useState(false)
  const [thursday, setThursday] = useState(false)
  const [friday, setFriday] = useState(false)
  const [saturday, setSaturday] = useState(false)
  const [sunday, setSunday] = useState(false)
  const [lectorList, setLectorList] = useState([])
  const [studentGroupList, setStudentGroupList] = useState([])
  const [lectors, setLectors] = useState([] as any)
  const [studentList, setStudentList] = useState([] as any)
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [courseType, setCourseType] = React.useState('')
  const [errorBranch, setErrorBranch] = React.useState(false)
  const [errorClassRoom, setErrorClassRoom] = React.useState(false)
  const history = useHistory()
  const [studentGroup, setStudentGroup] = React.useState([] as any)
  const [anchorElActionMenu, setAnchorElActionMenu] = React.useState(null)
  const [schoolTimeTableList, setSchoolTimeTableList] = useState([])
  const [schoolTimeTable, setSchoolTimeTable] = useState('')
  const openActionMenu = Boolean(anchorElActionMenu)
  const [timeTableList, setTimeTableList] = useState([] as any)
  const handleChangeSchoolTimeTable = (event: any) => {
    setSchoolTimeTable(event.target.value)
  }
  const handleChangeLector = (event: any) => {
    setLectors(event.target.value as never[])
  }

  const handleChangeStudentGroup = (event: any) => {
    setStudentGroup(event.target.value as never[])
  }

  const handleChangeMonday = (event: any) => {
    setMonday(event.target.checked)
  }
  const handleChangeTuesday = (event: any) => {
    setTuesday(event.target.checked)
  }
  const handleChangeWednesday = (event: any) => {
    setWednesday(event.target.checked)
  }
  const handleChangeThursday = (event: any) => {
    setThursday(event.target.checked)
  }
  const handleChangeFriday = (event: any) => {
    setFriday(event.target.checked)
  }
  const handleChangeSaturday = (event: any) => {
    setSaturday(event.target.checked)
  }
  const handleChangeSunday = (event: any) => {
    setSunday(event.target.checked)
  }

  const handleChangeCourseTimeFrom = (event: any) => {
    setCourseTimeFrom(event.target.value)
  }
  const handleChangeCourseTimeTo = (event: any) => {
    setCourseTimeTo(event.target.value)
  }

  const handleChangeClassRoom = (event: any) => {
    setErrorBranch(false)
    setErrorClassRoom(false)
    setClassRoom(event.target.value)
  }
  const getClassRoomInBranch = (branchId: any) => {
    setShowLoading(true)
    axiosInstance.get('webportal/ClassRoom/GetAllClassRoomInBranch', {
      params: {
        accessToken: GetUserToken(),
        branchId: branchId
      }
    }).then(function (response: any) {
      const classRoom = [] as any
            response?.data?.data?.forEach((element: any) => {
              const obj = new SelectItem(element.id, element.name)
              classRoom.push(obj)
            })
            setClassRoomList(classRoom)
            setShowLoading(false)
    })
  }

  const handleChangeBranch = (event: any) => {
    setBranch(event.target.value)
    getClassRoomInBranch(event.target.value)
    setErrorBranch(false)
    setErrorClassRoom(false)
  }

  const handleCourseTermToChange = (date: Date) => {
    setCourseTermTo(date)
  }
  const handleCourseTermFromChange = (date: Date) => {
    setCourseTermFrom(date)
  }

  const handleRegistrationFromChange = (date: Date) => {
    setRegistrationFrom(date)
  }
  const handleRegistrationToChange = (date: Date) => {
    setRegistrationTo(date)
  }

  const handleChangeCoursePrice = (event: any) => {
    setCoursePrice(event.target.value as number)
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

  const handleChangeTab = (event: any, newValue: any) => {
    if (valueTab === 0) {
      if (!validate()) {
        setShowLoading(false)
        return
      }

      return save().then(function (response: any) {
        if (id === '') {
          history.push('/courseterm/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId') + '&courseId=' + GetUrlParam('courseId'))
        }
        if (newValue === 1) {
          getStudentInCourseTerm()
        } else if (newValue === 2) {
          getTimeTable()
        }
        setValueTab(newValue)
      })
        .catch((error: any) => {
          return showErorr(error?.response?.data?.errors)
        })
    } else {
      if (newValue === 1) {
        getStudentInCourseTerm()
      } else if (newValue === 2) {
        getTimeTable()
      }
      setValueTab(newValue)
    }
  }

  const getStudentInCourseTerm = () => {
    setShowLoading(true)
    axiosInstance.get('webportal/CourseTermStudent/GetAllStudentInCourseTerm', {
      params: {
        accessToken: GetUserToken(),
        courseTermId: GetUrlParam('id')
      }
    }).then(function (response) {
      setStudentList(response?.data?.data)
      setShowLoading(false)
    })
  }
  const getTimeTable = () => {
    setShowLoading(true)
    axiosInstance.get('webportal/CourseTerm/GetTimeTable', {
      params: {
        accessToken: GetUserToken(),
        courseTermId: GetUrlParam('id')
      }
    }).then(function (response) {
      setTimeTableList(response?.data?.data.map(function (item:any) {
        item.dayOfWeek = t(item.dayOfWeek)
        item.classRoom = item.classRoom === 'ONLINE_CLASSROOM' ? t('ONLINE_STUDY') : item.classRoom
        return item
      }))
      setShowLoading(false)
    })
  }
  const getBranch = async () => {
    await axiosInstance.get('webportal/Branch/GetAllBranchInOrganization', {
      params: {
        accessToken: GetUserToken(),
        organizationId: GetUrlParam('organizationId')
      }
    }).then(function (response: any) {
      const branch = [] as any
            response?.data?.data?.forEach((element: any) => {
              const obj = new SelectItem(element.id, element.name)
              branch.push(obj)
            })
            setBranchList(branch)
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('courseId') : id, id === '' ? 'course' : 'courseTerm')
      setPermitions(permitions)
      const gototab = GetUrlParam('gototab')
      if (gototab === 'students') {
        setValueTab(1)
        getStudentInCourseTerm()
      } else setValueTab(0)
      getBranch()

      await axiosInstance.get('webportal/OrganizationUser/GetAllUserInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        const lector = [] as any
                response?.data?.data?.filter((x: any) => x.userRole.includes('LECTOR')).forEach(function (item: any) {
                  lector.push(new SelectItem(item.uioId, item.userEmail))
                })
                setLectorList(lector)
      })

      await axiosInstance.get('webportal/Organization/GetStudyHours', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        const arr = [] as any
                response?.data?.data.forEach(function (item: any) {
                  const data = {
                    activeFrom: item.activeFromId,
                    activeTo: item.activeToId
                  }
                  arr.push(new SelectItem(item.id, item.position + '. ' + item.activeFrom + ' - ' + item.activeTo, data))
                })
                setSchoolTimeTableList(arr)
      })

      await axiosInstance.get('webportal/StudentGroup/GetStudentGroupInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: GetUrlParam('organizationId')
        }
      }).then(function (response: any) {
        const studentGroup = [] as any
                response?.data?.data?.forEach(function (item: any) {
                  studentGroup.push(new SelectItem(item.id, item.name))
                })
                setStudentGroupList(studentGroup)
      })

      await axiosInstance.get('webportal/Course/GetCourseDetail', {
        params: {
          accessToken: GetUserToken(),
          courseId: GetUrlParam('courseId')
        }
      }).then(function (response: any) {
        setCourseType(response?.data?.data?.courseType)
        setCourseWithLector(response?.data?.data?.courseWithLector)
        if (id === '') {
          setCourseSale(response?.data?.data?.coursePrice?.sale)
          setCoursePrice(response?.data?.data?.coursePrice?.price)
          setDefaultMaximumStudents(response?.data?.data?.maximumStudent)
          setDefaultMinimumStudents(response?.data?.data?.minimumStudent)
        }

        // setValueTab(0);
        setShowLoading(false)
      })

      if (id === '') {
        setValueTab(0)

        const defaultTime = await GetCodeBookDefaultValue('cb_timetable', [])
        setCourseTimeFrom(defaultTime)
        setCourseTimeTo(defaultTime)
      } else {
        await axiosInstance.get('webportal/CourseTerm/GetCourseTermDetail', {
          params: {
            accessToken: GetUserToken(),
            courseTermId: id
          }
        }).then(function (response: any) {
          setCourseSale(response?.data?.data?.coursePrice?.sale)
          setCoursePrice(response?.data?.data?.coursePrice?.price)
          setDefaultMaximumStudents(response?.data?.data?.maximumStudent)
          setDefaultMinimumStudents(response?.data?.data?.minimumStudent)
          setCourseTermFrom(response?.data?.data?.activeFrom)
          setCourseTermTo(response?.data?.data?.activeTo)
          setRegistrationFrom(response?.data?.data?.registrationFrom)
          setRegistrationTo(response?.data?.data?.registrationTo)
          setCourseTimeFrom(response?.data?.data?.timeFromId)
          setCourseTimeTo(response?.data?.data?.timeToId)
          setMonday(response?.data?.data?.monday)
          setThursday(response?.data?.data?.thursday)
          setWednesday(response?.data?.data?.wednesday)
          setTuesday(response?.data?.data?.tuesday)
          setFriday(response?.data?.data?.friday)
          setSaturday(response?.data?.data.saturday)
          setSunday(response?.data?.data?.sunday)
          setClassRoom(response?.data?.data?.classRoomId)
          setBranch(response?.data?.data?.branchId)
          setLectors(response?.data?.data?.lector as never[])
          getClassRoomInBranch(response?.data?.data?.branchId)
          setStudentGroup(response?.data?.data?.studentGroup as never[])
          setSchoolTimeTable(response?.data?.data?.organizationStudyHourId)
        })
        getStudentInCourseTerm()
        setShowLoading(false)
      }
    }
    fetchData()
  }, [])
  const validate = () => {
    if (courseType === 'ONLINE') {
      return true
    }

    if (branch === '' || classRoom === '') {
      setShowLoading(false)
      if (branch === '') {
        setErrorBranch(true)
      }
      if (classRoom === '') {
        setErrorClassRoom(true)
      }
      setShowLoading(false)
      return false
    }
    return true
  }
  const saveBasicDataSubmit = async () => {
    setShowLoading(true)
    setOpenError(false)
    if (!validate()) return false

    return save().then(function (response: any) {
      if (id === '') {
        history.push('/courseterm/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId') + '&courseId=' + GetUrlParam('courseId'))
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
    if (!validate()) return false
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
  const save = async () => {
    if (id === '') {
      const price = new Price(coursePrice, courseSale)
      const obj = new AddCourseTerm(GetUrlParam('courseId'), price, courseTermFrom, courseTermTo, registrationFrom, registrationTo, defaultMinimumStudents,
        defaultMaximumStudents, classRoom, monday, tuesday, wednesday, thursday, friday, saturday, sunday, courseTimeFrom, courseTimeTo, GetUserToken(), '', '', lectors, studentGroup, schoolTimeTable)
      return axiosInstance.post('webportal/CourseTerm/AddCourseTerm', obj)
    } else {
      const price = new Price(coursePrice, courseSale)
      const obj = new UpdateCopurseTerm(id, price, courseTermFrom, courseTermTo, registrationFrom, registrationTo, defaultMinimumStudents,
        defaultMaximumStudents, classRoom, monday, tuesday, wednesday, thursday, friday, saturday, sunday, courseTimeFrom, courseTimeTo, GetUserToken(), '', '', lectors, studentGroup, schoolTimeTable)
      return axiosInstance.put('webportal/CourseTerm/UpdateCourseTerm', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  const addAction = (newData: any) => {
    const obj = new AddStudentToCourseTerm(newData.email, GetUrlParam('id'), GetUserToken(), getLanguage(), newData.firstName, newData.lastName)
    axiosInstance.post('webportal/CourseTermStudent/AddStudentToCourseTerm', obj).then(function () {
      getStudentInCourseTerm()
    }).catch((error: any) => {
      showErorr(error?.response?.data?.errors)
    })
  }

  return (
    <Container component="main" maxWidth="xl">
      <Loading showLoading={showLoading} />
      <PageName title={t('COURSE_TERM_TITLE_EDIT')} showBackButton={true} backButtonUrl={'/course/edit?id=' + GetUrlParam('courseId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=courseterm'} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && !showLoading &&
                <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
                <Paper>
                  <AppBar position="static">
                    <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
                      <Tab label={t('COURSE_TERM_TAB_BASIC_INFORMATION')} {...a11yProps(0)} />
                      <Tab label={t('COURSE_TERM_TAB_STUDENTS')} {...a11yProps(1)} />

                      {courseWithLector &&
                      <Tab label={t('COURSE_TERM_TAB_TIME_TABLE')} {...a11yProps(2)} />}
                    </Tabs>
                  </AppBar>
                  <TabPanel value={valueTab} index={0}>
                    <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
                    <ValidatorForm className={classes.form} onSubmit={saveBasicDataSubmit}>

                      <Grid container spacing={2}>
                        {courseType !== 'ONLINE' &&
                                    <Grid item xs={12}>
                                      <CustomSelect label={t('COURSE_TERM_BRANCH')} data={branchList.filter((x: any) => x.Name !== 'ONLINE_BRANCH')} selectValue={branch} onChangeValue={handleChangeBranch} id="branch" error={errorBranch} errorMessage={t('COURSE_TERM_SELECT_BRANCH')} />
                                    </Grid>
                        }
                        {courseType !== 'ONLINE' &&
                                    <Grid item xs={12}>
                                      <CustomSelect label={t('COURSE_TERM_CLASS_ROOM')} data={classRoomList} selectValue={classRoom} onChangeValue={handleChangeClassRoom} id="classRoom" error={errorClassRoom} errorMessage={t('COURSE_TERM_SELECT_CLASS_ROOM')} />
                                    </Grid>
                        }

                        <Grid item xs={12}>
                          <CourseStudentCount minimum={defaultMinimumStudents} maximum={defaultMaximumStudents} onChangeMinimum={handleChangeDefaultMinimumStudents} onChangeMaximum={handleChangeDefaultMaximumStudents} />
                        </Grid>
                        <Grid item xs={12}>
                          <CoursePrice price={coursePrice} sale={courseSale} onChangePrice={handleChangeCoursePrice} onChangeSale={handleChangeCourseSale} />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomDatePicker selectedDate={registrationFrom} onChangeDate={handleRegistrationFromChange} label={t('COURSE_TERM_REGISTRATION_FROM')} minDate={id === '' ? new Date() : registrationFrom} />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomDatePicker selectedDate={registrationTo} onChangeDate={handleRegistrationToChange} label={t('COURSE_TERM_REGISTRATION_TO')} minDate={registrationFrom} />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomDatePicker selectedDate={courseTermFrom} onChangeDate={handleCourseTermFromChange} label={t('COURSE_TERM_TERM_FROM')} minDate={id === '' ? new Date() : courseTermFrom} />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomDatePicker selectedDate={courseTermTo} onChangeDate={handleCourseTermToChange} label={t('COURSE_TERM_TERM_TO')} minDate={courseTermFrom} />
                        </Grid>
                        {courseWithLector &&
                        <Grid item xs={12}>
                          <CustomSelect label={t('COURSE_SCHOOL_TIMETABLE')} data={schoolTimeTableList} selectValue={schoolTimeTable} onChangeValue={handleChangeSchoolTimeTable} id="schoolTimeTable" />
                        </Grid>
                        }
                        {(courseWithLector && (schoolTimeTable === '' || schoolTimeTable === 'CODEBOOK_SELECT_VALUE' || schoolTimeTable === '00000000-0000-0000-0000-000000000000')) &&

                                    <Grid item xs={12}>
                                      <CodeBook codeBookIdentificator="cb_timetable" label={t('COURSE_TERM_TIME_START')} id="timeFrom" value={courseTimeFrom} onChange={handleChangeCourseTimeFrom} />
                                    </Grid>
                        }
                        {(courseWithLector && (schoolTimeTable === '' || schoolTimeTable === 'CODEBOOK_SELECT_VALUE' || schoolTimeTable === '00000000-0000-0000-0000-000000000000')) &&
                                    <Grid item xs={12}>
                                      <CodeBook codeBookIdentificator="cb_timetable" label={t('COURSE_TERM_TIME_END')} id="timeTo" value={courseTimeTo} onChange={handleChangeCourseTimeTo} />
                                    </Grid>
                        }
                        {courseWithLector &&
                        <Grid item xs={12}>
                          <CustomCheckBox checked={monday} onChange={handleChangeMonday} label={t('COURSE_TERM_MONDAY')} />
                        </Grid>
                        }
                        {courseWithLector &&
                        <Grid item xs={12}>
                          <CustomCheckBox checked={tuesday} onChange={handleChangeTuesday} label={t('COURSE_TERM_TUESDAY')} />
                        </Grid>
                        }
                        {courseWithLector &&
                        <Grid item xs={12}>
                          <CustomCheckBox checked={wednesday} onChange={handleChangeWednesday} label={t('COURSE_TERM_WEDNESDAY')} />
                        </Grid>
                        }
                        {courseWithLector &&

                        <Grid item xs={12}>
                          <CustomCheckBox checked={thursday} onChange={handleChangeThursday} label={t('COURSE_TERM_THURSDAY')} />
                        </Grid>
                        }
                        {courseWithLector &&

                        <Grid item xs={12}>
                          <CustomCheckBox checked={friday} onChange={handleChangeFriday} label={t('COURSE_TERM_FRIDAY')} />
                        </Grid>
                        }
                        {courseWithLector &&

                        <Grid item xs={12}>
                          <CustomCheckBox checked={saturday} onChange={handleChangeSaturday} label={t('COURSE_TERM_SATURDAY')} />
                        </Grid>
                        }
                        {courseWithLector &&

                        <Grid item xs={12}>
                          <CustomCheckBox checked={sunday} onChange={handleChangeSunday} label={t('COURSE_TERM_SUNDAY')} />
                        </Grid>
                        }
                        {courseWithLector &&

                        <Grid item xs={12}>
                          <CustomSelect label={t('COURSE_LECTORS')} showSelectValue={false} data={lectorList} selectValue={lectors} onChangeValue={handleChangeLector} id="lector" multiple={true} />
                        </Grid>
                        }

                        <Grid item xs={12}>
                          <CustomSelect label={t('COURSE_STUDENT_GROUP')} data={studentGroupList} selectValue={studentGroup} onChangeValue={handleChangeStudentGroup} id="studnetGroup" multiple={true} showSelectValue={false} />
                        </Grid>
                      </Grid>
                      <SaveButtons onSave={saveBasicData} backUrl={'/course/edit?id=' + GetUrlParam('courseId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=courseterm'} />
                    </ValidatorForm>
                  </TabPanel>
                  <TabPanel value={valueTab} index={1}>
                    <CustomTable addLinkUri={'/courseterm/addstudent?courseTermId=' + id + '&organizationId=' + GetUrlParam('organizationId')}
                      addLinkText={t('COURSE_TERM_ADD_STUDENT')} columns={
                        [{ title: t('COURSE_TERM_STUDENT_FIRST_NAME'), field: 'firstName' },
                          { title: t('COURSE_TERM_STUDENT_LAST_NAME'), field: 'lastName' },
                          { title: t('COURSE_TERM_STUDENT_EMAIL'), field: 'email' },
                          { title: t('COURSE_TERM_STUDENT_STATUS'), field: 'courseFinish', type: 'boolean', editable: 'never' },
                          {
                            title: '',
                            field: 'internal_action',
                            grouping: false,
                            sorting: false,
                            filtering: false,
                            align: 'right',
                            removable: false,
                            editable: false,
                            hiddenByColumnsButton: true,
                            render: (rowData: any) =>
                              rowData && (
                                <CourseTermMenu id={rowData.id} onReload={getStudentInCourseTerm} />
                              )
                          }

                        ]
                      }
                      editable={true}
                      showAddButton={true}
                      showEdit={false}
                      showDelete={true}
                      data={studentList}
                      deleteUrl={'webportal/CourseTermStudent/DeleteStudentFromCourseTerm'}
                      deleteDialogTitle={t('COURSE_TERM_STUDENT_DELETE_TITLE')}
                      deleteDialogContent={t('COURSE_TERM_STUDENT_DELETE_CONTENT')}
                      deleteParamIdName={'studentId'}
                      replaceContent={'name'}
                      deleteButtonText={t('COURSE_TERM_STUDENT_DELETE')}
                      onReload={getStudentInCourseTerm}
                      addAction={addAction}
                    />
                  </TabPanel>
                  <TabPanel value={valueTab} index={2}>
                    <CustomTable columns={
                      [{ title: t('COURSE_TERM_TIME_TABLE_DATE'), field: 'date', type: 'date' },
                        { title: t('COURSE_TERM_TIME_TABLE_TIME_FROM'), field: 'timeFrom', type: 'time' },
                        { title: t('COURSE_TERM_TIME_TABLE_TIME_TO'), field: 'timeTo', type: 'time' },
                        { title: t('COURSE_TERM_TIME_TABLE_DAY_OF_WEEK'), field: 'dayOfWeek' },
                        { title: t('COURSE_TERM_TIME_TABLE_CANCELED'), field: 'isCanceled', type: 'boolean' },
                        { title: t('COURSE_TERM_TIME_CLASS_ROOM'), field: 'classRoom' },
                        { title: t('COURSE_TERM_TIME_LECTOR'), field: 'lector' },
                        {
                          title: '',
                          field: 'internal_action',
                          grouping: false,
                          sorting: false,
                          filtering: false,
                          align: 'right',
                          removable: false,
                          editable: false,
                          hiddenByColumnsButton: true,
                          render: (rowData: any) =>
                            rowData && (
                              <CourseTermTimeTable id={rowData.id} onReload={getTimeTable} />
                            )
                        }

                      ]
                    }
                    editable={false}
                    showAddButton={false}
                    showEdit={false}
                    showDelete={false}
                    selection={false}
                    data={timeTableList}
                    customAction={
                      [
                        {
                          icon: <AddBox />,
                          tooltip: 'Vygenerovat rozvrh hodin',
                          isFreeAction: true,
                          onClick: (event:any) => axiosInstance.post('webportal/CourseTerm/GenerateTimeTable', {
                            userAccessToken: GetUserToken(),
                            courseTermId: GetUrlParam('id')
                          }).then(function () {
                            getTimeTable()
                          })
                        }
                      ]
                    }

                    />
                  </TabPanel>
                </Paper>
      }

    </Container>
  )
}
