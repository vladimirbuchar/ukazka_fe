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
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { useHistory } from 'react-router'
import { UpdateStudentGroup } from '../../WebModel/StudentGroup/UpdateStudentGroup'
import { AddStudentGroup } from '../../WebModel/StudentGroup/AddStudentGroup'
import CustomTable from '../../component/CustomTable/CustomTable'
import { getLanguage } from '../../i18n'
import { AddStudentToGroup } from '../../WebModel/StudentGroup/AddStudentToGroup'

export default function StudentGroupEdit () {
  const { t } = useTranslation()
  var id = GetUrlParam('id')
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [studentGroupName, setStudentGroupName] = React.useState('')

  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const history = useHistory()
  const [studentList, setStudentList] = React.useState([] as any)

  const handleChangeStudentGroupName = (event: any) => {
    setStudentGroupName(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    if (valueTab === 0) {
      return save().then(function (response: any) {
        if (id === '') {
          history.push('/studentgroupedit/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
          id = response.data.data
        }
        setShowLoading(false)
        if (newValue === 1) {
          getStudentInCourseTerm()
        }
        setValueTab(newValue)
      })
        .catch((error: any) => {
          return showErorr(error?.response?.data?.errors)
        })
    } else {
      setValueTab(newValue)
    }

    if (newValue === 1) {
      getStudentInCourseTerm()
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('organizationId') : id, id === '' ? 'organization' : 'studentgroup')
      setPermitions(permitions)

      if (id === '') {
        setValueTab(0)
        setShowLoading(false)
      } else {
        await axiosInstance.get('webportal/StudentGroup/GetStudentGroupDetail', {
          params: {
            accessToken: GetUserToken(),
            studentGroupId: id
          }
        }).then(function (response: any) {
          setStudentGroupName(response?.data?.data?.name)
          setShowLoading(false)
          getStudentInCourseTerm()
        })
      }
    }
    fetchData()
  }, [])
  const getStudentInCourseTerm = () => {
    setShowLoading(true)
    axiosInstance.get('webportal/StudentGroup/GetAllStudentInGroup', {
      params: {
        accessToken: GetUserToken(),
        studentGroupId: GetUrlParam('id')
      }
    }).then(function (response) {
      setStudentList(response?.data?.data)
      setShowLoading(false)
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
  const saveBasicDataSubmit = async () => {
    setShowLoading(true)
    setOpenError(false)
    return save().then(function (response: any) {
      if (id === '') {
        history.push('/studentgroupedit/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
      }
      setShowLoading(false)

      return true
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }
  const addAction = (newData: any) => {
    setShowLoading(true)
    save().then(function (response: any) {
      const obj = new AddStudentToGroup(newData.email, id === '' ? response.data.data : id, GetUserToken(), getLanguage(), newData.firstName, newData.lastName)
      axiosInstance.post('webportal/StudentGroup/AddStudentToGroup', obj).then(function () {
        history.push('/studentgroupedit/?organizationId=' + GetUrlParam('organizationId') + '&id=' + (id === '' ? response.data.data : id))
        getStudentInCourseTerm()
        setShowLoading(false)
      }).catch((error: any) => {
        showErorr(error?.response?.data?.errors)
      })
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
      const obj = new AddStudentGroup(GetUrlParam('organizationId'), GetUserToken(), studentGroupName)
      return axiosInstance.post('webportal/StudentGroup/AddStudentGroup', obj)
    } else {
      const obj = new UpdateStudentGroup(id, GetUserToken(), studentGroupName)
      return axiosInstance.put('webportal/StudentGroup/UpdateStudentGroup', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('STUDENT_GROUP_TITLE') + ' - ' + studentGroupName} showBackButton={true} backButtonUrl={'/organization/edit?id=' + GetUrlParam('organizationId') + '&gototab=studentgroup'} organizationId={GetUrlParam('organizationId')} showChangeCulture={true} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
        <Paper>
          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('STUDENT_GROUP_NAME_BASIC_INFORMATION')} {...a11yProps(0)} />

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
                    label={t('STUDENT_GROUP_NAME')}
                    onChange={handleChangeStudentGroupName}
                    name='certificateName'
                    value={studentGroupName}
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    variant='outlined'
                    fullWidth
                    id='studentGroupName'
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomTable addLinkUri={'/courseterm/addstudent?courseTermId=' + id + '&organizationId=' + GetUrlParam('organizationId')}
                    addLinkText={t('COURSE_TERM_ADD_STUDENT')} columns={
                      [{ title: t('COURSE_TERM_STUDENT_FIRST_NAME'), field: 'firstName' },
                        { title: t('COURSE_TERM_STUDENT_LAST_NAME'), field: 'lastName' },
                        { title: t('COURSE_TERM_STUDENT_EMAIL'), field: 'email' }

                      ]
                    }
                    title={t('COURSE_TERM_TAB_STUDENTS')}
                    editable={true}
                    showAddButton={true}
                    showEdit={false}
                    showDelete={true}
                    data={studentList}
                    deleteUrl={'webportal/StudentGroup/DeleteStudentFromGroup'}
                    deleteDialogTitle={t('COURSE_TERM_STUDENT_DELETE_TITLE')}
                    deleteDialogContent={t('COURSE_TERM_STUDENT_DELETE_CONTENT')}
                    deleteParamIdName={'studentId'}
                    replaceContent={'name'}
                    deleteButtonText={t('COURSE_TERM_STUDENT_DELETE')}
                    onReload={getStudentInCourseTerm}
                    addAction={addAction}
                    deleteParams={'studentGroupId=' + id}
                  />
                </Grid>

              </Grid>

              <SaveButtons onSave={saveBasicData} backUrl={'/organization/edit?id=' + GetUrlParam('organizationId') + '&gototab=studentgroup'} />

            </ValidatorForm>
          </TabPanel>

        </Paper>}

    </Container>
  )
}
