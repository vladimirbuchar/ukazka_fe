import React, { useEffect } from 'react'
import { Container, AppBar, Tabs, Paper, Tab, Grid, Chip } from '@material-ui/core'
import PageName from '../../component/PageName/PageName'
import { useTranslation } from 'react-i18next'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUrlParam from '../../core/GetUrlParam'
import GetUserToken from '../../core/GetUserToken'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import a11yProps from '../../component/A11yProps/A11yProps'
import TabPanel from '../../component/TabPanel/TabPanel'
import useStyles from '../../styles'
import { ValidatorForm } from 'react-material-ui-form-validator'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import { axiosInstance } from '../../axiosInstance'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { UserEmail } from '../../WebModel/CourseTermStudent/UserEmail'

export default function AddStudentToTerm () {
  const classes = useStyles()
  const { t } = useTranslation()
  const paramId = GetUrlParam('id')
  const [userEmail, setUserEmail] = React.useState('')
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [valueTab, setValueTab] = React.useState(0)
  const [userEmailsList, setUserEmailsList] = React.useState([])
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: any) => {
    setValueTab(newValue)
  }
  const handleDelete = (chipToDelete: UserEmail) => () => {
    const tmpArray = [] as any
    let i = 0
    userEmailsList.forEach(function (item: UserEmail) {
      if (item.Email !== chipToDelete.Email) {
        tmpArray[i] = new UserEmail(item.Email)
        i++
      }
    })
    setUserEmailsList(tmpArray)
  }
  const saveBasicData = () => {
    setShowLoading(true)
    return save().then(function () {
      setShowLoading(false)
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
        return false
      })
  }
  const save = () => {
    let emails: string[]
    emails = []
    let i = 0
    userEmailsList.forEach(function (item: UserEmail) {
      emails[i] = item.Email
      i++
    })
    if (emails.length === 0) {
      emails[0] = userEmail
    }
    // let obj = new AddStudentToCourseTerm(emails,GetUrlParam("courseTermId"),GetUserToken(), getLanguage());
    return axiosInstance.post('webportal/CourseTermStudent/AddStudentToCourseTerm', null)
  }
  const handleChangeEmail = (e: any) => {
    let value = e.target.value
    if (value.endsWith(',')) {
      value = value.substring(0, value.length - 1)
      if (value !== '') {
        let tmpArray: UserEmail[]
        tmpArray = userEmailsList
        const length = tmpArray.length
        tmpArray[length] = new UserEmail(value)
        setUserEmailsList(tmpArray as never)
        setUserEmail('')
      }
    } else {
      setUserEmail(value)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const permitions = await GetUserOrganizationRole(GetUserToken(), paramId === '' ? GetUrlParam('organizationId') : paramId, paramId === '' ? 'organization' : 'userinorganization')
      setPermitions(permitions)
    }
    fetchData()
  }, [])
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }
  return (
    <Container component="main" maxWidth="xl">
      <Loading showLoading={showLoading} />
      <PageName title={t('ADD_STUDENT_TO_TERM')} showBackButton={true} backButtonUrl={'/courseterm/edit?id=' + GetUrlParam('courseTermId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=students'} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator) && !showLoading &&
                <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator) && <Paper>
        <AppBar position="static">
          <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
            <Tab label={t('ADD_STUDENT_TO_TERM_BASIC_INFORMATION')} {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={valueTab} index={0}>
          <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
          <ValidatorForm className={classes.form}
            onSubmit={saveBasicData}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('ADD_STUDENT_TO_COURSE_TERM')}
                  onChange={handleChangeEmail}
                  name="userEmail"
                  value={userEmail}
                  validators={['isEmail']}
                  errorMessages={[t('VALIDATION_EMAIL')]}
                  variant="outlined"
                  fullWidth
                  id="userEmail"
                />
                <Paper component="ul" className={classes.userEmails}>
                  {userEmailsList.map((data: UserEmail) => {
                    return (
                      <li key={data.Email}>
                        <Chip
                          label={data.Email}
                          onDelete={handleDelete(data)}
                          className={classes.chip}
                        />
                      </li>
                    )
                  })}

                </Paper>

              </Grid>

            </Grid>
            <SaveButtons showSaveButton={false} onSave={saveBasicData} backUrl={'/courseterm/edit?id=' + GetUrlParam('courseTermId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=students'} />
          </ValidatorForm>
        </TabPanel>

      </Paper>
      }
    </Container>
  )
}
