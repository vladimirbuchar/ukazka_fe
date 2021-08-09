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
import TabPanel from '../../component/TabPanel/TabPanel'
import a11yProps from '../../component/A11yProps/A11yProps'
import CustomTable from '../../component/CustomTable/CustomTable'

export default function StudentTestResult () {
  const { t } = useTranslation()
  const [showLoading, setShowLoading] = React.useState(false)
  const [valueTab, setValueTab] = React.useState(0)
  const couserId = GetUrlParam('courseId')
  const [studentTestResult, setStudentTestResult] = React.useState([])

  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }
  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), couserId, 'showStudentTestResult')
      setPermitions(permitions)
      realoadStudentTestResult()
    }

    fetchData()
  }, [])
  const realoadStudentTestResult = async () => {
    setShowLoading(true)

    axiosInstance.get('webportal/CourseTest/GetAllStudentTestResult', {
      params: {
        accessToken: GetUserToken(),
        courseId: couserId
      }
    }).then(function (response: any) {
      setStudentTestResult(response?.data?.data)
      setShowLoading(false)
    })
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('STUDENT_TEST_RESULT_TITLE')} showBackButton={true} backButtonUrl={'/course/list'}/>
      {!(permitions.isLector) &&
        <AccessForbiden />
      }
      {(permitions.isLector) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('STUDENT_TEST_RESULT_TITLE')} {...a11yProps(0)} />

            </Tabs>
          </AppBar>
          <TabPanel value={valueTab} index={0}>
            <CustomTable columns={
              [{ title: t('STUDENT_TEST_RESULT_TEST_NAME'), field: 'name' },
                { title: t('STUDENT_TEST_RESULT_STUDENT_NAME'), field: 'fullName' },
                { title: t('STUDENT_TEST_RESULT_STUDENT_EMAIL'), field: 'userEmail' },
                { title: t('STUDENT_TEST_RESULT_STUDENT_FINISH'), field: 'finish', type: 'datetime' },
                { title: t('STUDENT_TEST_RESULT_STUDENT_SCORE'), field: 'score', type: 'numeric' }
              ]

            }
            showAddButton={false}
            showEdit={(permitions.isLector)}
            showDelete={false}
            data={studentTestResult}
            editLinkUri={'/studenttestresultdetail'}
            editLinkText={t('STUDENT_TEST_RESULT_STUDENT_ANSWER')}
            onReload={realoadStudentTestResult}
            editParams={'courseId=' + couserId}
            linkColumnName="name"

            />

          </TabPanel>

        </Paper>
      }
    </Container>
  )
}
