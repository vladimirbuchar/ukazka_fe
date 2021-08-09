import React, { useEffect } from 'react'
import { Container, Paper, AppBar, Tabs, Tab } from '@material-ui/core'
import Loading from '../../component/Loading/Loading'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import PageName from '../../component/PageName/PageName'
import { axiosInstance } from '../../axiosInstance'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import TabPanel from '../../component/TabPanel/TabPanel'
import a11yProps from '../../component/A11yProps/A11yProps'
import CustomTable from '../../component/CustomTable/CustomTable'
import useStyles from '../../styles'
import { StudentEvaluationAdd } from '../../WebModel/StudentEvaluation/StudentEvaluationAdd'

export default function StudentEvaluation () {
  const { t } = useTranslation()
  const [showLoading, setShowLoading] = React.useState(false)
  const [valueTab, setValueTab] = React.useState(0)
  const courseId = GetUrlParam('courseId')
  const courseTermId = GetUrlParam('courseTermId')
  const [studentAttendance, setStudentAttendance] = React.useState([])
  const [studentAttendanceHeader, setStudentAttendanceHeader] = React.useState([])
  const [studentEvaluation, setStudentEvaluation] = React.useState([])
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const classes = useStyles()
  const [studentList, setStudentList] = React.useState([])

  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), courseId, 'showStudentTestResult')
      setPermitions(permitions)
      await axiosInstance.get('webportal/CourseTermStudent/GetAllStudentInCourseTerm', {
        params: {
          accessToken: GetUserToken(),
          courseTermId: GetUrlParam('courseTermId')
        }
      }).then(function (response) {
        const tmp = [] as any
        response?.data?.data.forEach(function (item: any) {
          const key = item.id
          const value = item.name
          if (item.isDefault) {
            tmp[key] = t(value)
          } else {
            tmp[key] = value
          }
        })
        setStudentList(tmp)
      })
      getStudentEvaluation()
    }

    fetchData()
  }, [])
  const getStudentEvaluation = async () => {
    setShowLoading(true)

    axiosInstance.get('webportal/CourseTerm/GetStudentEvaluation', {
      params: {
        accessToken: GetUserToken(),
        courseTermId: courseTermId
      }
    }).then(function (response: any) {
      setStudentEvaluation(response.data.data)
      setShowLoading(false)
    })
  }
  const addAction = (newData: any) => {
    const obj = new StudentEvaluationAdd(newData.evaluation, newData.userId, GetUrlParam('courseTermId'), GetUserToken())
    axiosInstance.post('webportal/CourseTerm/AddStudentEvaluation', obj).then(function () {
      getStudentEvaluation()
      return true
    }).catch((error: any) => {
      return showErorr(error?.response?.data?.errors)
    })
  }

  const updateAction = (oldData: any, newData: any) => {
    /* const obj = new ClassRoomUpdate(newData.floor, newData.maxCapacity, newData.name, newData.description, GetUserToken(), oldData.id);
    axiosInstance.put("webportal/ClassRoom/UpdateClassRoom", obj).then(function () {
      getStudentEvaluation();
      return true;
    }).catch((error: any) => {
      return showErorr(error?.response?.data?.errors)

    }); */
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

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('STUDENT_EVALUATION_TITLE')} showBackButton={true} backButtonUrl={'/course/list'} />
      {!(permitions.isLector) &&
        <AccessForbiden />
      }
      {(permitions.isLector) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('STUDENT_EVALUATION_TITLE')} {...a11yProps(0)} />

            </Tabs>
          </AppBar>
          <TabPanel value={valueTab} index={0}>
            <CustomTable addLinkText={t('CLASSROOM_BUTTON_ADD')} columns={
              [
                {
                  title: t('STUDENT_EVALUATION_DATE'), field: 'date', type: 'date', editable: 'never'

                },
                { title: t('STUDENT_EVALUATION_STUDENT'), field: 'userEmail', lookup: studentList },
                { title: t('STUDENT_EVALUATION_EVALUATION'), field: 'evaluation' }

              ]
            }
            editable={true}
            showAddButton={true}
            showEdit={false}
            showDelete={true}
            data={studentEvaluation}
            editLinkText={t('BRANCH_CLASS_ROOM_EDIT')}
            deleteUrl={'webportal/ClassRoom/DeleteClassRoom'}
            deleteDialogTitle={t('BRANCH_CLASS_ROOM_DELETE_TITLE')}
            deleteDialogContent={t('BRANCH_CLASS_ROOM_DELETE_CONTENT')}
            deleteParamIdName={'classRoomId'}
            onReload={getStudentEvaluation}
            replaceContent={'name'}
            deleteButtonText={t('BRANCH_CLASS_ROOM_DELETE')}

            addAction={addAction}
            editAction={updateAction}
            />

          </TabPanel>

        </Paper>
      }
    </Container>
  )
}
