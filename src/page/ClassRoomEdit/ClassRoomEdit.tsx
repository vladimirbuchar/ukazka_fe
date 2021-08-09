import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import { Container, AppBar, Tabs, Paper, Tab, TableCell, TableRow, TableContainer, Table, TableHead, TableBody } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import TabPanel from '../../component/TabPanel/TabPanel'
import { ValidatorForm } from 'react-material-ui-form-validator'
import PageName from '../../component/PageName/PageName'
import a11yProps from '../../component/A11yProps/A11yProps'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import { ClassRoomUpdate } from '../../WebModel/ClassRoom/ClassRoomUpdate'
import { ClassRoomAdd } from '../../WebModel/ClassRoom/ClassRoomAdd'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { useHistory } from 'react-router'
export default function BranchEdit () {
  let id = GetUrlParam('id')
  const { t } = useTranslation()
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(-1)
  const [classRoomName, setClassRoomName] = React.useState('')
  const [classRoomDescription, setClassRoomDescription] = React.useState('')
  const [floor, setFloor] = React.useState(0)
  const [maxCapacity, setMaxCapacity] = React.useState(0)
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const history = useHistory()
  const [myTimeTable, setMyTimeTable] = React.useState([])

  const handleChangeClassRoomName = (event: any) => {
    setClassRoomName(event.target.value)
  }
  const handleChangeClassRoomDescription = (event: any) => {
    setClassRoomDescription(event.target.value)
  }

  const handleChangeFloor = (event: any) => {
    setFloor(event.target.value)
  }
  const handleChangeMaxCapacity = (event: any) => {
    setMaxCapacity(event.target.value)
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('branchId') : id, id === '' ? 'branch' : 'classroom')
      setPermitions(permitions)
      if (id === '') {
        setValueTab(0)
        setShowLoading(false)
      } else {
        await axiosInstance.get('webportal/ClassRoom/GetClassRoomDetail', {
          params: {
            accessToken: GetUserToken(),
            classRoomId: id
          }
        }).then(function (response: any) {
          setClassRoomName(response?.data?.data?.name)
          setClassRoomDescription(response?.data?.data?.description)
          setFloor(response?.data?.data?.floor)
          setMaxCapacity(response?.data?.data?.maxCapacity)
          setValueTab(0)
          setShowLoading(false)
        })
        axiosInstance.get('/webportal/ClassRoom/GetClassRoomTimeTable', { params: { accessToken: GetUserToken(), classRoomId: GetUrlParam('id') } }).then(function (response) {
          const tmp = [] as any

          const studyHours = [] as any
          const timeTable = [] as any
          response?.data?.data?.studyHours?.forEach(function (x: any) {
            studyHours.push(<TableCell component="th" scope="row">{x.position}. ({x.activeFrom} - {x.activeTo})</TableCell>)
          })
          response?.data?.data?.timeTable?.forEach(function (y: any) {
            const courseName = [] as any
            y.courseTerm.forEach(function (z: any) {
              courseName.push(<TableCell component="th" scope="row">{z}</TableCell>)
            })
            timeTable.push(<TableRow >
              <TableCell component="th" scope="row">{t(y.dayOfWeek)}</TableCell>
              {courseName}

            </TableRow>)
          })
          const data = <Grid container spacing={0}>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>&nbsp;</TableCell>
                    {studyHours}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeTable}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>

          tmp.push(data)

          setMyTimeTable(tmp)
        })
      }
    }
    fetchData()
  }, [])

  const saveBasicDataSubmit = async () => {
    setShowLoading(true)
    setOpenError(false)
    return save().then(function (response: any) {
      if (id === '') {
        history.push('/classroom/editnew/?id=' + response.data.data + '&branchId=' + GetUrlParam('branchId'))
      }
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
    const token = GetUserToken()
    const branchId = GetUrlParam('branchId')
    if (id === '') {
      const obj = new ClassRoomAdd(floor, maxCapacity, classRoomName, classRoomDescription, token, branchId)
      return axiosInstance.post('webportal/ClassRoom/AddClassRoom', obj)
    } else {
      const obj = new ClassRoomUpdate(floor, maxCapacity, classRoomName, classRoomDescription, token, id)
      return axiosInstance.put('webportal/ClassRoom/UpdateClassRoom', obj)
    }
  }
  const handleChangeTab = async (event: any, newValue: any) => {
    if (valueTab === 0) {
      await save().then(function (response: any) {
        if (id === '') {
          history.push('/classroom/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
          id = response.data.data
        }
        showTab(newValue)
      })
        .catch((error: any) => {
          return showErorr(error?.response?.data?.errors)
        })
    } else {
      showTab(newValue)
    }
  }

  const showTab = (newValue: any) => {
    if (newValue === 0) {
      history.push('/classroom/edit?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId') + '&branchId=' + GetUrlParam('branchId'))
    }
    if (newValue === 1) {
      history.push('/classroom/edit?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId') + '&branchId=' + GetUrlParam('branchId') + '&gototab=timetable')
      // reloadClassRoom();
    }
    setValueTab(newValue)
  }

  return (
    <Container component="main" maxWidth="xl">
      <Loading showLoading={showLoading} />
      <PageName title={t('CLASS_ROOM_TITLE_EDIT') + ' - ' + classRoomName} showBackButton={true} backButtonUrl={'/branch/edit/?id=' + GetUrlParam('branchId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=classroom'} />
      {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && <Paper>
        <AppBar position="static">
          <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
            <Tab label={t('CLASS_ROOM_BASIC_DATA')} {...a11yProps(0)} />
            <Tab label={t('CLASS_ROOM_TIME_TABLE')} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={valueTab} index={0}>
          <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
          <ValidatorForm className={classes.form} onSubmit={saveBasicDataSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('CLASS_ROOM_NAME')}
                  onChange={handleChangeClassRoomName}
                  name="classRoomName"
                  value={classRoomName}
                  variant="outlined"
                  fullWidth
                  id="classRoomName"
                  validators={['required']}
                  errorMessages={[t('VALIDATION_REQUIRED')]}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('CLASS_ROOM_DESCRIPTION')}
                  onChange={handleChangeClassRoomDescription}
                  name="classRoomDescription"
                  value={classRoomDescription}
                  variant="outlined"
                  fullWidth
                  id="classRoomDescription"
                  rows={5}
                  multiline={true}
                />

              </Grid>

              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('CLASS_ROOM_FLOOR')}
                  onChange={handleChangeFloor}
                  name="floor"
                  value={floor}
                  variant="outlined"
                  fullWidth
                  id="floor"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('CLASS_ROOM_CAPACITY')}
                  onChange={handleChangeMaxCapacity}
                  name="maxCapacity"
                  value={maxCapacity}
                  variant="outlined"
                  fullWidth
                  id="maxCapacity"
                  validators={['isGreaterThanZero']}
                  errorMessages={[t('VALIDATION_GREATER_THAN_ZERO')]}
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
            </Grid>
            <SaveButtons onSave={saveBasicData} backUrl={'/branch/edit/?id=' + GetUrlParam('branchId') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=classroom'} />
          </ValidatorForm>
        </TabPanel>
        <TabPanel value={valueTab} index={1}>
          {myTimeTable}
        </TabPanel>
      </Paper>}
    </Container>
  )
}
