import React, { useEffect } from 'react'
import { Container, Paper, AppBar, Tabs, Tab, Grid, Chip } from '@material-ui/core'
import PageName from '../../component/PageName/PageName'
import { useTranslation } from 'react-i18next'
import a11yProps from '../../component/A11yProps/A11yProps'
import TabPanel from '../../component/TabPanel/TabPanel'
import useStyles from '../../styles'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { axiosInstance } from '../../axiosInstance'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import { InsertUserToOrganization } from '../../WebModel/OrganizationUser/InsertUserToOrganization'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import { UpdateUserInOrganizationRole } from '../../WebModel/OrganizationUser/UpdateUserInOrganizationRole'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { UserEmail } from '../../WebModel/CourseTermStudent/UserEmail'
import CustomSelect from '../../component/CustomSelect/CustomSelect'
import SelectItem from '../../WebModel/Shared/SelectItem'
import { getLanguage } from '../../i18n'
import OrganizationRole from '../../WebModel/Shared/OrganizationRole'

export default function AddUserToOrganization () {
  const { t } = useTranslation()
  const [valueTab, setValueTab] = React.useState(0)
  const [userEmail, setUserEmail] = React.useState('')
  const [role, setRole] = React.useState([] as any)
  const [roleList, setRoleList] = React.useState([])
  const [userEmailsList, setUserEmailsList] = React.useState([])
  const [id, setId] = React.useState('')
  const paramId = GetUrlParam('id')
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([] as any)
  const [showLoading, setShowLoading] = React.useState(false)

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }
  const handleChangeEmail = (e: any) => {
    setOpenError(false)
    setErrorMessage([])
    let value = e.target.value
    if (value.endsWith(',')) {
      value = value.substring(0, value.length - 1)
      if (value !== '') {
        let tmpArray: UserEmail[]
        tmpArray = userEmailsList
        const length = tmpArray.length
        tmpArray[length] = new UserEmail(value)
        setUserEmailsList(tmpArray as any)
        setUserEmail('')
      }
    } else {
      setUserEmail(value)
    }
  }
  const classes = useStyles()
  const handleChangeRole = (e: any) => {
    setOpenError(false)
    setErrorMessage([])
    setRole(e.target.value as never[])
  }
  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), GetUrlParam('organizationId'), 'organization')
      setPermitions(permitions)
      if (paramId !== '') {
        setId(paramId)
      }

      await axiosInstance.get('webportal/OrganizationUser/GetOrganizationRoles').then(function (response) {
        const roleItems = response?.data?.data
        let tmp = [] as any
        tmp = roleItems.filter((x: OrganizationRole) => x.roleIndentificator !== 'ORGANIZATION_OWNER')
        setRoleList(tmp)
        if (paramId !== '') {
          axiosInstance.get('webportal/OrganizationUser/GetUserOrganizationRoleDetail', {
            params: {
              accessToken: GetUserToken(),
              userId: paramId,
              organizationId: GetUrlParam('organizationId')
            }
          }).then(function (response2: any) {
            setRole(response2?.data?.data?.id)
            setShowLoading(false)
          })
        } else {
          setShowLoading(false)
        }
      })
    }
    fetchData()
  }, [])

  const saveBasicData = () => {
    setShowLoading(true)
    return save()?.then(function () {
      setShowLoading(false)
      return true
    })
      .catch((error: any) => {
        if (error?.response?.data?.errors?.length > 0) {
          const message = [] as any
          error?.response?.data?.errors?.forEach((element: any) => {
            message.push(t(element.basicCode))
          })
          setErrorMessage(message)
          setOpenError(true)
        }
        setShowLoading(false)
        return false
      })
  }
  const save = () => {
    if (!role || role.length === 0) {
      const message = errorMessage as any[]
      message.push(t('ERROR_SELECT_ROLE'))
      setErrorMessage(message)
      setOpenError(true)
      setShowLoading(false)
    }
    const id = GetUrlParam('id')
    if (id === '') {
      let emails: string[]
      emails = []
      let i = 0
      userEmailsList.forEach(function (item: UserEmail) {
        emails[i] = item.Email
        i++
      })
      if (emails.length === 0) {
        if (userEmail != '') {
          emails[0] = userEmail
        }
      }
      if (emails.length === 0) {
        const message = errorMessage as any[]
        message.push(t('ERROR_SELECT_EMAIL'))
        setErrorMessage(message)
        setOpenError(true)
        setShowLoading(false)
      }
      if (emails.length === 0 || !role || role.length === 0) {
        return
      }
      const addUser = new InsertUserToOrganization(emails, GetUrlParam('organizationId'), role, GetUserToken(), getLanguage())
      return axiosInstance.post('webportal/OrganizationUser/AddUserToOrganization', addUser)
    } else {
      const updateUser = new UpdateUserInOrganizationRole(id, role, GetUserToken(), GetUrlParam('organizationId'))
      return axiosInstance.put('webportal/OrganizationUser/UpdateUserInOrganizationRole', updateUser)
    }
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
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  return (
    <Container component="main" maxWidth="xl">
      <Loading showLoading={showLoading} />
      <PageName title={t('ADD_USER_TO_ORGANIZATION_TITLE')} showBackButton={true} backButtonUrl={'/organization/user/?id=' + GetUrlParam('organizationId') + '&gototab=user'} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && <Paper>
        <AppBar position="static">
          <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
            <Tab label={t('ADD_USER_TO_ORGANIZATION_BATIC_INFORMATION')} {...a11yProps(0)} />
          </Tabs>
        </AppBar>
        <TabPanel value={valueTab} index={0}>
          <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
          <ValidatorForm className={classes.form}
            onSubmit={saveBasicData}>
            <Grid container spacing={2}>
              {id === '' && <Grid item xs={12}>
                <CustomTextValidator
                  label={t('ADD_USER_TO_ORGANIZTION_USER_EMAILS')}
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

              </Grid>}
              <Grid item xs={12}>
                <CustomSelect showSelectValue={false} label={t('ADD_USER_TO_ORGANIZATION_ROLE')} data={roleList.map((e: OrganizationRole) => {
                  return new SelectItem(e.roleId, t(e.roleIndentificator))
                })} selectValue={role} onChangeValue={handleChangeRole} id="role" multiple={true} />
              </Grid>
            </Grid>
            <SaveButtons showSaveButton={false} onSave={saveBasicData} backUrl={'/organization/user/?id=' + GetUrlParam('organizationId') + '&gototab=user'} />
          </ValidatorForm>
        </TabPanel>

      </Paper>
      }
    </Container>
  )
}
