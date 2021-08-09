import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { UnLoggedUserItems } from './component/Menu/Menu'
import LogedUserItems from './component/Menu/LogedUserItems'
import SignIn from './page/SignIn/SignIn'
import SignUp from './page/SignUp/SignUp'
import LangSelector from './component/LangSelector/LangSelector'
import Notification from './component/Notification/Notification'
import useStyles from './styles'
import Copyright from './component/Copyright/Copyright'
import CompanyName from './component/CompanyName/CompanyName'
import Contact from './page/Contact/Contact'
import Dashboard from './page/Dashboard/Dashboard'
import LogOut from './page/LogOut/LogOut'
import MyProfile from './page/MyProfile/MyProfile'
import OrganizationEdit from './page/OrganizationEdit/OrganizationEdit'
import OrganizationList from './page/OrganizationList/OrganizationList'
import BranchEdit from './page/BranchEdit/BranchEdit'
import ClassRoomEdit from './page/ClassRoomEdit/ClassRoomEdit'
import AddUserToOrganization from './page/AddUserToOrganization/AddUserToOrganization'
import NotificationList from './page/NotificationList/NotificationList'
import CourseEdit from './page/CourseEdit/CourseEdit'
import { axiosInstance } from './axiosInstance'
import GetUserToken from './core/GetUserToken'
import CourseTermEdit from './page/CourseTermEdit/CourseTermEdit'
import AddStudentToTerm from './page/AddStudentToTerm/AddStudentToTerm'
import CourseLessonEdit from './page/CourseLessonEdit/CourseLessonEdit'
import CourseLessonItemEdit from './page/CourseLessonItemEdit/CourseLessonItemEdit'
import BankOfQuestionEdit from './page/BankOfQuestionEdit/BankOfQuestionEdit'
import Question from './page/Question/Question'
import Answer from './page/Answer/Answer'
import CourseTestEdit from './page/CourseTestEdit/CourseTestEdit'
import Error500 from './page/Error/Error500'
import Error404 from './page/Error/Error404'
import BrowseCourse from './page/BrowseCourse/BrowseCourse'
import StudentTestResult from './page/StudentTestResult/StudentTestResult'
import StudentTestResultDetail from './page/StudentTestResultDetail/StudentTestResultDetail'
import MyCourseList from './page/MyCourseList/MyCourseList'
import ContactFooter from './component/ContactFooter/ContactFooter'
import PasswordReset from './page/PasswordReset/PasswordReset'
import ActivateUser from './page/ActivateUser/ActivateUser'
import NewPassword from './page/NewPassword/NewPassword'
import { Grid, Paper } from '@material-ui/core'
import UserAvatar from './component/UserAvatar/UserAvatar'
import CertficateEdit from './page/CertficateEdit/CertficateEdit'
import SendMessageEdit from './page/SendMessageEdit/SendMessageEdit'
import StudentGroupEdit from './page/StudentGroupEdit/StudentGroupEdit'
import CourseMaterialEdit from './page/CourseMaterialEdit/CourseMaterialEdit'
import StudentAttendance from './page/StudentAttendance/StudentAttendance'
import StudentEvaluation from './page/StudentEvaluation/StudentEvaluation'
import NoteEdit from './page/NoteEdit/NoteEdit'

