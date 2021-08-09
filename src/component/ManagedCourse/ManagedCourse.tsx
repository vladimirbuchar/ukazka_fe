import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { axiosInstance } from '../../axiosInstance'
import GetUserToken from '../../core/GetUserToken'
import useStyles from '../../styles'
import { ManagedCourseMenuItem } from './ManagedCourseMenuItem'

export default function ManagedCourse () {
  const [myCourseList, setMyCourseList] = React.useState([])
  const [dataEmpty, setDataEmpty] = React.useState(false)
  const classes = useStyles()
  const { t } = useTranslation()
  useEffect(() => {
    const reloadMyCourse = async () => {
      axiosInstance.get('webportal/Course/GetManagedCourse', {
        params: {
          accessToken: GetUserToken()
        }
      }).then(function (response: any) {
        if (response?.data?.data.length === 0) {
          setDataEmpty(true)
          setMyCourseList([])
        } else {
          const courseList = [] as any
          let i = 0
                    response?.data?.data.forEach(function (item: any) {
                      if (window.localStorage.getItem('organizationId') === '' || window.localStorage.getItem('organizationId') === item.organizationId) {
                        const row =
                                <ManagedCourseMenuItem courseName={item.courseName} id={item.id}
                                  organizationId={item.organizationId} isOrganizationOwner={item.isOrganizationOwner}
                                  isOrganizationAdministrator={item.isOrganizationAdministrator}
                                  isCourseAdministrator={item.isCourseAdministrator}
                                  isCourseEditor={item.isCourseEditor}

                                />
                        courseList[i] = row
                        i++
                      }
                    })
                    setMyCourseList(courseList)
        }
      })
    }
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
