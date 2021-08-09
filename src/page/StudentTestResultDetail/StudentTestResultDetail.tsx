import React, { useEffect } from 'react'
import { Container, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper, Grid, Typography, Button, AppBar, Tabs, Tab } from '@material-ui/core'
import Loading from '../../component/Loading/Loading'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import AccessForbiden from '../../component/AccessForbiden/AccessForbiden'
import PageName from '../../component/PageName/PageName'
import { axiosInstance } from '../../axiosInstance'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import useStyles from '../../styles'
import parse from 'html-react-parser'
import { useTranslation } from 'react-i18next'
import CheckIcon from '@material-ui/icons/Check'
import TabPanel from '../../component/TabPanel/TabPanel'
import a11yProps from '../../component/A11yProps/A11yProps'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'
import SetLectorControl from '../../WebModel/CourseTest/SetLectorControl'

export default function StudentTestResultDetail () {
  const { t } = useTranslation()
  const [showLoading, setShowLoading] = React.useState(false)
  const [valueTab, setValueTab] = React.useState(0)
  const couserId = GetUrlParam('courseId')
  const studentTestResultId = GetUrlParam('id')
  const [studentTestResult, setStudentTestResult] = React.useState([])
  const [scoreSummary, setScoreSummary] = React.useState(0)
  const [testCompleted, setTestCompleted] = React.useState(false)
  const [isAutomaticEvaluate, setIsAutomaticEvaluate] = React.useState(false)
  const classes = useStyles()
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }
  const lectorControl = (questionid: string, isTrue: boolean, score: number) => {
    const obj = new SetLectorControl(isTrue, questionid, GetUserToken(), score, studentTestResultId)
    axiosInstance.put('webportal/CourseTest/SetLectorControl', obj).then(function () {
      realoadStudentTestResult()
    })
  }
  const lectorControlTrue = (event: any) => {
    const { questionid } = event.target.parentNode.dataset
    lectorControl(questionid, true, 1)
  }
  const lectorControlFalse = (event: any) => {
    const { questionid } = event.target.parentNode.dataset
    lectorControl(questionid, false, 0)
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)
      GetUserOrganizationRole(GetUserToken(), couserId, 'showStudentTestResult').then(function (result: any) {
        setPermitions(result)
        realoadStudentTestResult()
      })

      // setPermitions(permitionsX);
    }

    fetchData()
  }, [])
  const realoadStudentTestResult = async () => {
    setShowLoading(true)

    axiosInstance.get('webportal/CourseTest/ShowStudentAnswer', {
      params: {
        accessToken: GetUserToken(),
        courseId: couserId,
        studentTestResultId: studentTestResultId
      }
    }).then(function (response: any) {
      GetUserOrganizationRole(GetUserToken(), couserId, 'showStudentTestResult').then(function (resultPermition: any) {
        const tmp = [] as any
        setScoreSummary(response?.data?.data?.score)
        setTestCompleted(response?.data?.data?.testCompleted)
        setIsAutomaticEvaluate(response?.data?.data?.isAutomaticEvaluate)
        response?.data?.data.question.forEach(function (e: any) {
          let header = parse(t('STUDENT_TEST_QUESTION') + '<strong>' + e.question + '</strong> ' + t('STUDENT_SCORE_RESULT') + ': ' + e.score)
          if (e.questionMode === 'TEXT_QUESTION') {
            header = parse(t('STUDENT_TEST_QUESTION') + '<strong>' + e.question + '</strong> ' + t('STUDENT_SCORE_RESULT') + ': ' + e.score)
          } else if (e.questionMode === 'IMAGE_QUESTION') {
            header = parse(t('STUDENT_TEST_QUESTION') + '<strong>' + e.question + '</strong> ' + t('STUDENT_SCORE_RESULT') + ': ' + e.score + '<br /> <img src="' + e.filePath + '" style="width:200px" />')
          } else if (e.questionMode === 'AUDIO_QUESTION') {
            header = parse(t('STUDENT_TEST_QUESTION') + '<strong>' + e.question + '</strong> ' + t('STUDENT_SCORE_RESULT') + ': ' + e.score + '<br /> <audio  style="width:200px"  controls <source src="' + e.filePath + '" type="audio/mpeg" /> <source src="' + e.filePath + '" type="audio/ogg" /></audio>')
          } else if (e.questionMode === 'VIDEO_QUESTION') {
            header = parse(t('STUDENT_TEST_QUESTION') + '<strong>' + e.question + '</strong> ' + t('STUDENT_SCORE_RESULT') + ': ' + e.score + '<br /> <video  style="width:200px" controls <source src="' + e.filePath + '" type="video/mp4" /> <source src="' + e.filePath + '" type="video/ogg" /></video>')
          } else {
            header = parse(t('STUDENT_TEST_QUESTION') + '<strong>' + e.question + '</strong> ' + t('STUDENT_SCORE_RESULT') + ': ' + e.score)
          }

          const tmpanswer = [] as any

          e.userAnswers.forEach(function (x: any) {
            if (e.answerMode === 'SELECT_ONE' || e.answerMode === 'YES_NO_TRUE_YES' || e.answerMode === 'YES_NO_TRUE_NO' || e.answerMode === 'SELECT_MANY') {
              let answer

              if (x.userAnswer && x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testOk}>
                  {parse('<strong>' + (e.answerMode === 'YES_NO_TRUE_YES' || e.answerMode === 'YES_NO_TRUE_NO' ? t(x.answer) : x.answer) + '</strong>')}
                </Grid>
              } else if (x.userAnswer && !x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testError}>
                  {parse('<strong>' + (e.answerMode === 'YES_NO_TRUE_YES' || e.answerMode === 'YES_NO_TRUE_NO' ? t(x.answer) : x.answer) + '</strong>')}
                </Grid>
              } else if (x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testOk}>
                  {e.answerMode === 'YES_NO_TRUE_YES' || e.answerMode === 'YES_NO_TRUE_NO' ? t(x.answer) : x.answer}
                </Grid>
              } else {
                answer = <Grid item xl={12} >
                  {e.answerMode === 'YES_NO_TRUE_YES' || e.answerMode === 'YES_NO_TRUE_NO' ? t(x.answer) : x.answer}
                </Grid>
              }

              tmpanswer.push(answer)
            } else if (e.answerMode === 'SELECT_ONE_IMAGE' || e.answerMode === 'SELECT_MANY_IMAGE') {
              let answer
              if (x.userAnswer && x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testOk}>
                  {<CheckIcon />} {parse('<strong><img src="' + x.filePath + '" style="width:200px"/>' + '</strong>')}
                </Grid>
              } else if (x.userAnswer && !x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testError}>
                  { <CloseIcon />} {parse('<strong>' + '<img src="' + x.filePath + '" style="width:200px"/>' + '</strong>')}
                </Grid>
              } else if (x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testOk}>
                  {<CheckIcon />}{parse('<strong>' + '<img src="' + x.filePath + '" style="width:200px"/>' + '</strong>')}
                </Grid>
              } else {
                answer = <Grid item xl={12} >
                  {parse('<strong>' + '<img src="' + x.filePath + '" style="width:200px"/>' + '</strong>')}
                </Grid>
              }
              tmpanswer.push(answer)
            } else if (e.answerMode === 'SELECT_ONE_VIDEO' || e.answerMode === 'SELECT_MANY_VIDEO') {
              let answer
              if (x.userAnswer && x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testOk}>
                  {<CheckIcon />}{parse('<strong>' + '<video controls> <source src="' + x.filePath + '" type="video/mp4" /><source src="' + x.filePath + '" type="video/ogg" /></video>' + '</strong>')}
                </Grid>
              } else if (x.userAnswer && !x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testError}>
                  {<CloseIcon /> }{parse('<strong>' + '<video controls> <source src="' + x.filePath + '" type="video/mp4" /><source src="' + x.filePath + '" type="video/ogg" /></video>' + '</strong>')}
                </Grid>
              } else if (x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testOk}>
                  {<CheckIcon />}{parse('<strong>' + '<video controls> <source src="' + x.filePath + '" type="video/mp4" /><source src="' + x.filePath + '" type="video/ogg" /></video>' + '</strong>')}
                </Grid>
              } else {
                answer = <Grid item xl={12} >
                  {parse('<strong>' + '<video controls> <source src="' + x.filePath + '" type="video/mp4" /><source src="' + x.filePath + '" type="video/ogg" /></video>' + '</strong>')}
                </Grid>
              }
              tmpanswer.push(answer)
            } else if (e.answerMode === 'SELECT_ONE_AUDIO' || e.answerMode === 'SELECT_MANY_AUDIO') {
              let answer
              if (x.userAnswer && x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testOk}>
                  {<CheckIcon />}{parse('<strong>' + '<audio controls> <source src="' + x.filePath + '" type="audio/mpeg" /><source src="' + x.filePath + '" type="audio/ogg" /></audio>' + '</strong>')}
                </Grid>
              } else if (x.userAnswer && !x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testError}>
                  {<CloseIcon />}{parse('<strong>' + '<audio controls> <source src="' + x.filePath + '" type="audio/mpeg" /><source src="' + x.filePath + '" type="audio/ogg" /></audio>' + '</strong>')}
                </Grid>
              } else if (x.isTrueAnswer) {
                answer = <Grid item xl={12} className={classes.testOk}>
                  {<CheckIcon />}{parse('<strong>' + '<audio controls> <source src="' + x.filePath + '" type="audio/mpeg" /><source src="' + x.filePath + '" type="audio/ogg" /></audio>' + '</strong>')}
                </Grid>
              } else {
                answer = <Grid item xl={12} >
                  {parse('<strong>' + '<audio controls> <source src="' + x.filePath + '" type="audio/mpeg" /><source src="' + x.filePath + '" type="audio/ogg" /></audio>' + '</strong>')}
                </Grid>
              }
              tmpanswer.push(answer)
            } else if (e.answerMode === 'TEXT_MANUAL') {
              const answer =
                <Grid item xl={12}>
                  <img src={x.userTestImageAnswer} />
                </Grid>

              tmpanswer.push(answer)
            } else {
              const answer =
                <Grid item xl={12}>
                  {x.text}
                </Grid>

              tmpanswer.push(answer)
            }
          })

          const data = <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}> {header} {(e.answerMode === 'SELECT_ONE' || e.answerMode === 'SELECT_MANY' || e.isAutomaticEvaluate) ? (e.isTrue ? <CheckIcon /> : <CloseIcon />) : <span><WarningIcon /> {t('MANUAL_CONTROL')}</span>} </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={0}>
                {resultPermition.isLector &&
                  <Grid item xl={12}>
                    <Button variant="contained" color="primary" onClick={lectorControlTrue} data-questionId={e.id}>{t('STUDENT_RESULT_ANSWER_TRUE')}</Button>
                    <Button variant="contained" color="primary" onClick={lectorControlFalse} data-questionId={e.id}>{t('STUDENT_RESULT_ANSWER_FALSE')}</Button>
                  </Grid>
                }
                {tmpanswer}
              </Grid>

            </ExpansionPanelDetails>
          </ExpansionPanel>
          tmp.push(data)
        })

        setStudentTestResult(tmp)
        setShowLoading(false)
      })
    })
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('STUDENT_TEST_ANSWERS')} showBackButton={true} backButtonUrl={permitions.isLector ? '/studenttestresult?courseId=' + GetUrlParam('courseId') : '/myprofile'} />
      {!(permitions.isLector || permitions.isStudent) &&
        <AccessForbiden />
      }
      {(permitions.isLector || permitions.isStudent) &&
        <Paper>

          <AppBar position='static'>
            <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
              <Tab label={t('STUDENT_TEST_ANSWERS')} {...a11yProps(0)} />

            </Tabs>
          </AppBar>
          <TabPanel value={valueTab} index={0}>
            {studentTestResult}
            <Grid container xl={12}>
              <Grid item xl={4}>
                {t('STUDENT_RESUT_SUMMARY_COUNT')}
              </Grid>
              <Grid item xl={4}>
                {scoreSummary}
              </Grid>
              <Grid item xl={4}>
                {isAutomaticEvaluate && <div>
                  {testCompleted && t('TEST_STATUS_TRUE')}
                  {!testCompleted && t('TEST_STATUS_FALSE')}
                </div>
                }
                {!isAutomaticEvaluate && t('TEST_STATUS_LECTOR')}

              </Grid>
            </Grid>
          </TabPanel>

        </Paper>
      }
    </Container>
  )
}