export default function App () {
  const [cbCountry, setCbCountry] = React.useState([])
  const [cbAddressType, setCbAddressType] = React.useState([])
  const [cbCourseLessonItemType, setSbCourseLessonItemType] = React.useState([])
  const [pageOpacity, setPageOpacity] = React.useState('')
  const [defaultOpacity, setDefaultOpacity] = React.useState('0.9')
  const [organizationName, setOrganizationName] = React.useState('')
  const [organizationId, setOrganizationId] = React.useState(window.localStorage.getItem('organizationId') || '')
  const [organizationTab, setOrganizationTab] = React.useState('')
  const [loginFacebook, setLoginFacebook] = React.useState(false)
  const [loginGoogle, setLoginGoogle] = React.useState(false)
  const [loginRegistration, setLoginRegistration] = React.useState(false)
  const [loginPasswordReset, setLoginPasswordReset] = React.useState(false)

  const changePageOpacity = () => {
    setPageOpacity(defaultOpacity)
  }
  const onCancelOpacity = () => {
    setPageOpacity('0.1')
  }
  // console.log("cancelOpacity",onCancelOpacity);

  useEffect(() => {
    const fetchData = async () => {
      setPageOpacity(defaultOpacity)
      const url = window.location.href
      if (url.indexOf('/elearning/') >= 0) {
        await axiosInstance.get('/web/Organization/GetOrganizationSettingByUrl', {
          params: {
            url: url
          }
        }).then(function (response) {
          if (response.status === 200) {
            setOrganizationName(response?.data?.data.name)
            setOrganizationId(response?.data?.data.id)
            setLoginPasswordReset(response?.data?.data?.passwordReset)
            setLoginRegistration(response?.data?.data?.registration)
            setLoginFacebook(response?.data?.data?.facebookLogin)
            setLoginGoogle(response?.data?.data?.googleLogin)
            window.localStorage.setItem('organizationName', response?.data?.data.name)
            window.localStorage.setItem('organizationId', response?.data?.data.id)
            window.localStorage.setItem('logoutUrl', window.location.href)
            window.localStorage.setItem('loginUrl', window.location.href)
          }
        })
          .catch((error: any) => {
            window.location.href = '/'
          })
      } else {
        setLoginPasswordReset(true)
        setLoginRegistration(true)
        setLoginFacebook(true)
        setLoginGoogle(true)
      }
      if (url.indexOf('/browsecourse?') >= 0) {
        setPageOpacity('1.0')
      }

      axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_country').then(function (response) {
        setCbCountry(response?.data?.data)
      })
      axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_addresstype').then(function (response) {
        setCbAddressType(response?.data?.data)
      })
      axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_courselessonitemtemplate').then(function (response) {
        setSbCourseLessonItemType(response?.data?.data)
      })
    }
    fetchData()
  }, [])
  const changeOrganizationTab = (tabName: string) => {
    setOrganizationTab(tabName)
  }
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  let leftMenu
  if (GetUserToken() === '') leftMenu = <UnLoggedUserItems showRegistration={loginRegistration} />
  else {
    leftMenu = <LogedUserItems onChangeTab={changeOrganizationTab} onChangeOpacity={changePageOpacity} />
  }

  return (
    <div className={classes.root}>

      <Router>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <CompanyName name={organizationName} />
            {GetUserToken() !== '' &&
              <Notification onChangeOpacity={changePageOpacity} />
            }
            {GetUserToken() !== '' &&
              <UserAvatar onChangeOpacity={changePageOpacity} />
            }
            <LangSelector />
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.leftMenu}
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {leftMenu}
          <Divider />

        </Drawer>
        <main className={classes.content} style={{
          opacity: pageOpacity
        }}>
          <div className={classes.appBarSpacer} />
          <Container component="main" maxWidth="xl">
            <Paper className={classes.rootPaper}>

              <Switch>
                {GetUserToken() === '' &&
                  <Route exact path="/">
                    <SignIn loginFacebook={true} loginGoogle={true} passwordReset={true} registration={true} />
                  </Route>
                }
                {GetUserToken() !== '' &&
                  <Route exact path="/">
                    <Dashboard onChangeOpacity={onCancelOpacity}/>
                  </Route>
                }
                {GetUserToken() === '' &&
                  <Route path="/elearning/:organization">
                    <SignIn loginFacebook={loginFacebook} loginGoogle={loginGoogle} passwordReset={loginPasswordReset} registration={loginRegistration} />
                  </Route>
                }
                <Route path="/userActivate">
                  <ActivateUser />
                </Route>
                <Route path="/newPassword">
                  <NewPassword />
                </Route>
                <Route path="/signup">
                  <SignUp cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>
                <Route path="/error500">
                  <Error500 />
                </Route>
                <Route path="/error404">
                  <Error404 />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>

                {GetUserToken() !== '' && <Route exact path="/dashboard">
                  <Dashboard />
                </Route>}

                {GetUserToken() !== '' && <Route path="/logout">
                  <LogOut />
                </Route>}
                {GetUserToken() !== '' && <Route path="/myprofile">
                  <MyProfile cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}

                {GetUserToken() !== '' && <Route path="/organization/edit" >
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} tab={organizationTab} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/branch/list">
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/organization/editnew">
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}

                {GetUserToken() !== '' && <Route path="/organization/course">
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/organization/user">
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/organization/branch">
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/organization/user">
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/organization/bankofquestion">
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/organization/setting">
                  <OrganizationEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/organization/adduser">
                  <AddUserToOrganization />
                </Route>}
                {GetUserToken() !== '' && <Route path="/organization/list">
                  <OrganizationList />
                </Route>}
                {GetUserToken() !== '' && <Route path="/branch/edit">
                  < BranchEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/branch/editnew">
                  < BranchEdit cbCountry={cbCountry} cbAddressType={cbAddressType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/classroom/edit">
                  <ClassRoomEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/classroom/editnew">
                  <ClassRoomEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/notifications">
                  <NotificationList />
                </Route>}
                {GetUserToken() !== '' && <Route path="/course/edit">
                  <CourseEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/course/editnew">
                  <CourseEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/course/list">
                  <MyCourseList onCancelOpacity={onCancelOpacity}/>
                </Route>}
                {GetUserToken() !== '' && <Route path="/courseterm/edit">
                  <CourseTermEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/courseterm/editnew">
                  <CourseTermEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/courseterm/addstudent">
                  <AddStudentToTerm />
                </Route>}
                {GetUserToken() !== '' && <Route path="/courselesson/edit">
                  <CourseLessonEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/courselesson/editnew">
                  <CourseLessonEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/courselessonitem/edit">
                  <CourseLessonItemEdit cbCourseLessonItemType={cbCourseLessonItemType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/courselessonitem/editnew">
                  <CourseLessonItemEdit cbCourseLessonItemType={cbCourseLessonItemType} />
                </Route>}
                {GetUserToken() !== '' && <Route path="/bankofquestion/edit">
                  <BankOfQuestionEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/bankofquestion/editnew">
                  <BankOfQuestionEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/question/edit">
                  <Question />
                </Route>}
                {GetUserToken() !== '' && <Route path="/question/editnew">
                  <Question />
                </Route>}
                {GetUserToken() !== '' && <Route path="/answer/edit">
                  <Answer />
                </Route>}
                {GetUserToken() !== '' && <Route path="/coursetest/edit">
                  <CourseTestEdit />
                </Route>}
                {GetUserToken() !== '' &&
                  <Route path="/browsecourse">
                    <BrowseCourse />
                  </Route>}

                {GetUserToken() !== '' && <Route path="/studenttestresult">
                  <StudentTestResult />
                </Route>}

                {GetUserToken() !== '' && <Route path="/studentattendance">
                  <StudentAttendance />
                </Route>}
                {GetUserToken() !== '' && <Route path="/studentevaluation">
                  <StudentEvaluation />
                </Route>}

                {GetUserToken() !== '' && <Route path="/studenttestresultdetail">
                  <StudentTestResultDetail />
                </Route>}
                {GetUserToken() !== '' && <Route path="/certificateedit">
                  <CertficateEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/sendmessageedit">
                  <SendMessageEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/studentgroupedit">
                  <StudentGroupEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/coursematerialedit">
                  <CourseMaterialEdit />
                </Route>}
                {GetUserToken() !== '' && <Route path="/noteedit">
                  <NoteEdit />
                </Route>}
                {GetUserToken() === '' && <Route path="/passwordreset">
                  <PasswordReset />
                </Route>}

                {GetUserToken() === '' &&
                  <Route path='*' exact={true} component={Redirect} to="/" />
                }
                {GetUserToken() !== '' &&
                  <Route path='*' exact={true} component={Redirect} to="/dashboard" />
                }

              </Switch>
              <Grid container justify="center" alignItems="flex-end">
                <Box className={classes.footer}>
                  <Copyright />
                  <ContactFooter />
                </Box>
              </Grid>

            </Paper>

          </Container>

        </main>

      </Router>
    </div>
  )
}
