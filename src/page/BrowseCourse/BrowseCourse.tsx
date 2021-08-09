import React, { useEffect } from 'react'
import { Container, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Checkbox, List, ListItem, ListItemIcon, TextField, Typography } from '@material-ui/core'
import Loading from '../../component/Loading/Loading'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import PageName from '../../component/PageName/PageName'
import { axiosInstance } from '../../axiosInstance'
import TreeView from '@material-ui/lab/TreeView'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TreeItem from '@material-ui/lab/TreeItem'
import useStyles from '../../styles'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router'
import _ from 'lodash'
import CustomAlert from '../../component/CustomAlert/CustomAlert'
import CustomStopWatch from '../../component/CustomStopWatch/CustomStopWatch'
import EvaluateQuestion from '../../WebModel/CourseTest/EvaluateQuestion'
import CourseMenu from '../../WebModel/Course/CourseMenu'
import EvaluateTest from '../../WebModel/CourseTest/EvaluateTest'
import StartTest from '../../WebModel/Course/StartTest'
import Question from '../../WebModel/CourseTest/Question'
import Answer from '../../WebModel/CourseTest/Answer'
import Link from '@material-ui/core/Link'
import FileUpload from '../../component/FileUpload/FileUpload'
import CustomTable from '../../component/CustomTable/CustomTable'
import { AddNoteType } from '../../WebModel/Note/AddNoteType'
import { UpdateNoteType } from '../../WebModel/Note/UpdateNoteType'
import CodeBook from '../../component/CodeBook/CodeBook'
import CustomHtmlEditor from '../../component/CustomHtmlEditor/CustomHtmlEditor'
import CustomDrawPanel from '../../component/CustomDrawPanel/CustomDrawPanel'
import { SaveTableAsNote } from '../../WebModel/Note/SaveTableAsNote'
import { AddChatItem } from '../../WebModel/Chat/AddChatItem'
import GetUserId from '../../core/GetUserId'
import ChatItem from '../../component/ChatItem/ChatItem'
import SendIcon from '@material-ui/icons/Send'

