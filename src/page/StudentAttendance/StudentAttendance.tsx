import React, { useEffect } from 'react'
import { Container, Paper, AppBar, Tabs, Tab, TableCell, Table, TableContainer, TableBody, TableHead, TableRow } from '@material-ui/core'
import Loading from '../../component/Loading/Loading'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import PageName from '../../component/PageName/PageName'
import { axiosInstance } from '../../axiosInstance'
import { useTranslation } from 'react-i18next'
import TabPanel from '../../component/TabPanel/TabPanel'
import a11yProps from '../../component/A11yProps/A11yProps'
import useStyles from '../../styles'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'

export default function StudentAttendance () {
  const { t } = useTranslation()
  const [showLoading, setShowLoading] = React.useState(false)
  const [valueTab, setValueTab] = React.useState(0)
  const courseId = GetUrlParam('courseId')
  const courseTermId = GetUrlParam('courseTermId')
  const [studentAttendance, setStudentAttendance] = React.useState([])
  const [studentAttendanceHeader, setStudentAttendanceHeader] = React.useState([])
  const classes = useStyles()

  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }
  const selectStudent = (event: any) => {
    const { studentid, timetableid } = event.target.parentNode.parentNode.dataset
    axiosInstance.put('webportal/CourseTerm/SaveStudentAttendance', {
      userAccessToken: GetUserToken(),
      courseTermId: courseTermId,
      studentId: studentid,
      timeTableId: timetableid,
      isActive: event.target.checked

    }).then(function () {
      realoadStudentTestResult()
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), courseId, 'showStudentTestResult')
      setPermitions(permitions)
      realoadStudentTestResult()
    }

    fetchData()
  }, [])
  const realoadStudentTestResult = async () => {
    setShowLoading(true)

    axiosInstance.get('webportal/CourseTerm/GetStudentAttendance', {
      params: {
        accessToken: GetUserToken(),
        courseTermId: courseTermId
      }
    }).then(function (response: any) {
      const headerTmp = [] as any
      const bodyTmp = [] as any
      response.data.data.timeTable.forEach(function (item: any) {
        headerTmp.push(<TableCell>{item.date}({item.timeFrom} - {item.timeTo})</TableCell>)
      })
      response.data.data.student.forEach(function (item: any) {
        const checkBoxes = [] as any
        response.data.data.timeTable.forEach(function (item2: any) {
          checkBoxes.push(<TableCell><CustomCheckBox onChange={selectStudent} data-studentid={item.id} data-timetableid={item2.id} checked={response.data.data.studentAttendance.find((x:any) => x.termId === item2.id && x.studentId === item.id)?.isActive}/> </TableCell>)
        })

        bodyTmp.push(
          <TableRow>
            <TableCell>{item.firstName} {item.secondName} {item.lastName} ({item.userEmail})</TableCell>
            {checkBoxes}
          </TableRow>

        )
      })
      setStudentAttendance(bodyTmp)
      setStudentAttendanceHeader(headerTmp)
      setShowLoading(false)
    })
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('STUDENT_ATTENDANCE_TITLE')} showBackButton={true} backButtonUrl={'/course/list'} />
      {!(permitions.isLector) &&
        <AccessForbiden />
      }
      {(permitions.isLector) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('STUDENT_ATTENDANCE_TITLE')} {...a11yProps(0)} />

            </Tabs>
          </AppBar>
          <TabPanel value={valueTab} index={0}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell> &nbsp;</TableCell>
                    {studentAttendanceHeader}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentAttendance}
                </TableBody>
              </Table>
            </TableContainer>

          </TabPanel>

        </Paper>
      }
    </Container>
  )
}
