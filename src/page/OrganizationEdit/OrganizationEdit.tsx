import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { useTranslation } from 'react-i18next'
import useStyles from './../../styles'
import _ from 'lodash'
import { Container, AppBar, Tabs, Tab, Paper, Button } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import a11yProps from '../../component/A11yProps/A11yProps'
import TabPanel from '../../component/TabPanel/TabPanel'
import { ValidatorForm } from 'react-material-ui-form-validator'
import CustomTable from '../../component/CustomTable/CustomTable'
import PageName from '../../component/PageName/PageName'
import GetUrlParam from '../../core/GetUrlParam'
import GetUserToken from '../../core/GetUserToken'
import { AddOrganization } from '../../WebModel/Organization/AddOrganization'
import { ContactInformation } from '../../WebModel/Shared/ContactInformation'
import { Address } from '../../WebModel/Shared/Address'
import { UpdateOrganization } from '../../WebModel/Organization/UpdateOrganization'
import CustomCheckBox from '../../component/CustomCheckBox/CustomCheckBox'
import PropTypes from 'prop-types'
import { GetCodeBookDefaultValue } from '../../core/GetCodeBookDefaultValue'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import OrganizationPermition from './../../WebModel/Shared/OrganizationPermition'
import SaveButtons from '../../component/SaveButtons/SaveButtons'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import Loading from '../../component/Loading/Loading'
import CustomTextValidator from '../../component/CustomTextValidator/CustomTextValidator'
import CodeBook from '../../component/CodeBook/CodeBook'
import { CodeBookItem } from '../../WebModel/Shared/CodeBookItem'
import SaveOrganizationSetting from '../../WebModel/Organization/SaveOrganizationSetting'
import { useHistory } from 'react-router'
import QuestionList from '../../component/QuestionList/QuestionList'
import { AddBankOfQuestion } from '../../WebModel/BankOfQuestion/AddBankOfQuestion'
import { UpdateBankOfQuestion } from '../../WebModel/BankOfQuestion/UpdateBankOfQuestion'
import { Link as ReactLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import OrganizationEditBaseSetting from './OrganizationEditBaseSetting'
import { AddStudyHour } from '../../WebModel/Organization/AddStudyHour'
import { UpdateStudyHour } from '../../WebModel/Organization/UpdateStudyHour'
import FileUpload from '../../component/FileUpload/FileUpload'
import FileUploader from '../../core/FileUploader'
import ColorDialog from '../../component/ColorDialog/ColorDialog'

export default function OrganizationEdit (props: any) {
  const [fileName, setFileName] = React.useState('')
  const [fileId, setFileId] = React.useState('')

  const { t } = useTranslation()
  const [course, setCourse] = React.useState([])
  const [bankOfQuestion, setBankOfQuestion] = React.useState([])
  const [certificate, setCertificate] = React.useState([])
  const classes = useStyles()
  const [valueTab, setValueTab] = React.useState(0)
  const [organizatioName, setOrganizationName] = React.useState('')
  const [organizationDescription, setOrganizationDescription] = React.useState('')
  const [sendInquiryCourse, setSendInquiryCourse] = React.useState(false)
  let { cbCountry, cbAddressType, tab } = props
  const [country, setCountry] = useState('')
  const [region, setRegion] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [countryContact, setCountryContact] = useState('')
  const [regionContact, setRegionContact] = useState('')
  const [cityContact, setCityContact] = useState('')
  const [streetContact, setStreetContact] = useState('')
  const [houseNumberContact, setHouseNumberContact] = useState('')
  const [zipCodeContact, setZipCodeContact] = useState('')
  const [branchInOrganization, setBranchInOrganization] = useState([])
  const [userInOrganization, setUserInOrganization] = useState([])
  const [contactEmail, setContactEmail] = React.useState('')
  const [contactPhone, setContactPhone] = React.useState('')
  const [contactWWW, setContactWWW] = React.useState('')
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  let goToTab = GetUrlParam('gototab')
  const [openError, setOpenError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState([])
  const [showLoading, setShowLoading] = React.useState(false)
  const [organizationDefaultPassword, setOrganizationDefaultPassword] = React.useState('')
  const [license, setLicense] = React.useState('')
  const [culture, setCulture] = React.useState('')
  const [cultureInsert, setCultureInsert] = React.useState('')
  const [detailUrlParams, setDetailUrlParams] = React.useState([])
  const history = useHistory()
  const [translateRole, setTranslateRole] = React.useState([])
  const [, setFormChange] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [questions, setQuestions] = React.useState([])
  const [urlElearning, setUrlElearning] = React.useState('')
  const [lessonLength, setLessonLength] = React.useState(0)
  const [baseUrl, setBaseUrl] = React.useState('')
  const [loginFacebook, setLoginFacebook] = React.useState(false)
  const [loginGoogle, setLoginGoogle] = React.useState(false)
  const [loginRegistration, setLoginRegistration] = React.useState(false)
  const [loginPasswordReset, setLoginPasswordReset] = React.useState(false)
  const [cbTime, setCbTime] = React.useState([])
  const [studyHour, setStudyHour] = React.useState([])
  const [background, setBackground] = React.useState('#3f51b5')
  const [textColor, setTextColor] = React.useState('#fff')
  const [changeFile, setChangeFile] = React.useState(false)
  const [files, setFiles] = React.useState([])
  const [useCustomSmtpServer, setUseCustomSmtpServer] = React.useState(false)
  const [smtpServerUrl, setSmtpServerUrl] = React.useState('')
  const [smtpServerUserName, setSmtpServerUserName] = React.useState('')
  const [smtpServerPassword, setSmtpServerPassword] = React.useState('')
  const [smtpServerPort, setSmtpServerPort] = React.useState('')
  const [sendMessage, setSendMessage] = React.useState([])
  const [studentGroup, setStudentGroup] = React.useState([])
  const [courseMaterial, setCourseMaterial] = React.useState([])
  const [googleApiToken, setGoogleApiToken] = React.useState('')

  const id = GetUrlParam('id')

  if (id === '') {
    goToTab = ''
  }
  const onUpload = (files: any) => {
    setChangeFile(false)
    setFiles(files)
  }

  const onChangeLicense = (e: any) => {
    setLicense(e.target.value)
    setFormChange(true)
  }
  const onChangeCulture = (e: any) => {
    setCulture(e.target.value)
    setFormChange(true)
  }

  const onChangeCultureInsert = (e: any) => {
    setCultureInsert(e.target.value)
    //  setFormChange(true)
  }

  const reloadUserInOrganization = async () => {
    setShowLoading(true)
    setValueTab(2)
    axiosInstance.get('webportal/OrganizationUser/GetAllUserInOrganization', {
      params: {
        accessToken: GetUserToken(),
        organizationId: id
      }
    }).then(function (response: any) {
      const users = [] as any
      const roleTranslate = translateRole as any

      response?.data?.data?.forEach(function (item: any) {
        users.push({
          id: item.id,
          fullName: item.fullName,
          userEmail: item.userEmail,
          userRole: item.userRole,
          userRoleIdentificator: item.userRole,
          hideActionButton: item.userRole.includes('ORGANIZATION_OWNER')
        })
      })
      setTranslateRole(roleTranslate)
      setUserInOrganization(users)
      setShowLoading(false)
    })
  }
  const reloadSetting = async () => {
    var getUrl = window.location
    var url = getUrl.protocol + '//' + getUrl.host + '/elearning/'
    setBaseUrl(url)
    setValueTab(6)
    setShowLoading(true)
    axiosInstance.get('webportal/Organization/GetOrganizationSetting', {
      params: {
        accessToken: GetUserToken(),
        organizationId: id
      }
    }).then(function (response: any) {
      setOrganizationDefaultPassword(response?.data?.data.userDefaultPassword)
      setLicense(response?.data?.data.licenseId)
      setShowLoading(false)
      setCulture(response?.data?.data?.defaultCulture)
      setUrlElearning(response?.data?.data?.elearningUrl?.replace(url, ''))
      setLoginPasswordReset(response?.data?.data?.passwordReset)
      setLoginRegistration(response?.data?.data?.registration)
      setLoginFacebook(response?.data?.data?.facebookLogin)
      setLoginGoogle(response?.data?.data?.googleLogin)
      setLessonLength(response?.data?.data?.lessonLength)
      setTextColor(response?.data?.data?.textColor || '#fff')
      setBackground(response?.data?.data?.backgroundColor || '#3f51b5')
      setFileId(response?.data?.data?.backgroundImage)
      setFileName(response?.data?.data?.originalFileName)
      setUseCustomSmtpServer(response?.data?.data?.useCustomSmtpServer)
      setSmtpServerUserName(response?.data?.data?.smtpServerUserName)
      setSmtpServerUrl(response?.data?.data?.smtpServerUrl)
      setSmtpServerPort(response?.data?.data?.smtpServerPort)
      setSmtpServerPassword(response?.data?.data?.smtpServerPassword)
      setGoogleApiToken(response?.data?.data?.googleApiToken)
    })
    realoadStudyHours()
  }
  const handleChangeBackgroundColor = (color: any) => {
    setBackground(color.hex)
  }
  const handleChangeTextColor = (color: any) => {
    setTextColor(color.hex)
  }
  const realoadStudyHours = async () => {
    axiosInstance.get('webportal/Organization/GetStudyHours', {
      params: {
        accessToken: GetUserToken(),
        organizationId: id
      }
    }).then(function (response: any) {
      setStudyHour(response?.data?.data)
    })
  }
  const realoadCertificate = async () => {
    setValueTab(7)
    setShowLoading(true)
    if (id !== '') {
      axiosInstance.get('webportal/Certificate/GetCertificateInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response: any) {
        setCertificate(response?.data?.data)
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }

  const realoadSendMessage = async () => {
    setValueTab(8)
    setShowLoading(true)
    if (id !== '') {
      axiosInstance.get('webportal/SendMessage/GetSendMessageInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response: any) {
        setSendMessage(response?.data?.data)
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }
  const realoadStudentGroup = async () => {
    setValueTab(9)
    setShowLoading(true)
    if (id !== '') {
      axiosInstance.get('webportal/StudentGroup/GetStudentGroupInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response: any) {
        setStudentGroup(response?.data?.data)
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }

  const realoadCourseMaterial = async () => {
    setValueTab(10)
    setShowLoading(true)
    if (id !== '') {
      axiosInstance.get('webportal/CourseMaterial/GetCourseMaterialInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response: any) {
        setCourseMaterial(response?.data?.data)
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }
  const realoadBankOfQuestion = async () => {
    setValueTab(4)
    setShowLoading(true)
    if (id !== '') {
      axiosInstance.get('webportal/BankOfQuestion/GetBankOfQuestionInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response: any) {
        setBankOfQuestion(response?.data?.data.filter((x: any) => x.isDefault === false))
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }

  const reloadCourse = async () => {
    setValueTab(3)
    setShowLoading(true)
    if (id !== '') {
      axiosInstance.get('webportal/Course/GetAllCourseInOrganization/', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response: any) {
        setCourse(response?.data?.data)
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }

  const reloadBranch = async () => {
    setValueTab(1)
    setShowLoading(true)
    if (id !== '') {
      axiosInstance.get('webportal/Branch/GetAllBranchInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response) {
        const org = [] as any
        let i = 0
        response?.data?.data?.filter((x: any) => x.isOnline === false).forEach(function (item: any) {
          const obj = {
            name: item.name,
            id: item.id,
            city: item.address.city,
            houseNumber: item.address.houseNumber,
            region: item.address.region,
            street: item.address.street,
            zipCode: item.address.zipCode,
            countryName: item.address.countryName
          }
          org[i] = obj
          i++
        })
        setBranchInOrganization(org)
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }

  const handleChangeContactEmail = (event: any) => {
    setFormChange(true)
    setContactEmail(event.target.value)
  }

  const handleChangeContactPhone = (event: any) => {
    setFormChange(true)
    setContactPhone(event.target.value)
  }

  const handleChangeContactWWW = (event: any) => {
    setFormChange(true)
    setContactWWW(event.target.value)
  }

  const handleChangeCountry = (e: any) => {
    setFormChange(true)
    setCountry(e.target.value)
  }

  const handleChangeStreet = (event: any) => {
    setFormChange(true)
    setStreet(event.target.value)
  }

  const handleChangeCity = (event: any) => {
    setFormChange(true)
    setCity(event.target.value)
  }

  const handleChangeRegion = (event: any) => {
    setFormChange(true)
    setRegion(event.target.value)
  }

  const handleChangeHouseNumber = (event: any) => {
    setFormChange(true)
    setHouseNumber(event.target.value)
  }

  const handleChangeZipCode = (event: any) => {
    setFormChange(true)
    setZipCode(event.target.value)
  }

  const handleChangeCountryContact = (e: any) => {
    setFormChange(true)
    setCountryContact(e.target.value)
  }

  const handleChangeStreetContact = (event: any) => {
    setStreetContact(event.target.value)
    setFormChange(true)
  }

  const handleChangeCityContact = (event: any) => {
    setCityContact(event.target.value)
    setFormChange(true)
  }

  const handleChangeRegionContact = (event: any) => {
    setRegionContact(event.target.value)
    setFormChange(true)
  }

  const handleChangeHouseNumberContact = (event: any) => {
    setFormChange(true)
    setHouseNumberContact(event.target.value)
  }

  const handleChangeZipCodeContact = (event: any) => {
    setFormChange(true)
    setZipCodeContact(event.target.value)
  }

  const handleChangeSendInquiryCourse = (event: any) => {
    setFormChange(true)
    setSendInquiryCourse(event.target.checked)
  }
  const handleChangeFacebook = (event: any) => {
    setFormChange(true)
    setLoginFacebook(event.target.checked)
  }
  const handleChangeLoginPasswordReset = (event: any) => {
    setFormChange(true)
    setLoginPasswordReset(event.target.checked)
  }
  const handleChangeLoginRegistration = (event: any) => {
    setFormChange(true)
    setLoginRegistration(event.target.checked)
  }
  const handleChangeGoogle = (event: any) => {
    setFormChange(true)
    setLoginGoogle(event.target.checked)
  }
  const handleChangeShowPassword = (event: any) => {
    setShowPassword(event.target.checked)
  }

  const handleChangeUseCustomSmtpServer = (event: any) => {
    setUseCustomSmtpServer(event.target.checked)
  }

  const handleChangeOrganizationName = (event: any) => {
    setFormChange(true)
    setOrganizationName(event.target.value)
  }
  const handleChangeOrganizationDefaultPassword = (event: any) => {
    setOrganizationDefaultPassword(event.target.value)
    setFormChange(true)
  }
  const handleChangeUrlElearning = (event: any) => {
    setUrlElearning(event.target.value)
    setFormChange(true)
  }
  const handleChangeLessonLength = (event: any) => {
    setLessonLength(event.target.value)
    setFormChange(true)
  }

  const handleChangeSmtpServerPassword = (event: any) => {
    setSmtpServerPassword(event.target.value)
    setFormChange(true)
  }
  const handleChangeSmtpServerPort = (event: any) => {
    setSmtpServerPort(event.target.value)
    setFormChange(true)
  }

  const handleChangeSmtpServerUserName = (event: any) => {
    setSmtpServerUserName(event.target.value)
    setFormChange(true)
  }
  const handleChangeGoogleApiToken = (event: any) => {
    setGoogleApiToken(event.target.value)
    setFormChange(true)
  }
  const handleChangeSmtpServerUrl = (event: any) => {
    setSmtpServerUrl(event.target.value)
    setFormChange(true)
  }

  const handleChangeOrganizationDescription = (event: any) => {
    setFormChange(true)
    setOrganizationDescription(event.target.value)
  }

  const handleChangeTab = (event: any, newValue: any) => {
    tab = ''
    if (valueTab === 0) {
      return save().then(function (response: any) {
        if (id === '') {
          history.push('/organization/editnew/?id=' + response.data.data)
        }
        showTab(newValue)
      })
        .catch((error: any) => {
          showErorr(error?.response?.data?.errors)
        })
    } else if (valueTab === 6) {
      saveSettingData().then(function (response: any) {
        if (response) {
          showTab(newValue)
          return true
        }
        return false
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
      history.push('/organization/edit/?id=' + GetUrlParam('id'))
    } else if (newValue === 1) {
      history.push('/organization/branch/?id=' + GetUrlParam('id') + '&gototab=branch')
      reloadBranch()
    } else if (newValue === 2) {
      history.push('/organization/branch/?id=' + GetUrlParam('id') + '&gototab=user')
      reloadUserInOrganization()
    } else if (newValue === 3) {
      history.push('/organization/branch/?id=' + GetUrlParam('id') + '&gototab=course')
      reloadCourse()
    } else if (newValue === 4) {
      history.push('/organization/branch/?id=' + GetUrlParam('id') + '&gototab=bankOfQuestion')
      realoadBankOfQuestion()
    } else if (newValue === 5) {
      history.push('/organization/branch/?id=' + GetUrlParam('id') + '&gototab=question')
      loadQuestions()
    } else if (newValue === 6) {
      history.push('/organization/branch/?id=' + GetUrlParam('id') + '&gototab=settings')
      reloadSetting()
    } else if (newValue === 7) {
      history.push('/organization/branch/?id=' + GetUrlParam('id') + '&gototab=cert')
      realoadCertificate()
    } else if (newValue === 8) {
      history.push('/organization/edit/?id=' + GetUrlParam('id') + '&gototab=message')
      realoadSendMessage()
    } else if (newValue === 9) {
      history.push('/organization/edit/?id=' + GetUrlParam('id') + '&gototab=studentgroup')
      realoadStudentGroup()
    } else if (newValue === 10) {
      history.push('/organization/edit/?id=' + GetUrlParam('id') + '&gototab=coursematerial')
      realoadCourseMaterial()
    }
    setValueTab(newValue)
  }

  const reloadBasicData = async () => {
    setShowLoading(true)
    if (cbAddressType?.length === 0 || cbAddressType?.length === undefined) {
      await axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_addresstype').then(function (response) {
        cbAddressType = response?.data?.data
      })
    }
    if (id !== '') {
      axiosInstance.get('webportal/Organization/GetOrganizationDetail', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response: any) {
        const cbRegisteredOfficeAddress = cbAddressType?.find((x: CodeBookItem) => x.systemIdentificator === 'RegisteredOfficeAddress')
        const cbBillingAddress = cbAddressType?.find((x: CodeBookItem) => x.systemIdentificator === 'BillingAddress')
        const cbRegisteredOfficeAddressId = _.get(cbRegisteredOfficeAddress, 'id', '')
        const cbBillingAddressId = _.get(cbBillingAddress, 'id', '')
        const address = response?.data?.data?.addresses
        const registeredOfficeAddress = address?.find((x: Address) => x.addressTypeId === cbRegisteredOfficeAddressId)
        const billingAddress = address?.find((x: Address) => x.addressTypeId === cbBillingAddressId)

        setCity(_.get(registeredOfficeAddress, 'city', ''))
        setHouseNumber(_.get(registeredOfficeAddress, 'houseNumber', ''))
        setRegion(_.get(registeredOfficeAddress, 'region', ''))
        setZipCode(_.get(registeredOfficeAddress, 'zipCode', ''))
        setCountry(_.get(registeredOfficeAddress, 'countryId', ''))
        setStreet(_.get(registeredOfficeAddress, 'street', ''))
        setCityContact(_.get(billingAddress, 'city', ''))
        setHouseNumberContact(_.get(billingAddress, 'houseNumber', ''))
        setRegionContact(_.get(billingAddress, 'region', ''))
        setZipCodeContact(_.get(billingAddress, 'zipCode', ''))
        setCountryContact(_.get(billingAddress, 'countryId', ''))
        setStreetContact(_.get(billingAddress, 'street', ''))
        setOrganizationName(response?.data?.data?.name)
        setOrganizationDescription(response?.data?.data?.description)
        setContactEmail(response?.data?.data?.contactInformation?.email)
        setContactPhone(response?.data?.data?.contactInformation?.phoneNumber)
        setContactWWW(response?.data?.data?.contactInformation?.www)
        setShowLoading(false)
      })
    } else {
      setShowLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_timetable').then(function (response) {
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
        setCbTime(tmp)
      })
      const cultureId = await GetCodeBookDefaultValue('cb_culture', [])
      setCulture(cultureId)
      setCultureInsert(cultureId)
      if (id === '') {
        setCountry(await GetCodeBookDefaultValue('cb_country', cbCountry))
        setCountryContact(await GetCodeBookDefaultValue('cb_country', cbCountry))
      }
      const permitions = await GetUserOrganizationRole(GetUserToken(), id, 'organization')
      setPermitions(permitions)

      if (goToTab === 'branch' || tab === 'branch') {
        reloadBranch()
        reloadBasicData()
      } else if (goToTab === 'course' || tab === 'course') {
        reloadCourse()
        reloadBasicData()
      } else if (goToTab === 'user' || tab === 'user') {
        reloadBasicData()
        reloadUserInOrganization()
      } else if (goToTab === 'bankOfQuestion' || tab === 'bankOfQuestion') {
        reloadBasicData()
        realoadBankOfQuestion()
      } else if (goToTab === 'settings' || tab === 'settings') {
        reloadBasicData()
        reloadSetting()
      } else if (goToTab === 'question' || tab === 'question') {
        loadQuestions()
        reloadBasicData()
      } else if (goToTab === 'cert' || tab === 'cert') {
        realoadCertificate()
        reloadBasicData()
      } else if (goToTab === 'message' || tab === 'message') {
        realoadSendMessage()
        reloadBasicData()
      } else if (goToTab === 'studentgroup' || tab === 'studentgroup') {
        realoadStudentGroup()
        reloadBasicData()
      } else if (goToTab === 'coursematerial' || tab === 'coursematerial') {
        realoadCourseMaterial()
        reloadBasicData()
      } else if (tab === 'base') {
        reloadBasicData()
      } else {
        reloadBasicData()
      }
    }
    fetchData()
  }, [tab])

  const saveSettingData = () => {
    setFormChange(false)
    const obj = new SaveOrganizationSetting(GetUserToken(), id, license, organizationDefaultPassword, culture, baseUrl + urlElearning, loginRegistration, loginGoogle, loginFacebook, loginPasswordReset, lessonLength, background, textColor,
      useCustomSmtpServer, smtpServerUrl, smtpServerPassword, smtpServerUserName, smtpServerPort, googleApiToken)
    return axiosInstance.put('webportal/Organization/SaveOrganizationSetting', obj).then(function () {
      if (files.length > 0) {
        FileUploader(files, id, 'organization').then(function () {
          return true
        })
      } else {
        return true
      }
    }).catch((error: any) => {
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

  const saveBasicDataSubmit = async () => {
    setShowLoading(true)
    setOpenError(false)
    return save().then(function (response: any) {
      if (id === '') {
        history.push('/organization/editnew/?id=' + response.data.data)
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
    setOpenError(false)
    return save().then(function (response: any) {
      const tmp = { id: response.data.data }
      const arr = detailUrlParams
      arr.push(tmp as never)
      setDetailUrlParams(arr)
      setShowLoading(false)

      return true
    })
      .catch((error: any) => {
        return showErorr(error?.response?.data?.errors)
      })
  }
  const save = () => {
    setFormChange(false)
    const addressOffice = cbAddressType.find((x: CodeBookItem) => x.systemIdentificator === 'RegisteredOfficeAddress')
    const addressOfficeId = _.get(addressOffice, 'id', '')

    const addressBilling = cbAddressType.find((x: CodeBookItem) => x.systemIdentificator === 'BillingAddress')
    const addressBillingId = _.get(addressBilling, 'id', '')
    const contactInformation = new ContactInformation(contactEmail, contactPhone, contactWWW)
    const addresses = []

    addresses.push(new Address(country, region, city, street, houseNumber, zipCode, addressOfficeId, cbCountry.find((x: CodeBookItem) => x.id === country).name))
    addresses.push(new Address(countryContact, regionContact, cityContact, streetContact, houseNumberContact, zipCodeContact, addressBillingId, cbCountry.find((x: CodeBookItem) => x.id === countryContact).name))
    if (id === '') {
      const obj = new AddOrganization(contactInformation, addresses, sendInquiryCourse, GetUserToken(), organizatioName, organizationDescription, cultureInsert)
      return axiosInstance.post('webportal/Organization/AddOrganization', obj)
    } else {
      const obj = new UpdateOrganization(id, contactInformation, addresses, sendInquiryCourse, GetUserToken(), organizatioName, organizationDescription)
      return axiosInstance.put('webportal/Organization/UpdateOrganization', obj)
    }
  }
  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenError(false)
  }

  const loadQuestions = () => {
    setValueTab(5)
    setShowLoading(true)
    axiosInstance.get('webportal/Question/GetQuestionInOrganization', {
      params: {
        accessToken: GetUserToken(),
        organizationId: GetUrlParam('id')
      }
    }).then(function (response: any) {
      setQuestions(response?.data?.data)
      setShowLoading(false)
    })
  }

  const addAction = (newData: any) => {
    const obj = new AddBankOfQuestion(newData.name, '', GetUrlParam('id'), GetUserToken())
    axiosInstance.post('webportal/BankOfQuestion/AddBankOfQuestion', obj).then(function () {
      realoadBankOfQuestion()
    })
  }

  const addStudyHourAction = (newData: any) => {
    const obj = new AddStudyHour(id, newData.activeFromId, newData.activeToId, newData.position, GetUserToken(), lessonLength)
    axiosInstance.post('webportal/Organization/AddStudyHours', obj).then(function () {
      realoadStudyHours()
    })
  }
  const updateStudyAction = (oldData: any, newData: any) => {
    const obj = new UpdateStudyHour(oldData.id, id, newData.activeFromId, newData.activeToId, newData.position, GetUserToken())
    axiosInstance.put('webportal/Organization/UpdateStudyHours', obj).then(function () {
      realoadStudyHours()
    })
  }

  const updateAction = (oldData: any, newData: any) => {
    const obj = new UpdateBankOfQuestion(oldData.id, newData.name, '', GetUserToken())
    axiosInstance.put('webportal/BankOfQuestion/UpdateBankOfQuestion', obj).then(function () {
      realoadBankOfQuestion()
    })
  }

  return (
    <Container component="main" maxWidth="xl">
      <Loading showLoading={showLoading} />
      {valueTab === -1 &&
        <PageName title="" showBackButton={true} backButtonUrl="/organization/list" />}
      {valueTab === 0 &&
        <PageName title={t('ORGANIZATION_TITLE_EDIT') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      {valueTab === 1 &&
        <PageName title={t('ORGANIZATION_TITLE_BRANCH') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      {valueTab === 2 &&
        <PageName title={t('ORGANIZATION_TITLE_USERS') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={false} />}
      {valueTab === 3 &&
        <PageName title={t('ORGANIZATION_TITLE_COURSE') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      {valueTab === 4 &&
        <PageName title={t('ORGANIZATION_TITLE_BANK_OF_QUESTION') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      {valueTab === 5 &&
        <PageName title={t('ORGANIZATION_TITLE_QUESTION') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      {valueTab === 6 &&
        <PageName title={t('ORGANIZATION_TITLE_SETTING') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={false} />}
      {valueTab === 7 &&
        <PageName title={t('ORGANIZATION_CERTIFICATE') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      {valueTab === 8 &&
        <PageName title={t('ORGANIZATION_SEND_MESSAGES') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      {valueTab === 9 &&
        <PageName title={t('ORGANIZATION_SEND_STUDENT_GROUP') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      {valueTab === 10 &&
        <PageName title={t('ORGANIZATION_COURSE_MATERIAL') + ' - ' + organizatioName} showBackButton={window.localStorage.getItem('organizationId') === ''} backButtonUrl="/organization/list" organizationId={GetUrlParam('id')} showChangeCulture={true} />}
      <Paper>
        <CustomAlert open={openError} onClose={handleClose} severity="error" message={errorMessage} />

        <AppBar position="static">
          <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
            <Tab label={t('ORGANIZATION_TAB_BASIC_INFORMATION')} {...a11yProps(0)} disabled={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_TAB_BRANCH')} {...a11yProps(1)} disabled={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_TAB_USERS')} {...a11yProps(2)} disabled={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_COURSE')} {...a11yProps(3)} />
            <Tab label={t('ORGANIZATION_BANK_OF_QUESTION')} {...a11yProps(4)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_TITLE_QUESTION')} {...a11yProps(5)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_SETTING')} {...a11yProps(6)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_CERTIFICATE')} {...a11yProps(7)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_SEND_MESSAGES')} {...a11yProps(8)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_SEND_STUDENT_GROUP')} {...a11yProps(9)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) ? classes.dn : ''} />
            <Tab label={t('ORGANIZATION_COURSE_MATERIAL')} {...a11yProps(10)} className={!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) ? classes.dn : ''} />
          </Tabs>
        </AppBar>
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
          <TabPanel value={valueTab} index={0}>

            <ValidatorForm className={classes.form} onSubmit={saveBasicDataSubmit}>
              <OrganizationEditBaseSetting
                handleChangeOrganizationName={handleChangeOrganizationName}
                organizatioName={organizatioName}
                handleChangeOrganizationDescription={handleChangeOrganizationDescription}
                organizationDescription={organizationDescription}
                handleChangeSendInquiryCourse={handleChangeSendInquiryCourse}
                sendInquiryCourse={sendInquiryCourse}
                id={id}
                cultureInsert={cultureInsert}
                onChangeCultureInsert={onChangeCultureInsert}
                country={country}
                handleChangeCountry={handleChangeCountry}
                region={region}
                handleChangeRegion={handleChangeRegion}
                city={city}
                handleChangeCity={handleChangeCity}
                street={street}
                handleChangeStreet={handleChangeStreet}
                houseNumber={houseNumber}
                handleChangeHouseNumber={handleChangeHouseNumber}
                zipCode={zipCode}
                handleChangeZipCode={handleChangeZipCode}
                cbCountry={cbCountry}
                countryContact={countryContact}
                handleChangeCountryContact={handleChangeCountryContact}
                regionContact={regionContact}
                handleChangeRegionContact={handleChangeRegionContact}
                cityContact={cityContact}
                handleChangeCityContact={handleChangeCityContact}
                streetContact={streetContact}
                handleChangeStreetContact={handleChangeStreetContact}
                houseNumberContact={houseNumberContact}
                handleChangeHouseNumberContact={handleChangeHouseNumberContact}
                zipCodeContact={zipCodeContact}
                handleChangeZipCodeContact={handleChangeZipCodeContact}
                handleChangeContactEmail={handleChangeContactEmail}
                contactEmail={contactEmail}
                handleChangeContactPhone={handleChangeContactPhone}
                contactPhone={contactPhone}
                handleChangeContactWWW={handleChangeContactWWW}
                contactWWW={contactWWW}

              />

              <SaveButtons onSave={saveBasicData} backUrl={window.localStorage.getItem('organizationId') === '' ? '/organization/list' : '/'} />
            </ValidatorForm>
          </TabPanel>
        }
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
          <TabPanel value={valueTab} index={1}>
            <CustomTable addLinkUri={'/branch/edit?organizationId=' + id} addLinkText={t('BRANCH_BUTTON_ADD')} columns={
              [{
                title: t('ORGANIZATION_BRANCH_NAME'),
                field: 'name',
                render: (rowData: any) =>

                  <Link component={ReactLink} to={'/branch/edit/' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('id')} variant="body2">
                    {rowData.name}
                  </Link>
              },
              { title: t('ORGANIZATION_BRANCH_CITY'), field: 'city' },
              { title: t('ORGANIZATION_BRANCH_HOUSE_NUMBER'), field: 'houseNumber' },
              { title: t('ORGANIZATION_BRANCH_REGION'), field: 'region' },
              { title: t('ORGANIZATION_BRANCH_STREET'), field: 'street' },
              { title: t('ORGANIZATION_BRANCH_ZIP_CODE'), field: 'zipCode' },
              { title: t('ORGANIZATION_BRANCH_COUNTRY_NAME'), field: 'countryName' }
              ]
            }
            id="branch"
            showAddButton={true}
            showEdit={true}
            showDelete={true}
            data={branchInOrganization}
            editLinkUri={'/branch/edit'}
            editParams={'organizationId=' + id}
            editLinkText={t('ORGANIZATION_BRANCH_EDIT')}
            deleteUrl={'webportal/Branch/DeleteBranch'}
            deleteDialogTitle={t('ORGANIZATION_BRACH_DELETE_TITLE')}
            deleteDialogContent={t('ORGANIZATION_BRANCH_DELETE_CONTENT')}
            deleteParamIdName={'branchId'}
            onReload={reloadBranch}
            replaceContent={'name'}
            deleteButtonText={t('ORGANIZATION_BRANCH_DELETE')}
            customActionButtons={
              [{ title: '', field: 'gotoclassroom', tabName: 'classroom', actionText: t('ORGANIZATION_SHOW_CLASS_ROOM'), show: true }]
            }
            />
          </TabPanel>
        }

        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
          <TabPanel value={valueTab} index={2}>
            <CustomTable addLinkUri={'/organization/adduser?organizationId=' + id} addLinkText={t('ORGANIZATION_ADD_USER')} columns={
              [
                {
                  title: t('ORGANIZATION_USER_EMAIL'),
                  field: 'userEmail',
                  render: (rowData: any) => <div>{rowData.hideActionButton === false && <Link component={ReactLink} to={'/organization/adduser' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('id')} variant="body2">
                    {rowData.userEmail}
                  </Link>}
                  {rowData.hideActionButton === true &&
                      rowData.userEmail
                  }
                  </div>

                },
                { title: t('ORGANIZATION_USER_FULL_NAME'), field: 'fullName' },
                { title: t('ORGANIZATION_USER_ROLE'), field: 'userRole' }
              ]
            }
            showAddButton={true}
            editParams={'organizationId=' + id}
            showEdit={true}
            showDelete={true}
            data={userInOrganization.map(function (e: any) {
              const roleNames = [] as any
              e.userRoleIdentificator.forEach(function (x: any) {
                roleNames.push(t(x))
              })
              e.userRole = roleNames.join()
              return e
            })}
            editLinkUri={'/organization/adduser'}
            editLinkText={t('ORGANIZATION_USER_EDIT')}
            deleteUrl={'webportal/OrganizationUser/DeleteUserFromOrganization'}
            deleteDialogTitle={t('ORGANIZATION_USER_DELETE_TITLE')}
            deleteDialogContent={t('ORGANIZATION_USER_DELETE_CONTENT')}
            deleteParamIdName={'userId'}
            onReload={reloadUserInOrganization}
            replaceContent={'fullName'}
            deleteButtonText={t('ORGANIZATION_USER_DELETE')}
            deleteParams={'organizationId=' + id}
            linkColumnName="userEmail"

            />
          </TabPanel>
        }
        <TabPanel value={valueTab} index={3}>
          <CustomTable addLinkUri={'/course/edit?organizationId=' + id} addLinkText={t('ORGANIZATION_COURSE_ADD')} columns={
            [{
              title: t('ORGANIZATION_COURSE_NAME'),
              field: 'name',
              render: (rowData: any) => <div>{(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator) && <Link component={ReactLink} to={'/course/edit' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('id')} variant="body2">
                {rowData.name}
              </Link>}
              {!(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator) &&
                  rowData.name
              }
              </div>
            }

            ]
          }
          showAddButton={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator)}
          showEdit={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator)}
          showDelete={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator)}
          data={course}
          editLinkUri={'/course/edit'}
          editLinkText={t('ORGANIZATION_COURSE_EDIT')}
          deleteUrl={'webportal/Course/DeleteCourse'}
          deleteDialogTitle={t('ORGANIZATION_COURSE_DELETE_TITLE')}
          deleteDialogContent={t('ORGANIZATION_COURSE_DELETE_CONTENT')}
          deleteParamIdName={'courseId'}
          onReload={reloadCourse}
          replaceContent={'name'}
          deleteButtonText={t('ORGANIZATION_COURSE_DELETE')}
          editParams={'organizationId=' + GetUrlParam('id')}
          customActionButtons={
            [{ title: '', field: 'gotocourseterm', tabName: 'courseterm', actionText: t('ORGANIZATION_SHOW_COURSE_TERM'), show: permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator },
              { title: '', field: 'gotomaterial', tabName: 'coursematerial', actionText: t('ORGANIZATION_SHOW_COURSE_MATERIAL'), show: permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor }]
          }
          linkColumnName="name"
          />
        </TabPanel>
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
          <TabPanel value={valueTab} index={4}>
            <CustomTable addLinkUri={'/bankofquestion/edit?organizationId=' + id} addLinkText={t('ORGANIZATION_BANK_OF_QUESTION_ADD')} columns={
              [{ title: t('ORGANIZATION_BANK_OF_QUESATION_NAME'), field: 'name' }]
            }
            editable={true}
            showAddButton={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor)}
            showEdit={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor)}
            showDelete={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor)}
            data={bankOfQuestion?.map(function (item: any) {
              if (item.isDefault) {
                item.name = item.name === 'DEFAULT_BANK_OF_QUESTION' ? t('DEFAULT_BANK_OF_QUESTION') : item.name
                item.showDelete = false
              }
              return item
            })}
            editLinkUri={'/bankofquestion/edit'}
            editLinkText={t('ORGANIZATION_BANK_OF_QUESTION_EDIT')}
            deleteUrl={'webportal/BankOfQuestion/DeleteBankOfQuestion'}
            deleteDialogTitle={t('ORGANIZATION_BANK_OF_QUESTION_DELETE_TITLE')}
            deleteDialogContent={t('ORGANIZATION_BANK_OF_QUESTION_DELETE_CONTENT')}
            deleteParamIdName={'bankOfQuestionId'}
            onReload={realoadBankOfQuestion}
            replaceContent={'name'}
            deleteButtonText={t('ORGANIZATION_BANK_OF_QUESTION_DELETE')}
            editParams={'organizationId=' + id}
            customActionButtons={
              [{ title: '', field: 'gotocquestion', tabName: 'questions', actionText: t('ORGANIZATION_SHOW_COURSE_BANK_OF_QUESTION_QUESTION'), show: true }]
            }
            linkColumnName="name"
            addAction={addAction}
            editAction={updateAction}
            />

          </TabPanel>}
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
          <TabPanel value={valueTab} index={5}>
            <QuestionList questions={questions} loadQuestions={loadQuestions} id={id} />

          </TabPanel>}
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
          <TabPanel value={valueTab} index={6}>
            <ValidatorForm className={classes.form} onSubmit={saveSettingData}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <CustomTextValidator
                    label={t('ORGANIZATION_SETTING_ORGANIZATION_PASSWORD')}
                    onChange={handleChangeOrganizationDefaultPassword}
                    name="organizationDefaultPassword"
                    value={organizationDefaultPassword}
                    variant="outlined"
                    fullWidth
                    id="organizationDefaultPassword"
                    validators={['required']}
                    errorMessages={[t('VALIDATION_REQUIRED')]}
                    type={showPassword ? 'text' : 'password'}
                  />
                </Grid>

                <Grid item xs={12}>
                  <CustomCheckBox checked={showPassword} onChange={handleChangeShowPassword} name="showPassowrd" label={t('SHOW_USER_PASSWORD')} />
                </Grid>

                <fieldset style={{ width: '100%' }} className={classes.formControl}>
                  <legend>{t('ORGANIZATION_SETTING_URL')}</legend>
                  <Grid container xs={12}>
                    <Grid item md={4} style={{ paddingTop: '16px', textAlign: 'right' }}>
                      {baseUrl}
                    </Grid>
                    <Grid item md={6}>
                      <CustomTextValidator

                        onChange={handleChangeUrlElearning}
                        name="urlElearning"
                        value={urlElearning}
                        variant="outlined"
                        fullWidth
                        id="urlElearning"
                        validators={['required']}
                        errorMessages={[t('VALIDATION_REQUIRED')]}
                        type="text"
                        style={{ width: '100%' }}
                      />
                    </Grid>
                    <Grid item md={2}>
                      <CopyToClipboard text={baseUrl + urlElearning}>
                        <Button fullWidth={true} variant="contained" color="primary" >{t('ORGANIZATION_SETTING_URL_COPY')}</Button>
                      </CopyToClipboard>
                    </Grid>
                  </Grid>
                </fieldset>
                <fieldset style={{ width: '100%' }} className={classes.formControl}>
                  <legend>{t('ORGANIZATION_SETTING_LOGIN')}</legend>
                  <Grid container xs={12}>
                    <CustomCheckBox onChange={handleChangeFacebook} checked={loginFacebook} name="loginFacebook" label={t('ORGANIZATION_SETTING_LOGIN_FACEBOOK')} />
                  </Grid>
                  <Grid container xs={12}>
                    <CustomCheckBox onChange={handleChangeGoogle} checked={loginGoogle} name="loginGoogle" label={t('ORGANIZATION_SETTING_LOGIN_GOOGLE')} />
                  </Grid>
                  <Grid container xs={12}>
                    <CustomCheckBox onChange={handleChangeLoginRegistration} checked={loginRegistration} name="loginRegistration" label={t('ORGANIZATION_SETTING_LOGIN_REGISTRATION')} />
                  </Grid>
                  <Grid container xs={12}>
                    <CustomCheckBox onChange={handleChangeLoginPasswordReset} checked={loginPasswordReset} name="loginPasswordReset" label={t('ORGANIZATION_SETTING_LOGIN_PASSWORD_RESET')} />
                  </Grid>
                </fieldset>

                <Grid item xs={12}>
                  <CodeBook codeBookIdentificator="cb_license" label={t('ORGANIZATION_SETTING_LICENSE')} id={'license'} value={license} onChange={onChangeLicense} autoTranslate={true} />
                </Grid>
                <Grid item xs={12}>
                  <CodeBook codeBookIdentificator="cb_culture" label={t('ORGANIZATION_DEFAULT_CULTURE')} id={'culture'} value={culture} onChange={onChangeCulture} autoTranslate={true} />
                </Grid>

                <Grid item xs={12}>
                  <fieldset style={{ width: '100%' }} className={classes.formControl}>
                    <legend>{t('ORGANIZATION_SETTING_BACKGROUND_COLOR')}</legend>
                    <Grid container>
                      <Grid item xs={6}>
                        {t('ORGANIZATION_SETTING_BACKGROUND_COLOR_PRIMARY')}
                      </Grid>
                      <Grid item xs={6}>
                        <ColorDialog color={background} onChangeComplete={handleChangeBackgroundColor} />
                      </Grid>
                      <Grid item xs={6}>
                        {t('ORGANIZATION_SETTING_TEXT_COLOR')}
                      </Grid>
                      <Grid item xs={6}>
                        <ColorDialog color={textColor} onChangeComplete={handleChangeTextColor} />
                      </Grid>
                      <Grid item xs={6}>
                        {t('ORGANIZATION_SETTING_BACKGROUND_IMAGE')}
                      </Grid>

                      <Grid item xs={6}>
                        <FileUpload onUpload={onUpload} fileName={fileName} fileId={fileId} parentId={id} operation="organization" changeFile={changeFile}
                          accept={'image/*'}
                        />
                      </Grid>
                    </Grid>
                  </fieldset>
                </Grid>
                <Grid item xs={12}>
                  <CustomTextValidator

                    onChange={handleChangeLessonLength}
                    name="lessonLength"
                    value={lessonLength}
                    variant="outlined"
                    fullWidth
                    id="lessonLength"
                    label={t('ORGANIZATION_SETTING_LESSON_LENGTH')}
                    type="number"
                    validators={['isGreaterThanZero']}
                    errorMessages={[t('VALIDATION_GREATER_THAN_ZERO')]}
                    InputProps={{ inputProps: { min: 0, step: 5 } }}
                  />

                </Grid>
                <CustomTable
                  title={t('ORGANIZATION_SETTING_LESSON_TIMING')}
                  addLinkText={t('ORGANIZATION_SETTING_LESSON_TIMING_ADD')} columns={
                    [
                      {
                        title: t('ORGANIZATION_SETTING_LESSON_TIMING_HOUR'), field: 'position', type: 'numeric', align: 'left', toolbarButtonAlignment: 'left', searchFieldAlignment: 'left', filtering: false
                      },
                      { title: t('ORGANIZATION_SETTING_LESSON_TIMING_FROM'), field: 'activeFromId', lookup: cbTime, filtering: false },
                      { title: t('ORGANIZATION_SETTING_LESSON_TIMING_TO'), field: 'activeToId', lookup: cbTime, filtering: false }
                    ]
                  }
                  editable={true}
                  showAddButton={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
                  showEdit={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
                  showDelete={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
                  data={studyHour}
                  editLinkText={t('ORGANIZATION_SETTING_LESSON_TIMING_EDIT')}
                  deleteUrl={'webportal/Organization/DeleteStudyHours'}
                  deleteDialogTitle={t('ORGANIZATION_BANK_OF_QUESTION_DELETE_TITLE')}
                  deleteDialogContent={t('ORGANIZATION_BANK_OF_QUESTION_DELETE_CONTENT')}
                  deleteParamIdName={'studyHourId'}
                  onReload={realoadStudyHours}
                  replaceContent={'name'}
                  deleteButtonText={t('ORGANIZATION_BANK_OF_QUESTION_DELETE')}
                  deleteParams={'organizationId=' + id}
                  addAction={addStudyHourAction}
                  editAction={updateStudyAction}
                />
                <Grid item xs={12}>
                  <CustomCheckBox checked={useCustomSmtpServer} onChange={handleChangeUseCustomSmtpServer} name="useCustomSmtpServer" label={t('ORGANIZATION_SETTING_USE_CUSTOM_SMTP_SERVER')} />
                </Grid>
                {useCustomSmtpServer &&
                  <Grid item xs={12}>
                    <CustomTextValidator
                      onChange={handleChangeSmtpServerUrl}
                      name="smtpServerUrl"
                      validators={['required']}
                      errorMessages={[t('VALIDATION_REQUIRED')]}
                      value={smtpServerUrl}
                      variant="outlined"
                      fullWidth
                      id="smtpServerUrl"
                      label={t('ORGANIZATION_SETTING_USE_CUSTOM_SMTP_SERVER_NAME')}
                    />
                  </Grid>
                }
                {useCustomSmtpServer &&
                  <Grid item xs={12}>
                    <CustomTextValidator
                      onChange={handleChangeSmtpServerUserName}
                      validators={['required']}
                      errorMessages={[t('VALIDATION_REQUIRED')]}
                      name="smtpServerUserName"
                      value={smtpServerUserName}
                      variant="outlined"
                      fullWidth
                      id="smtpServerUserName"
                      label={t('ORGANIZATION_SETTING_USE_CUSTOM_SMTP_SERVER_USER_NAME')}
                      type="email"
                    />
                  </Grid>
                }
                {useCustomSmtpServer &&
                  <Grid item xs={12}>
                    <CustomTextValidator
                      onChange={handleChangeSmtpServerPassword}
                      name="smtpServerPassword"
                      validators={['required']}
                      errorMessages={[t('VALIDATION_REQUIRED')]}
                      value={smtpServerPassword}
                      variant="outlined"
                      fullWidth
                      id="smtpServerPassword"
                      label={t('ORGANIZATION_SETTING_USE_CUSTOM_SMTP_SERVER_PASSWORD')}
                      type="password"
                    />
                  </Grid>
                }
                {useCustomSmtpServer &&
                  <Grid item xs={12}>
                    <CustomTextValidator
                      onChange={handleChangeSmtpServerPort}
                      name="smtpServerPort"
                      validators={['required']}
                      errorMessages={[t('VALIDATION_REQUIRED')]}
                      value={smtpServerPort}
                      variant="outlined"
                      fullWidth
                      id="smtpServerPort"
                      label={t('ORGANIZATION_SETTING_USE_CUSTOM_SMTP_SERVER_PORT')}
                      type="number"
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  </Grid>
                }
                <Grid item xs={12}>
                  <CustomTextValidator
                    onChange={handleChangeGoogleApiToken}
                    name="googleApiToken"
                    value={googleApiToken}
                    variant="outlined"
                    fullWidth
                    id="googleApiToken"
                    label={t('ORGANIZATION_SETTING_GOOGLE_OAUTH')}
                  />
                </Grid>

              </Grid>
              <SaveButtons onSave={saveSettingData} backUrl={window.localStorage.getItem('organizationId') === '' ? '/organization/list' : '/'} />
            </ValidatorForm>
          </TabPanel>}
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
          <TabPanel value={valueTab} index={7}>
            <CustomTable addLinkText={t('ORGANIZATION_CERTIFICATE_ADD')} columns={
              [{
                title: t('ORGANIZATION_CERTIFICATE_COL_NAME'),
                field: 'name',
                render: (rowData: any) =>

                  <Link component={ReactLink} to={'/certificateedit/' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('id')} variant="body2">
                    {rowData.name}
                  </Link>
              }
              ]

            }
            showAddButton={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            addLinkUri={'/certificateedit/?organizationId=' + id}
            showEdit={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            showDelete={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            editLinkUri={'/certificateedit'}
            editParams={'organizationId=' + id}
            editLinkText={t('ORGANIZATION_BANK_OF_QUESTION_EDIT')}
            deleteUrl={'webportal/Certificate/DeleteCertificate'}
            deleteDialogContent={t('ORGANIZATION_CERTIFICATE_DELETE_CONTENT')}
            deleteParamIdName={'certificateId'}
            onReload={realoadCertificate}
            data={certificate}
            replaceContent={'name'}
            deleteButtonText={t('ORGANIZATION_BANK_OF_QUESTION_DELETE')}
            />

          </TabPanel>}
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
          <TabPanel value={valueTab} index={8}>
            <CustomTable addLinkText={t('ORGANIZATION_SEND_MESSAGE_ADD')} columns={
              [{
                title: t('ORGANIZATION_SEND_MESSAGE_COL_NAME'),
                field: 'name',
                render: (rowData: any) =>

                  <Link component={ReactLink} to={'/sendmessageedit/' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('id')} variant="body2">
                    {rowData.name}
                  </Link>
              }
              ]

            }
            showAddButton={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            addLinkUri={'/sendmessageedit/?organizationId=' + id}
            showEdit={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            showDelete={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            editLinkUri={'/sendmessageedit'}
            editParams={'organizationId=' + id}
            editLinkText={t('ORGANIZATION_BANK_OF_QUESTION_EDIT')}
            deleteUrl={'webportal/SendMessage/DeleteSendMessage'}
            deleteDialogContent={t('ORGANIZATION_CERTIFICATE_DELETE_CONTENT')}
            deleteParamIdName={'sendMessageId'}
            onReload={realoadSendMessage}
            data={sendMessage}
            replaceContent={'name'}
            deleteButtonText={t('ORGANIZATION_BANK_OF_QUESTION_DELETE')}
            />
          </TabPanel>
        }
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) &&
          <TabPanel value={valueTab} index={9}>
            <CustomTable addLinkText={t('ORGANIZATION_STUDENT_GROUP_ADD')} columns={
              [{
                title: t('ORGANIZATION_STUDENT_GROUP_NAME'),
                field: 'name',
                render: (rowData: any) =>

                  <Link component={ReactLink} to={'/studentgroupedit/' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('id')} variant="body2">
                    {rowData.name}
                  </Link>
              }
              ]

            }
            showAddButton={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            addLinkUri={'/studentgroupedit/?organizationId=' + id}
            showEdit={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            showDelete={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator)}
            editLinkUri={'/studentgroupedit'}
            editParams={'organizationId=' + id}
            editLinkText={t('ORGANIZATION_BANK_OF_QUESTION_EDIT')}
            deleteUrl={'webportal/StudentGroup/DeleteStudentGroup'}
            deleteDialogContent={t('ORGANIZATION_CERTIFICATE_DELETE_CONTENT')}
            deleteParamIdName={'studentGroupId'}
            onReload={realoadStudentGroup}
            data={studentGroup}
            replaceContent={'name'}
            deleteButtonText={t('ORGANIZATION_BANK_OF_QUESTION_DELETE')}
            />
          </TabPanel>}
        {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) &&
          <TabPanel value={valueTab} index={10}>
            <CustomTable addLinkText={t('ORGANIZATION_COURSE_MATERIAL_ADD')} columns={
              [{
                title: t('ORGANIZATION_COURSE_MATERIAL_NAME'),
                field: 'name',
                render: (rowData: any) =>

                  <Link component={ReactLink} to={'/coursematerialedit/' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('id')} variant="body2">
                    {rowData.name}
                  </Link>
              }
              ]

            }
            showAddButton={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor)}
            addLinkUri={'/coursematerialedit/?organizationId=' + id}
            showEdit={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor)}
            showDelete={(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor)}
            editLinkUri={'/coursematerialedit'}
            editParams={'organizationId=' + id}
            editLinkText={t('ORGANIZATION_BANK_OF_QUESTION_EDIT')}
            deleteUrl={'webportal/CourseMaterial/DeleteCourseMaterial'}
            deleteDialogContent={t('ORGANIZATION_CERTIFICATE_DELETE_CONTENT')}
            deleteParamIdName={'courseMaterialId'}
            onReload={realoadCourseMaterial}
            data={courseMaterial}
            replaceContent={'name'}
            deleteButtonText={t('ORGANIZATION_BANK_OF_QUESTION_DELETE')}
            />
          </TabPanel>}
      </Paper>

    </Container>
  )
}
OrganizationEdit.prototype = {
  cbCountry: PropTypes.array,
  cbAddressType: PropTypes.array,
  tab: PropTypes.string
}
