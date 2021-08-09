import React, { useEffect } from 'react'
import { Grid, Container, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import useStyles from '../../styles'
import { useTranslation } from 'react-i18next'
import GetUserToken from '../../core/GetUserToken'
import { axiosInstance } from '../../axiosInstance'
import { MyCourseItem } from './MyCourseItem'
import PropTypes from 'prop-types'

export default function MyCourse (props:any) {
  const { hideFinishCourse, onChangeOpacity } = props
  const [myCourseList, setMyCourseList] = React.useState([])
  const [dataEmpty, setDataEmpty] = React.useState(false)
  const { t } = useTranslation()
  const classes = useStyles()

  const reloadMyCourse = async () => {
    axiosInstance.get('webportal/Course/GetMyCourse', {
      params: {
        accessToken: GetUserToken(),
        hideFinishCourse: hideFinishCourse
      }
    }).then(function (response: any) {
      if (response?.data?.data.length === 0) {
        setDataEmpty(true)
        setMyCourseList([])
      } else {
        const courseList = [] as any
        let i = 0
                response?.data?.data.forEach(function (item: any) {
                  const row =
                    <MyCourseItem name={item.courseName} isOrganizationLector={item.isLector} isOrganizationStudent={item.isStudent} id={item.id} termName={item.termName}
                      organizationName ={item.organizationName}
                      branchName ={item.branchName}
                      classRoomName ={item.classRoom}
                      courseStudentId = {item.courseStudentId}
                      finishCourse={item.courseFinish}
                      onChangeOpacity = {onChangeOpacity}
                      courseTermId = {item.courseTermId}
                    />
                  courseList[i] = row
                  i++
                })
                setMyCourseList(courseList)
      }
    })
  }
  useEffect(() => {
    const fetchData = async () => {
      reloadMyCourse()
    }
    fetchData()
  }, [])

  return (
    <Container component="main" maxWidth="xl">
      <Grid container spacing={2}>
        {dataEmpty && <Grid item xs={12} >
          {t('COURSE_EMPTY_DATA')}
        </Grid>}
        {!dataEmpty &&
                <TableContainer component={Paper}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t('COURSE_LIST_NAME')}</TableCell>
                        <TableCell>{t('COURSE_LIST_TERM')}</TableCell>
                        <TableCell>{t('COURSE_LIST_ORGANIZATION')}</TableCell>
                        <TableCell>{t('COURSE_LIST_BRANCH')}</TableCell>
                        <TableCell>{t('COURSE_LIST_CLASSROOM')}</TableCell>
                        <TableCell>{t('COURSE_LIST_STUDY_STATE')}</TableCell>

                        <TableCell align="right">{t('COURSE_LIST_ACTION')}</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {myCourseList}
                    </TableBody>
                  </Table>
                </TableContainer>
        }

      </Grid>
    </Container>
  )
}
MyCourse.prototype = {
  hideFinishCourse: PropTypes.bool,
  onChangeOpacity: PropTypes.func
}
