import React, { useEffect } from 'react'
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Container } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import { useTranslation } from 'react-i18next'
import Button from '@material-ui/core/Button'
import { Link as ReactLink } from 'react-router-dom'
import useStyles from '../../styles'
import GetUserToken from '../../core/GetUserToken'
import { OrganizationItem } from './OrganizationItem'
import GetUserId from '../../core/GetUserId'

export default function Organization () {
  const [organizations, setOrganizations] = React.useState([])
  const [dataEmpty, setDataEmpty] = React.useState(false)
  const classes = useStyles()
  const deleteFunction = () => {
    reloadMyOrganization()
  }
  const reloadMyOrganization = async () => {
    axiosInstance.get('webportal/Organization/GetMyOrganizations/', {
      params: {
        accessToken: GetUserToken()
      }
    }).then(function (response) {
      if (response?.data?.data.length === 0) {
        setDataEmpty(true)
        setOrganizations([])
      } else {
        const organizationList = [] as any
        let i = 0
                response?.data?.data.forEach(function (item: any) {
                  if (window.localStorage.getItem('organizationId') === '' || window.localStorage.getItem('organizationId') === item.id) {
                    const row =
                            <OrganizationItem name={item.name} description={item.description} isOrganizationOwner={item.organizationRole.find((x: any) => x.isOrganizationOwner)?.isOrganizationOwner}
                              isOrganizationLector={item.organizationRole.find((x: any) => x.isLector)?.isLector} isOrganizationStudent={item.organizationRole.find((x: any) => x.isStudent)?.isStudent} isOrganizationAdministrator={item.organizationRole.find((x: any) => x.isOrganizationAdministrator)?.isOrganizationAdministrator}
                              isCourseEditor={item.organizationRole.find((x: any) => x.isCourseEditor)?.isCourseEditor} isCourseAdministrator={item.organizationRole.find((x: any) => x.isCourseAdministrator)?.isCourseAdministrator}
                              id={item.id} onDelete={deleteFunction} userId={GetUserId()} key={item.id}
                            />
                    organizationList[i] = row
                    i++
                  }
                })

                setOrganizations(organizationList)
      }
    })
  }

  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      reloadMyOrganization()
    }
    fetchData()
  }, [])

  return (
    <Container component="main" maxWidth="xl">
      {window.localStorage.getItem('organizationId') === '' && <Button variant="outlined" color="primary" component={ReactLink} to="/organization/edit">{t('ORGANIZATION_BUTTON_ADD')}</Button>}
      {window.localStorage.getItem('organizationId') === '' && <Button variant="outlined" color="primary">{t('ORGANIZATION_BUTTON_FIND')}</Button>}

      <Grid container spacing={2}>
        {dataEmpty && <Grid item xs={12} >
          {t('ORGANIZATION_EMPTY_DATA')}
        </Grid>}
        {!dataEmpty &&
                    <TableContainer component={Paper}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>{t('ORG_LIST_NAME')}</TableCell>
                            <TableCell align="right">{t('ORG_LIST_ROLE')}</TableCell>
                            <TableCell align="right">{t('ORG_LIST_ACTION')}</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {organizations}
                        </TableBody>
                      </Table>
                    </TableContainer>
        }

      </Grid>
    </Container>

  )
}
