import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import _ from 'lodash'
import { Container, AppBar, Tabs, Tab, Paper } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import a11yProps from '../../component/A11yProps/A11yProps'
import TabPanel from '../../component/TabPanel/TabPanel'
import { ValidatorForm } from 'react-material-ui-form-validator'
import PropTypes from 'prop-types'
import CustomTable from '../../component/CustomTable/CustomTable'
import PageName from '../../component/PageName/PageName'
import ContactField from '../../component/ContactField/ContactField'
import GetUrlParam from '../../core/GetUrlParam'
import AddressField from '../../component/AddressField/AddressField'
import GetUserToken from '../../core/GetUserToken'
import { AddBranch } from '../../WebModel/Branch/AddBranch'
import { ContactInformation } from '../../WebModel/Shared/ContactInformation'
import { Address } from '../../WebModel/Shared/Address'
import { UpdateBranch } from '../../WebModel/Branch/UpdateBranch'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import { GetCodeBookDefaultValue } from '../../core/GetCodeBookDefaultValue'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import { CodeBookItem } from '../../WebModel/Shared/CodeBookItem'
import { useHistory } from 'react-router'
import { ClassRoomAdd } from '../../WebModel/ClassRoom/ClassRoomAdd'
import { ClassRoomUpdate } from '../../WebModel/ClassRoom/ClassRoomUpdate'
import { Link as ReactLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
export default function BranchEdit (props: any) {
  const { cbCountry } = props
  let { cbAddressType } = props
  let id = GetUrlParam('id')
  const { t } = useTranslation()
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(-1)
  const [branchName, setBranchName] = React.useState('')
  const [branchDescription, setBranchDescription] = React.useState('')
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [contactEmail, setContactEmail] = React.useState('')
  const [contactPhone, setContactPhone] = React.useState('')
  const [contactWWW, setContactWWW] = React.useState('')
  const [isMainBranch, setIsMainBranch] = React.useState(false)
  const [classRooms, setClassRooms] = React.useState([])
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(undefined, undefined, undefined, undefined, undefined, undefined))
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const goToTab = GetUrlParam('gototab')
  const [showLoading, setShowLoading] = React.useState(false)
  const history = useHistory()
  const handleChangeIsMainBranch = (event: any) => {
    setIsMainBranch(event.target.checked)
  }

  const handleChangeContactEmail = (event: any) => {
    setContactEmail(event.target.value)
  }

  const handleChangeContactPhone = (event: any) => {
    setContactPhone(event.target.value)
  }

  const handleChangeContactWWW = (event: any) => {
    setContactWWW(event.target.value)
  }

  const handleChangeCountry = (e: any) => {
    setCountry(e.target.value)
  }
  const handleChangeStreet = (event: any) => {
    setStreet(event.target.value)
  }
  const handleChangeCity = (event: any) => {
    setCity(event.target.value)
  }

  const handleChangeRegion = (event: any) => {
    setRegion(event.target.value)
  }
  const handleChangeHouseNumber = (event: any) => {
    setHouseNumber(event.target.value)
  }
  const handleChangeZipCode = (event: any) => {
    setZipCode(event.target.value)
  }

  const handleChangeBranchName = (event: any) => {
    setBranchName(event.target.value)
  }
  const handleChangeBrnachDescription = (event: any) => {
    setBranchDescription(event.target.value)
  }
  const handleChangeTab = async (event: any, newValue: any) => {
    if (valueTab === 0) {
      await save().then(function (response: any) {
        if (id === '') {
          history.push('/branch/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
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

  const showTab = (newValue:any) => {
    if (newValue === 0) {
      history.push('/branch/edit?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId'))
    }
    if (newValue === 1) {
      history.push('/branch/edit?id=' + GetUrlParam('id') + '&organizationId=' + GetUrlParam('organizationId') + '&gototab=classroom')
      reloadClassRoom()
    }
    setValueTab(newValue)
  }

  const reloadClassRoom = async () => {
    setShowLoading(true)
    setValueTab(1)
    await axiosInstance.get('webportal/ClassRoom/GetAllClassRoomInBranch', {
      params: {
        accessToken: GetUserToken(),
        branchId: id
      }
    }).then(function (response) {
      setClassRooms(response?.data?.data)
      setShowLoading(false)
    })
  }

  useEffect(() => {
    setShowLoading(true)
    const fetchData = async () => {
      const permitions = await GetUserOrganizationRole(GetUserToken(), id === '' ? GetUrlParam('organizationId') : id, id === '' ? 'organization' : 'branch')
      setPermitions(permitions)
      if (goToTab === 'classroom') {
        reloadClassRoom()
      }

      if (cbAddressType.length === 0 || cbAddressType.length === undefined) {
        await axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_addresstype').then(function (response) {
          cbAddressType = response?.data?.data
        })
      }

      if (id === '') {
        const coutryId = await GetCodeBookDefaultValue('cb_country', cbCountry)
        setCountry(coutryId)
        setValueTab(0)
        setShowLoading(false)
      } else {
        await axiosInstance.get('webportal/Branch/GetBranchDetail', {
          params: {
            accessToken: GetUserToken(),
            branchId: id
          }
        }).then(function (response: any) {
          const address = response?.data?.data?.address
          setCity(_.get(address, 'city', ''))
          setHouseNumber(_.get(address, 'houseNumber', ''))
          setRegion(_.get(address, 'region', ''))
          setZipCode(_.get(address, 'zipCode', ''))
          setCountry(_.get(address, 'countryId', ''))
          setStreet(_.get(address, 'street', ''))
          setBranchName(response?.data?.data?.name)
          setBranchDescription(response?.data?.data?.description)
          setContactEmail(response?.data?.data?.contactInformation?.email)
          setContactPhone(response?.data?.data?.contactInformation?.phoneNumber)
          setContactWWW(response?.data?.data?.contactInformation?.www)
          setIsMainBranch(response?.data?.data?.isMainBranch)
          if (goToTab === '') {
            setValueTab(0)
          }
          setShowLoading(false)
        })
      }
    }
    fetchData()
  }, [])

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
        history.push('/branch/editnew/?id=' + response.data.data + '&organizationId=' + GetUrlParam('organizationId'))
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
  const save = () => {
    const branchAddress = cbAddressType.find((x: CodeBookItem) => x.systemIdentificator === 'BRANCH_ADDRESS')
    const branchAddressId = _.get(branchAddress, 'id', '')
    const contactInformation = new ContactInformation(contactEmail, contactPhone, contactWWW)
    const adress = new Address(country, region, city, street, houseNumber, zipCode, branchAddressId, cbCountry.find((x: CodeBookItem) => x.id === country).name)
    if (id === '') {
      const addBranch = new AddBranch(contactInformation, adress, isMainBranch, GetUserToken(), branchName, branchDescription, GetUrlParam('organizationId'))
      return axiosInstance.post('webportal/Branch/AddBranch', addBranch)
    } else {
      const update = new UpdateBranch(contactInformation, adress, isMainBranch, GetUserToken(), branchName, branchDescription, id)
      return axiosInstance.put('webportal/Branch/UpdateBranch', update)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  const addAction = (newData: any) => {
    const obj = new ClassRoomAdd(newData.floor | 0, newData.maxCapacity | 0, newData.name, newData.description, GetUserToken(), GetUrlParam('id'))
    axiosInstance.post('webportal/ClassRoom/AddClassRoom', obj).then(function () {
      reloadClassRoom()
      return true
    }).catch((error: any) => {
      return showErorr(error?.response?.data?.errors)
    })
  }

  const updateAction = (oldData: any, newData: any) => {
    const obj = new ClassRoomUpdate(newData.floor, newData.maxCapacity, newData.name, newData.description, GetUserToken(), oldData.id)
    axiosInstance.put('webportal/ClassRoom/UpdateClassRoom', obj).then(function () {
      reloadClassRoom()
      return true
    }).catch((error: any) => {
      return showErorr(error?.response?.data?.errors)
    })
  }

  return (
    <Container component="main" maxWidth="xl">
      <Loading showLoading={showLoading} />
      <PageName title={t('BRANCH_TITLE_EDIT') + ' - ' + branchName} showBackButton={true} backButtonUrl={'/organization/branch/?id=' + GetUrlParam('organizationId') + '&gototab=branch'} organizationId={GetUrlParam('organizationId')} showChangeCulture={true} />
      {!(permitions.isOrganizationOwner === true || permitions.isOrganizationAdministrator === true) && !showLoading &&
        <AccessForbiden />
      }
      <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && <Paper>
        <AppBar position="static">
          <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
            <Tab label={t('BRANCH_TAB_BASIC_INFORMATION')} {...a11yProps(0)} />
            <Tab label={t('BRANCH_TAB_CLASSROOM')} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={valueTab} index={0}>

          <ValidatorForm className={classes.form}
            onSubmit={saveBasicDataSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>

                <CustomTextValidator
                  label={t('BRANCH_NAME')}
                  onChange={handleChangeBranchName}
                  name="branchName"
                  value={branchName}
                  variant="outlined"
                  fullWidth
                  id="branchName"
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextValidator
                  label={t('BRANCH_DESCRIPTION')}
                  onChange={handleChangeBrnachDescription}
                  name="branchDescription"
                  value={branchDescription}
                  variant="outlined"
                  fullWidth
                  id="branchDescription"
                  rows={5}
                  multiline={true}
                />

              </Grid>
              <Grid item xs={12}>
                <CustomCheckBox
                  checked={isMainBranch}
                  onChange={handleChangeIsMainBranch}
                  name="isMainBranch"
                  label={t('BRANCH_IS_MAIN_BRANCH')} />

              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography component="h1" variant="h5">
                    {t('BRANCH_ADDRESS')}
                  </Typography>
                </Grid>
                <AddressField idPrefix="" country={country} onChangeCountry={handleChangeCountry} region={region} onChangeRegion={handleChangeRegion}
                  city={city} onChangeCity={handleChangeCity} street={street} onChangeStreet={handleChangeStreet} houseNumber={houseNumber}
                  onChangeHouseNumber={handleChangeHouseNumber} zipCode={zipCode} onChangeZipCode={handleChangeZipCode} cbCountry={cbCountry} />
              </Grid>
              <Grid item xs={12}>
                <ContactField onChangeEmail={handleChangeContactEmail} email={contactEmail} onChangePhoneNumber={handleChangeContactPhone} phoneNumber={contactPhone}
                  onChangeWWW={handleChangeContactWWW} www={contactWWW}
                />
              </Grid>
            </Grid>
            <SaveButtons onSave={saveBasicData} backUrl={'/organization/branch/?id=' + GetUrlParam('organizationId') + '&gototab=branch'} />
          </ValidatorForm>
        </TabPanel>
        <TabPanel value={valueTab} index={1}>

          <Container component="main" maxWidth="xl">
            <CustomTable addLinkUri={'/classroom/edit?branchId=' + id} addLinkText={t('CLASSROOM_BUTTON_ADD')} columns={
              [
                {
                  title: t('BRANCH_CLASSROOM_NAME'),
                  field: 'name',
                  render: (rowData:any) => <Link component={ReactLink} to={'/classroom/edit/' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('organizationId') + '&branchId=' + GetUrlParam('id')} variant="body2">
                    {rowData.name}
                  </Link>
                },
                { title: t('BRANCH_CLASSROOM_DESCRIPTION'), field: 'description' },
                { title: t('BRANCH_CLASSROOM_FLOOR'), field: 'floor', type: 'numeric', emptyValue: 0 },
                { title: t('BRANCH_CLASSROOM_CAPACITY'), field: 'maxCapacity', type: 'numeric', emptyValue: 0 }

              ]
            }
            editable={true}
            showAddButton={true}
            editParams={'&branchId=' + id}
            showEdit={true}
            showDelete={true}
            data={classRooms}
            editLinkUri={'/classroom/edit'}
            editLinkText={t('BRANCH_CLASS_ROOM_EDIT')}
            deleteUrl={'webportal/ClassRoom/DeleteClassRoom'}
            deleteDialogTitle={t('BRANCH_CLASS_ROOM_DELETE_TITLE')}
            deleteDialogContent={t('BRANCH_CLASS_ROOM_DELETE_CONTENT')}
            deleteParamIdName={'classRoomId'}
            onReload={reloadClassRoom}
            replaceContent={'name'}
            deleteButtonText={t('BRANCH_CLASS_ROOM_DELETE')}
            linkColumnName="name"
            addAction={addAction}
            editAction={updateAction}
            />

          </Container>
        </TabPanel>
      </Paper>
      }

    </Container>
  )
}
BranchEdit.prototype = {
  cbCountry: PropTypes.array,
  cbAddressType: PropTypes.array
}