export default function BrowseCourse () {
  const { t } = useTranslation()
  const [showLoading, setShowLoading] = React.useState(false)
  const [html, setHtml] = React.useState('')
  const [name, setName] = React.useState('')
  const [templateIdentificator, setTemplateIdentificator] = React.useState('')
  const [type, setType] = React.useState('')
  const [image, setImage] = React.useState('')
  const [courseMenu, setCourseMenu] = React.useState([])
  const [slideIdList, setSlideIdList] = React.useState([])
  const [questions, setQuestions] = React.useState([])
  const [timeLimit, setTimeLimit] = React.useState(0)
  const couserId = GetUrlParam('courseId')
  const slideId = GetUrlParam('slideId')
  const classes = useStyles()
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const [userAnswers, setUserAnswers] = React.useState([] as any)
  const [runTest, setRunTest] = React.useState(false)
  const [showSlideId, setShowSlideId] = React.useState('')
  const [userTestId, setUserTestId] = React.useState('')
  const [showEvaluateTest, setShowEvaluateTest] = React.useState(false)
  const [checked, setChecked] = React.useState([] as any)
  const [powerPointFile, setPowerPointFile] = React.useState(false)
  const history = useHistory()
  const [automaticEvaluate, setAutomaticEvaluate] = React.useState(false)
  const [openTestInformation, setOpenTestInformation] = React.useState(false)
  const [openTestWasEnd, setOpenTestWasEnd] = React.useState(false)
  const [openCourseMenu, setOpenCourseMenu] = React.useState(false)
  const [youtube, setYoutube] = React.useState('')
  const [isSucess, setIsSucess] = React.useState(false)
  const [showCourseFinish, setShowCourseFinish] = React.useState(false)
  const [pdfCreated, setPdfCreated] = React.useState(false)
  const [certificatePdf, setCertificatePdf] = React.useState('')
  const [fileList, setFileList] = React.useState([])
  const [chatList, setChatList] = React.useState([])
  const [showFileList, setShowFileList] = React.useState(false)
  const [showChat, setShowChat] = React.useState(false)
  const [showAddNote, setShowAddNote] = React.useState(false)
  const [showTable, setShowTable] = React.useState(false)
  const [noteText, setNoteText] = React.useState('')
  const [noteName, setNoteName] = React.useState('')
  const [noteId, setNoteId] = React.useState('')
  const [dataTable, setDataTable] = React.useState('')
  const [courseMessage, setCouseMessage] = React.useState('')
  const [courseWithLector, setCourseWithLector] = React.useState(false)
  const [generateTestError, setGenerateTestError] = React.useState(false)

  const [, setScore] = React.useState(0)
  const [canRunTest, setCanRunTest] = React.useState(false)
  const prw = GetUrlParam('prw') === 'true'
  const [noteType, setNoteType] = React.useState('')
  const [noteTypeList, setNoteTypeList] = React.useState([])
  const [noteTypeValue, setNoteTypeValue] = React.useState('')
  function checkFocus () {
    /* if (runTest === true) {
      if (!document.hasFocus()) {

        clearInterval(refreshIntervalId);
        setOpenTestWasEnd(true);
        setRunTest(false);
      }
    } */
  }
  const startOnlineCourse = () => {
    axiosInstance.post('/webportal/Course/CreateLiveBroadcastEvent', {
      courseTermId: GetUrlParam('courseTermId'),
      userAccessToken: GetUserToken()
    })
  }
  const onUpdateTable = (img:any, e:any) => {
    setDataTable(img)
    axiosInstance.post('/webportal/Course/UpdateActualTable', {
      img: img,
      courseTermId: GetUrlParam('courseTermId'),
      userAccessToken: GetUserToken()
    })
  }
  const onUpdateTestManual = (img:any, e:any) => {
    const item = {
      QuestionId: e['data-questionId'],
      TextManualAnswer: img
    }
    const userAsnwerTmp = userAnswers as EvaluateQuestion[]
    const index = userAsnwerTmp.findIndex((x: EvaluateQuestion) => x.QuestionId === e['data-questionId'])
    if (index === -1) {
      userAsnwerTmp.push(item as never)
    } else {
      userAsnwerTmp[index].TextManualAnswer = item.TextManualAnswer
    };
    setUserAnswers(userAsnwerTmp)
  }
  const onChangeMessage = (e: any) => {
    setCouseMessage(e.target.value)
  }

  const sendMessage = () => {
    const obj = new AddChatItem(GetUserId(), GetUrlParam('courseTermId'), '', GetUserToken(), courseMessage)
    axiosInstance.post('/webportal/Chat/AddChatItem', obj).then(function (response:any) {
      setCouseMessage('')
    })
  }

  const handleChangeNoteType = (e: any) => {
    setNoteType(e.target.value)
    const item = noteTypeList.find((x: any) => x.id === e.target.value)
    setNoteTypeValue(_.get(item, 'systemIdentificator', ''))
  }
  const onChangeNoteName = (e:any) => {
    setNoteName(e.target.value)
    if (noteId === '') {
      const obj = new AddNoteType(noteText, noteType, showSlideId, GetUserToken(), e.target.value)
      axiosInstance.post('/webportal/Note/AddNote', obj).then(function (response:any) {
        setNoteId(response.data.data.data)
      })
    } else {
      const obj = new UpdateNoteType(noteText, noteId, GetUserToken(), e.target.value)
      axiosInstance.put('/webportal/Note/UpdateNote', obj)
    }
  }
  const onChangeNote = (content: any) => {
    setNoteText(content)
    if (noteId === '') {
      const obj = new AddNoteType(content, noteType, showSlideId, GetUserToken(), noteName)
      axiosInstance.post('/webportal/Note/AddNote', obj).then(function (response:any) {
        setNoteId(response.data.data.data)
      })
    } else {
      const obj = new UpdateNoteType(content, noteId, GetUserToken(), noteName)
      axiosInstance.put('/webportal/Note/UpdateNote', obj)
    }
  }

  const handleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenTestInformation(false)
  }
  const handleCloseGenerateTestError = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setGenerateTestError(false)
  }
  const handleCloseTestWasEnd = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenTestWasEnd(false)
  }

  const handleChangeTextAnswer = (e: any) => {
    const { questionid } = e.target.parentNode.parentNode.dataset
    const item = {
      QuestionId: questionid,
      TextAnswer: e.target.value
    }
    const userAsnwerTmp = userAnswers as EvaluateQuestion[]
    const index = userAsnwerTmp.findIndex((x: EvaluateQuestion) => x.QuestionId === questionid)
    if (index === -1) {
      userAsnwerTmp.push(item as never)
    } else {
      userAsnwerTmp[index].TextAnswer = item.TextAnswer
    };
    setUserAnswers(userAsnwerTmp)
  }
  const handleChangeSelectOneAnswer = (e: any) => {
    const questionId = e.target.getAttribute('name')
    const item = {
      QuestionId: questionId,
      AnswerId: [e.target.value]
    }
    const userAsnwerTmp = userAnswers as EvaluateQuestion[]
    const index = userAsnwerTmp.findIndex((x: EvaluateQuestion) => x.QuestionId === questionId)
    if (index === -1) {
      userAsnwerTmp.push(item as never)
    } else {
      userAsnwerTmp[index].AnswerId = item.AnswerId
    };
    setUserAnswers(userAsnwerTmp)
  }

  const onUpload = (files: any) => {

    // setChangeFile(false);
    // setFiles(files);

  }
  const addNote = () => {
    showSlide()
    if (showAddNote) {
      setShowAddNote(false)
    } else {
      setShowAddNote(true)
    }
  }
  const showAttchFiles = () => {
    showSlide()
    if (showFileList) {
      setShowFileList(false)
    } else {
      setShowFileList(true)
      axiosInstance.get('/webportal/CourseMaterial/GetFilesStudent', {
        params: {
          accessToken: GetUserToken(),
          courseId: GetUrlParam('courseId')

        }
      }).then(function (response) {
        setFileList(response.data.data)
      })
    }
  }

  const showChatList = () => {
    showSlide()

    if (showChat) {
      setShowChat(false)
    } else {
      setShowChat(true)
      setInterval(function () {
        axiosInstance.get('webportal/Chat/GetAllChatItem', {
          params: {
            accessToken: GetUserToken(),
            courseTermId: GetUrlParam('courseTermId')
          }
        }
        ).then(function (response:any) {
          setChatList(response.data.data)
        })
      }, 2000)
    }
  }

  const handleChangeSelectManyAnswer = (e: any) => {
    const { questionid } = e.target.parentNode.parentNode.dataset
    if (!questionid) return
    const value = e.target.value
    const userAsnwerTmp = userAnswers as EvaluateQuestion[]
    const index = userAsnwerTmp.findIndex((x: EvaluateQuestion) => x.QuestionId === questionid)
    const item = {
      QuestionId: questionid,
      AnswerId: [value]
    }
    if (index === -1) {
      userAsnwerTmp.push(item as never)
    } else {
      const tmpAns = userAsnwerTmp[index].AnswerId
      if (e.target.checked) {
        tmpAns[tmpAns.length] = value
      } else {
        const indexF = tmpAns.indexOf(value)
        if (indexF > -1) {
          tmpAns.splice(indexF, 1)
        }
      }
      userAsnwerTmp[index].AnswerId = tmpAns
    };
    setUserAnswers(userAsnwerTmp)
    const tmpChecked = checked
    if (!tmpChecked[value]) {
      tmpChecked[value] = true
    } else {
      tmpChecked[value] = !tmpChecked[value]
    }

    setChecked(tmpChecked)
  }
  const openItem = (event: any) => {
    let { type, itemid } = event.target.parentNode.parentNode.dataset
    setRunTest(false)
    setUserAnswers([])
    setChecked([])
    setShowEvaluateTest(false)
    setOpenTestWasEnd(false)
    setAutomaticEvaluate(false)
    setIsSucess(false)
    setScore(0)
    if (type === 'SUB_ITEM') {
      const item = courseMenu.find((x: CourseMenu) => x.id === itemid)
      const subItems = _.get(item, 'items', [])
      const subitem = subItems[0]
      itemid = _.get(subitem, 'id', '')
    }

    if (type === 'LAST_SLIDE') {
      finishCourse()
      return
    }
    goToSlide(itemid)
  }
  const goToSlide = (itemid: any) => {
    showSlide()
    if (itemid !== '') {
      setShowSlideId(itemid)
      const addPrw = prw ? '&prw=true' : ''
      history.push('/browsecourse?courseId=' + couserId + '&courseTermId=' + GetUrlParam('courseTermId') + '&courseStudentId=' + GetUrlParam('courseStudentId') + '&slideId=' + itemid + addPrw)
      setShowLoading(true)
      axiosInstance.get('webportal/Course/GoToSlide', {
        params: {
          accessToken: GetUserToken(),
          slideId: itemid,
          courseId: GetUrlParam('courseId')
        }
      }).then(function (response) {
        showData(response)
      })
    }
  }

  const sendTest = () => {
    const userAsnwerTmp = userAnswers
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i] as any
      const index = userAsnwerTmp.findIndex((x: any) => x.QuestionId === q.id)
      if (index === -1) {
        const item = {
          questionId: q.id
        }
        userAsnwerTmp.push(item as never)
      }
    }

    setUserAnswers(userAsnwerTmp)
    const obj = new EvaluateTest(userTestId, GetUserToken(), userAnswers, showSlideId)
    axiosInstance.put('webportal/Course/EvaluateTest', obj).then(function (response) {
      setShowEvaluateTest(true)
      setAutomaticEvaluate(response.data.data.isAutomatic)

      setIsSucess(response.data.data.isSucess)
      setScore(response.data.data.score)
      setOpenTestInformation(true)
      setRunTest(false)
    })
  }

  const startTest = () => {
    if (questions.length > 0) {
      const obj = new StartTest(showSlideId, GetUserToken(), GetUrlParam('courseId'))
      axiosInstance.put('webportal/Course/StartTest', obj).then(function (response) {
        setUserTestId(response.data.data)
      })
      setRunTest(true)
    } else {
      alert(questions.length)
      setGenerateTestError(true)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      axiosInstance.get('webportal/Course/GetCourseDetail', {
        params: {
          accessToken: GetUserToken(),
          courseId: GetUrlParam('courseId')
        }
      }).then(function (response: any) {
        setCourseWithLector(response?.data?.data?.courseWithLector)
      })
      axiosInstance.get('/shared/CodeBook/GetCodeBookItems/cb_notetype').then(function (response: any) {
        setNoteTypeList(response?.data?.data)
        setNoteTypeValue('')
        setNoteType(response?.data?.data?.find((x: any) => x.isDefault)?.id)
      })

      await axiosInstance.get('webportal/Course/GetCourseMenu', {
        params: {
          accessToken: GetUserToken(),
          courseId: couserId
        }
      }).then(function (response) {
        setCourseMenu(response?.data?.data.map(function (item: CourseMenu) {
          if (item.type === 'LAST_SLIDE') {
            item.name = t('LAST_SLIDE')
          }
          return item
        }))
      })

      await axiosInstance.get('webportal/Course/GetAllSlideId', {
        params: {
          accessToken: GetUserToken(),
          courseId: couserId
        }
      }).then(function (response) {
        setSlideIdList(response?.data?.data)
      })

      const permitions = await GetUserOrganizationRole(GetUserToken(), couserId, 'courseBrowse')
      setPermitions(permitions)

      if (slideId === '') {
        axiosInstance.get('webportal/Course/CourseMaterialBrowse', {
          params: {
            accessToken: GetUserToken(),
            courseId: couserId
          }
        }).then(function (response) {
          showData(response)
        })
      } else {
        setShowSlideId(slideId)
        axiosInstance.get('webportal/Course/GoToSlide', {
          params: {
            accessToken: GetUserToken(),
            slideId: slideId,
            courseId: GetUrlParam('courseId')
          }
        }).then(function (response) {
          showData(response)
        })
      }
    }

    fetchData()
  }, [])
  const saveTableToNote = () => {
    const obj = new SaveTableAsNote(GetUserToken(), dataTable, GetUrlParam('courseId'))
    axiosInstance.post('/webportal/Note/SaveTableAsNote', obj).then(function (response:any) {

    })
  }
  const savePrawPanel = (img:any) => {
    if (noteId === '') {
      const obj = new AddNoteType('', noteType, GetUrlParam('courseId'), GetUserToken(), noteName, img)
      axiosInstance.post('/webportal/Note/AddNoteImage', obj).then(function (response:any) {
        setNoteId(response.data.data.data)
      })
    } else {
      const obj = new UpdateNoteType('', noteId, GetUserToken(), noteName, img)
      axiosInstance.put('/webportal/Note/UpdateNoteImage', obj)
    }
  }
  const showData = (response: any) => {
    setHtml(response?.data?.data?.html)
    setName(response?.data?.data?.name)
    setTemplateIdentificator(response?.data?.data?.templateIdentificator)
    setType(response?.data?.data?.type)
    setImage(response?.data?.data?.imagePath)
    setQuestions(response?.data?.data?.questions)
    setTimeLimit(response?.data?.data?.timeLimit)
    setPowerPointFile(response?.data?.data?.powerPointFile)
    setShowSlideId(response?.data?.data?.slideId)
    setYoutube(response?.data?.data?.youtube)
    setCanRunTest(response?.data?.data?.canRunTest)
    setShowLoading(false)
  }
  const showMenu = () => {
    setOpenCourseMenu(!openCourseMenu)
  }
  const courseClose = () => {
    if (!prw) {
      history.push('/course/list')
    } else {
      window.close()
    }
  }
  const showOnlineTable = () => {
    showSlide()
    setShowTable(true)
    if (permitions.isStudent) {
      setInterval(function () {
        axiosInstance.get('webportal/Course/GetActualTable', {
          params: {
            userAccessToken: GetUserToken(),
            courseTermId: GetUrlParam('courseTermId')
          }
        }
        ).then(function (response:any) {
          setDataTable(response.data.data.data)
        })
      }, 3000)
    }
  }
  const showSlide = () => {
    setShowFileList(false)
    setShowAddNote(false)
    setShowTable(false)
    setShowChat(false)
  }
  const finishCourse = () => {
    if (disableNextButton() === true) {
      axiosInstance.get('webportal/Course/FinishCourse', {
        params: {
          accessToken: GetUserToken(),
          courseStudentId: GetUrlParam('courseStudentId'),
          courseId: GetUrlParam('courseId')
        }
      }).then(function (response) {
        setShowCourseFinish(true)
        setPdfCreated(response?.data?.data?.pdfCreated)
        setCertificatePdf(response?.data?.data?.certificatePdf)
      })
    }
  }

  const goToNextSlide = () => {
    setRunTest(false)
    setUserAnswers([])
    setChecked([])
    setShowEvaluateTest(false)
    setOpenTestWasEnd(false)
    setAutomaticEvaluate(false)
    setIsSucess(false)
    setScore(0)
    setOpenTestInformation(false)
    const tmp = slideIdList
    const index = tmp.findIndex((x: any) => x.id === showSlideId)
    const goToIndex = index + 1
    if (goToIndex <= tmp.length) {
      goToSlide(_.get(tmp[goToIndex], 'id', ''))
    }
  }
  const disableNextButton = () => {
    const tmp = slideIdList
    const index = tmp.findIndex((x: any) => x.id === showSlideId)
    const goToIndex = index + 2
    if (goToIndex < tmp.length) {
      return false
    }
    return true
  }
  const disablePrevButton = () => {
    const tmp = slideIdList
    const index = tmp.findIndex((x: any) => x.id === showSlideId)
    const goToIndex = index - 1
    if (goToIndex >= 0) {
      return false
    }
    return true
  }

  const goToPrevSlide = () => {
    setRunTest(false)
    setUserAnswers([])
    setChecked([])
    setShowEvaluateTest(false)
    setOpenTestWasEnd(false)
    setAutomaticEvaluate(false)
    setIsSucess(false)
    setScore(0)
    setOpenTestInformation(false)
    const tmp = slideIdList
    const index = tmp.findIndex((x: any) => x.id === showSlideId)
    const goToIndex = index - 1
    if (goToIndex >= 0) {
      goToSlide(_.get(tmp[goToIndex], 'id', ''))
    }
  }

  return (

    <Container component="main" maxWidth="xl">
      <Loading showLoading={showLoading} />
      <PageName title={name} />
      {!(permitions.isLector || permitions.isStudent || (prw && (permitions.isCourseAdministrator || permitions.isCourseEditor || permitions.isOrganizationAdministrator || permitions.isOrganizationOwner))) && !showLoading &&
        <AccessForbiden />
      }
      {(permitions.isLector || permitions.isStudent || (prw && (permitions.isCourseAdministrator || permitions.isCourseEditor || permitions.isOrganizationAdministrator || permitions.isOrganizationOwner))) &&
        <Grid container spacing={0}>
          {(runTest === false && openCourseMenu === true) &&
            <Grid item md={3} >

              <TreeView
                className={classes.rootCourseMenu}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={[_.get(courseMenu.find((x: CourseMenu) => x.items.find((y: CourseMenu) => y.id === slideId)), 'id', _.get(courseMenu[0], 'id', ''))]}
                defaultSelected={slideId}
              >
                {courseMenu.map((item: CourseMenu) => (
                  <TreeItem key={item.id} nodeId={item.id} label={item.name} data-itemId={item.id} data-type={item.type} onLabelClick={openItem}>
                    {item.items.map((item2: CourseMenu) => (
                      <TreeItem key={item2.id} nodeId={item2.id} label={item2.name} data-itemId={item2.id} data-type={item2.type} onLabelClick={openItem} >
                      </TreeItem>
                    ))}
                  </TreeItem>
                ))}

              </TreeView>
            </Grid>}
          <Grid item md={runTest || openCourseMenu === false ? 12 : 9} style={{ paddingBottom: '15px' }}>
            {showCourseFinish === false && <Grid container spacing={0}>
              {runTest === false &&
                <Grid container spacing={0}>

                  <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={showMenu}>{t('COURSE_SHOW_MENU')}</Button>
                  </Grid>
                  <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={goToPrevSlide} disabled={disablePrevButton()} >{t('COURSE_BACK')}</Button>
                  </Grid>
                  <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={goToNextSlide} disabled={disableNextButton()}>{t('COURSE_NEXT')}</Button>
                  </Grid>
                  <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={showAttchFiles} >{t('COURSE_FILES')}</Button>
                  </Grid>
                  <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={showChatList} >{t('COURSE_CHAT')}</Button>
                  </Grid>
                  <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={addNote} >{t('COURSE_ADD_NOTE')}</Button>
                  </Grid>
                  {courseWithLector &&
                  <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={showOnlineTable} >{t('COURSE_SHOW_TABLE')}</Button>
                  </Grid>
                  }
                  {showTable &&
                    <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                      <Button color="primary" variant="contained" onClick={saveTableToNote} >{t('COURSE_TABLE_SAVE_NOTE')}</Button>
                    </Grid>
                  }
                  {permitions.isLector &&
                    <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                      <Button color="primary" variant="contained" onClick={startOnlineCourse} >{t('COURSE_START_TEACH')}</Button>
                    </Grid>
                  }
                  {(showAddNote || showFileList || showTable || showChat) && <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={showSlide} >{t('COURSE_SHOW_SLIDE')}</Button>
                  </Grid>
                  }

                  {disableNextButton() === true && (type === 'COURSE_ITEM' || showEvaluateTest === true) && automaticEvaluate === true && isSucess && permitions.isStudent === true &&
                    <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                      <Button color="primary" variant="contained" onClick={finishCourse} >{t('FINISH_COURSE')}</Button>
                    </Grid>
                  }
                  {!(disableNextButton() === true && (type === 'COURSE_ITEM' || showEvaluateTest === true)) && <Grid item style={{ paddingRight: '10px', paddingBottom: '15px' }}>
                    <Button color="primary" variant="contained" onClick={courseClose} > {prw ? t('COURSE_CLOSE_PRW') : t('COURSE_CLOSE')}</Button>
                  </Grid>
                  }

                </Grid>

              }
              {showTable && <Grid container>
                {permitions.isLector &&
                <Grid item xs={12}>
                  <CustomDrawPanel filePath='' onUpdate={onUpdateTable} undoText={t('TABLE_UNDO_TEXT')} redoText={t('TABLE_REDO_TEXT')} saveText={t('TABLE_SAVE_IMAGE')} clearText={t('TABLE_CLEAR_IMAGE')} data={dataTable} />
                </Grid>
                }
                {permitions.isStudent && <Grid item xs={12}>
                  <img src={dataTable} />
                </Grid>
                }
              </Grid>
              }
              {showChat && <Grid item xs={12}>
                <Grid item xs={12}>
                  {chatList.map(function (item:any, key:any) {
                    return (<Grid item xs={12} key={key}>
                      <ChatItem text={item.text} isAuthor={item.isAuthor} fullName={item.fullName} date={item.date} id={item.id} answers={item.answers}/>
                    </Grid>

                    )
                  })}
                </Grid>
                <Grid container xs={12} style={{ paddingTop: '15px' }}>
                  <Grid item xs={10}>
                    <TextField
                      label={t('COURSE_MESSAGE')}
                      onChange={onChangeMessage}
                      name={'courseMessage'}
                      value={courseMessage}
                      variant="outlined"
                      fullWidth
                      multiline={true}
                      id='courseMessage'/>
                  </Grid>
                  <Grid item xs={2}>
                    <Button color="primary" variant="contained" onClick={sendMessage} title={t('SEND_MESSAGE')}>
                      <SendIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              }
              {showFileList &&
                <CustomTable columns={
                  [
                    {
                      title: t('COURSE_MATERIAL_FILE_NAME'),
                      field: 'originalFileName',
                      render: (rowData: any) => <Link href={rowData.url} target="blank" variant="body2">
                        {rowData.originalFileName}
                      </Link>
                    }

                  ]
                }
                showAddButton={false}
                showEdit={false}
                showDelete={false}
                data={fileList}

                />
              }
              {showAddNote &&
                <Grid container>
                  <CodeBook codeBookIdentificator='cb_notetype' label={t('NOTE_TYPE')} id='noteType' value={noteType} onChange={handleChangeNoteType} autoTranslate={true} data={noteTypeList} />
                  {(noteTypeValue === 'NOTE_TYPE_TEXT' || noteTypeValue === 'NOTE_TYPE_DRAW') &&
                  <Grid item xs={12}>
                    <TextField
                      label={t('NOTE_NAME')}
                      onChange={onChangeNoteName}
                      name={'noteName'}
                      value={noteName}
                      variant="outlined"
                      fullWidth
                      id='noteName'/>
                  </Grid>
                  }
                  {noteTypeValue === 'NOTE_TYPE_TEXT' &&

                    <Grid item xs={12}>
                      <CustomHtmlEditor content={noteText} onChangeContent={onChangeNote} />
                    </Grid>
                  }
                  {noteTypeValue === 'NOTE_TYPE_DRAW' && <Grid item xs={12}>
                    <CustomDrawPanel onSave={savePrawPanel} filePath='' undoText={t('TABLE_UNDO_TEXT')} redoText={t('TABLE_REDO_TEXT')} saveText={t('TABLE_SAVE_IMAGE')} clearText={t('TABLE_CLEAR_IMAGE')} />
                  </Grid>}
                </Grid>
              }

              {!showAddNote && !showFileList && !showTable && !showChat && <Grid item xl={12}>
                {type === 'COURSE_ITEM' && templateIdentificator === 'BASIC_TEMPLATE' &&
                <Grid item xl={12}>
                  {parse(html)}
                </Grid>
                }

                {type === 'COURSE_ITEM_POWER_POINT' &&
                <Grid item xl={12} style={{ width: '100%' }}>
                  <iframe src={'https://view.officeapps.live.com/op/embed.aspx?src=' + powerPointFile} width='100%' style={{
                    height: '100vh'
                  }} frameBorder='0' />
                </Grid>
                }
                {type === 'COURSE_ITEM' && templateIdentificator === 'BASIC_TEMPLATE_IMAGE' &&
                <Grid item xl={12}>
                  <img src={image} className={classes.img} />
                </Grid>
                }
                {type === 'COURSE_ITEM' && templateIdentificator === 'YOUTUBE' &&
                <Grid item xl={12}>

                  {youtube !== null && parse(youtube)}
                </Grid>
                }
                {type === 'COURSE_ITEM' && templateIdentificator === 'VIDEO' &&
                <Grid item xl={12}>
                  <video controls width='100%' style={{
                    height: '100vh'
                  }}>
                    <source src={image} type="video/mp4" />
                    <source src={image} type="video/ogg" />

                  </video>
                </Grid>
                }
                {type === 'COURSE_ITEM' && templateIdentificator === 'AUDIO' &&
                <Grid item xl={12}>
                  <audio controls>
                    <source src={image} type="audio/mpeg" />
                    <source src={image} type="audio/ogg" />

                  </audio>
                </Grid>
                }
                {type === 'COURSE_TEST' && prw &&
                t('COURSE_TEST_PRW')
                }
                {type === 'COURSE_TEST' && !prw &&

                <Grid container spacing={0}>
                  {<CustomAlert message={[t('TEST_WAS_END')]} severity="info" open={openTestWasEnd && !showEvaluateTest} onClose={handleCloseTestWasEnd} />}
                  <CustomAlert message={[t('GENERATE_TEST_ERROR')]} severity="info" open={generateTestError} onClose={handleCloseGenerateTestError} />
                  {runTest === false && showEvaluateTest === false && canRunTest === true && <Button color="primary" variant="contained" onClick={startTest}>
                    {t('START_TEST')}
                  </Button>}
                  {(runTest === true || showEvaluateTest === true) && <Grid container spacing={0}>
                    {showEvaluateTest === false && timeLimit > 0 && <Grid container spacing={0}>
                      {t('COURSE_TEST_TIME_LEFT')} <CustomStopWatch time={timeLimit} endTest={sendTest} />
                    </Grid>
                    }
                    {automaticEvaluate === false &&
                      <CustomAlert message={[t('TEST_WAS_SEND')]} severity="info" open={openTestInformation} onClose={handleClose} />
                    }
                    {automaticEvaluate === true && isSucess &&
                      <CustomAlert message={[t('TEST_IS_SUCESS')]} severity="info" open={openTestInformation} onClose={handleClose} />
                    }
                    {automaticEvaluate === true && !isSucess &&
                      <CustomAlert message={[t('TEST_IS_NOT_SUCESS')]} severity="info" open={openTestInformation} onClose={handleClose} />
                    }

                    <br />

                    {questions.map((e: Question, kq:any) => {
                      return (
                        <Grid container spacing={0} key={kq}>
                          <FormControl component="fieldset" fullWidth={true}>
                            <Grid container spacing={2}>

                              {e.questionMode === 'TEXT_QUESTION' &&
                                <Grid item xs={12}>
                                  <FormLabel component="legend">
                                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>{e.question}</Typography>
                                  </FormLabel>
                                </Grid>
                              }
                              {e.questionMode === 'IMAGE_QUESTION' && <Grid item xs={12}>
                                <FormLabel component="legend">
                                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>{e.question}</Typography>
                                </FormLabel> <br />
                                <img src={e.filePath} style={{ maxWidth: '200px' }} />
                              </Grid>}
                              {e.questionMode === 'VIDEO_QUESTION' && <Grid item xs={12}>
                                <FormLabel component="legend">
                                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>{e.question}</Typography>
                                </FormLabel><br />
                                <video controls style={{ maxWidth: '100%' }}>
                                  <source src={e.filePath} type="video/mp4" />
                                  <source src={e.filePath} type="video/ogg" />

                                </video>
                              </Grid>}
                              {e.questionMode === 'AUDIO_QUESTION' && <Grid item xs={12}>
                                <FormLabel component="legend">
                                  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>{e.question}</Typography>
                                </FormLabel><br />
                                <audio controls style={{ maxWidth: '100%' }}>
                                  <source src={e.filePath} type="audio/mpeg" />
                                  <source src={e.filePath} type="audio/ogg" />

                                </audio>
                              </Grid>}

                            </Grid>
                            <Grid item xs={12}>
                              {e.answerMode === 'TEXT' && <TextField
                                data-questionId={e.id}
                                variant='outlined'
                                fullWidth
                                rows={5}
                                multiline={true}
                                onChange={handleChangeTextAnswer}
                                disabled={showEvaluateTest}
                              />
                              }
                              {e.answerMode === 'TEXT_MANUAL' && <CustomDrawPanel
                                data-questionId={e.id}
                                filePath =''
                                onUpdate={onUpdateTestManual}
                                disabled={showEvaluateTest}
                                undoText={t('TABLE_UNDO_TEXT')} redoText={t('TABLE_REDO_TEXT')} saveText={t('TABLE_SAVE_IMAGE')} clearText={t('TABLE_CLEAR_IMAGE')}
                              />
                              }
                              {e.answerMode === 'FILE_UPLOAD' &&
                                <FileUpload onUpload={onUpload} operation="studentAnswer" data-questionId={e.id} />
                              }
                              {(e.answerMode === 'SELECT_ONE' || e.answerMode === 'YES_NO_TRUE_YES' || e.answerMode === 'YES_NO_TRUE_NO' || e.answerMode === 'SELECT_ONE_IMAGE' || e.answerMode === 'SELECT_ONE_VIDEO' || e.answerMode === 'SELECT_ONE_IMAGE' || e.answerMode === 'SELECT_ONE_AUDIO') &&
                                <RadioGroup aria-label={e.question} name={e.id} onChange={handleChangeSelectOneAnswer}>
                                  <Grid container spacing={2}>
                                    {e.answers.map((a: Answer, key:any) => {
                                      return (
                                        <Grid item xs={3} key={key}>
                                          {(e.answerMode === 'SELECT_ONE' || e.answerMode === 'YES_NO_TRUE_YES' || e.answerMode === 'YES_NO_TRUE_NO') && <FormControlLabel value={a.id} control={<Radio disabled={showEvaluateTest} />} label={(e.answerMode === 'YES_NO_TRUE_YES' || e.answerMode === 'YES_NO_TRUE_NO') ? t(a.answer) : t(a.answer)} />}
                                          {(e.answerMode === 'SELECT_ONE_IMAGE') && <FormControlLabel value={a.id} control={<Radio disabled={showEvaluateTest} />} label={<img src={a.filePath} style={{ maxWidth: '200px' }} />} />}
                                          {(e.answerMode === 'SELECT_ONE_VIDEO') && <FormControlLabel value={a.id} control={<Radio disabled={showEvaluateTest} />} label={
                                            <video controls style={{ maxWidth: '100%' }} >
                                              <source src={a.filePath} type="video/mp4" />
                                              <source src={a.filePath} type="video/ogg" />

                                            </video>

                                          } />}
                                          {(e.answerMode === 'SELECT_ONE_AUDIO') && <FormControlLabel value={a.id} control={<Radio disabled={showEvaluateTest} />} label={<audio controls style={{ maxWidth: '200px' }}>
                                            <source src={a.filePath} type="audio/mpeg" />
                                            <source src={a.filePath} type="audio/ogg" />

                                          </audio>} />}
                                        </Grid>
                                      )
                                    })}
                                  </Grid>
                                </RadioGroup>

                              }
                              {(e.answerMode === 'SELECT_MANY' || e.answerMode === 'SELECT_MANY_IMAGE' || e.answerMode === 'SELECT_MANY_VIDEO' || e.answerMode === 'SELECT_MANY_AUDIO') && <List className={classes.manyAnswers}>
                                {e.answers.map((x: Answer) => {
                                  const value = x.id
                                  const labelId = `checkbox-list-label-${value}`
                                  return (
                                    <ListItem key={value} role={undefined} dense button onClick={handleChangeSelectManyAnswer} disabled={showEvaluateTest}>
                                      <ListItemIcon>
                                        {e.answerMode === 'SELECT_MANY' && <FormControlLabel
                                          control={
                                            <Checkbox
                                              data-questionId={e.id}
                                              edge="start"
                                              tabIndex={-1}
                                              disableRipple
                                              aria-label={labelId}
                                              value={value}
                                              disabled={showEvaluateTest}
                                              checked={checked[x.id]}
                                            />}
                                          label={x.answer}
                                        />}
                                        {e.answerMode === 'SELECT_MANY_IMAGE' && <FormControlLabel
                                          control={
                                            <Checkbox
                                              data-questionId={e.id}
                                              edge="start"
                                              tabIndex={-1}
                                              disableRipple
                                              aria-label={labelId}
                                              value={value}
                                              disabled={showEvaluateTest}
                                              checked={checked[x.id]}
                                            />}
                                          label={<img src={x.filePath} style={{ maxWidth: '200px' }} />}
                                        />}
                                        {e.answerMode === 'SELECT_MANY_VIDEO' && <FormControlLabel
                                          control={
                                            <Checkbox
                                              data-questionId={e.id}
                                              edge="start"
                                              tabIndex={-1}
                                              disableRipple
                                              aria-label={labelId}
                                              value={value}
                                              disabled={showEvaluateTest}
                                              checked={checked[x.id]}
                                            />}
                                          label={<video controls style={{ maxWidth: '100%' }}>
                                            <source src={x.filePath} type="video/mp4" />
                                            <source src={x.filePath} type="video/ogg" />

                                          </video>}
                                        />}
                                        {e.answerMode === 'SELECT_MANY_AUDIO' && <FormControlLabel
                                          control={
                                            <Checkbox
                                              data-questionId={e.id}
                                              edge="start"
                                              tabIndex={-1}
                                              disableRipple
                                              aria-label={labelId}
                                              value={value}
                                              disabled={showEvaluateTest}
                                              checked={checked[x.id]}
                                            />}
                                          label={<audio controls style={{ maxWidth: '100%' }}>
                                            <source src={x.filePath} type="audio/mpeg" />
                                            <source src={x.filePath} type="audio/ogg" />

                                          </audio>}
                                        />}

                                      </ListItemIcon>

                                    </ListItem>
                                  )
                                })}
                              </List>
                              }
                            </Grid><br />
                          </FormControl>
                        </Grid>)
                    })}
                    {showEvaluateTest === false &&

                      <Button color="primary" variant="contained" onClick={sendTest}>
                        {t('SEND_TEST')}
                      </Button>}

                  </Grid>}

                </Grid>
                }
              </Grid>}
            </Grid>
            }
            {showCourseFinish === true && <Grid container spacing={0}>
              {pdfCreated === true && <Link target="_blank" color="primary" href={certificatePdf}>{t('DOWLAND_CERTIFICATE_PDF')}</Link>}
            </Grid>
            }

          </Grid>
        </Grid>
      }
    </Container>
  )
}
