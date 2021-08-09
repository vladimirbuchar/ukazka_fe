import React, { useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import EmailIcon from '@material-ui/icons/Email'
import HelpIcon from '@material-ui/icons/Help'
import BusinessIcon from '@material-ui/icons/Business'
import SchoolIcon from '@material-ui/icons/School'
import { Link as ReactLink } from 'react-router-dom'
import { List, Tooltip } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PropTypes from 'prop-types'
import SettingsIcon from '@material-ui/icons/Settings'
import { useHistory } from 'react-router'
import PeopleIcon from '@material-ui/icons/People'
import OrganizationPermition from '../../WebModel/Shared/OrganizationPermition'
import GetUserOrganizationRole from '../../core/GetUserOrganizationRole'
import GetUserToken from '../../core/GetUserToken'

export default function LogedUserItems (props: any) {
  const [permitions, setPermitions] = React.useState(new OrganizationPermition(false, false, false, false, false, false))
  const history = useHistory()
  const { t } = useTranslation()
  const { onChangeTab, onChangeOpacity } = props
  const goToTab = (event: any) => {
    history.push('/organization/edit/?id=' + window.localStorage.getItem('organizationId') + '&gototab=base')
    onChangeTab('base')
    onChangeOpacity()
  }
  const goToTabBranch = (event: any) => {
    history.push('/organization/edit/?id=' + window.localStorage.getItem('organizationId') + '&gototab=branch')
    onChangeTab('branch')
    onChangeOpacity()
  }
  const goToTabUser = (event: any) => {
    history.push('/organization/edit/?id=' + window.localStorage.getItem('organizationId') + '&gototab=user')
    onChangeTab('user')
    onChangeOpacity()
  }
  const goToTabCourse = (event: any) => {
    history.push('/organization/edit/?id=' + window.localStorage.getItem('organizationId') + '&gototab=course')
    onChangeTab('course')
    onChangeOpacity()
  }
  const goToTabBankOfQuestion = (event: any) => {
    history.push('/organization/edit/?id=' + window.localStorage.getItem('organizationId') + '&gototab=bankOfQuestion')
    onChangeTab('bankOfQuestion')
    onChangeOpacity()
  }
  const goToTabQuestion = (event: any) => {
    history.push('/organization/edit/?id=' + window.localStorage.getItem('organizationId') + '&gototab=question')
    onChangeTab('question')
    onChangeOpacity()
  }
  const goToTabSettings = (event: any) => {
    history.push('/organization/edit/?id=' + window.localStorage.getItem('organizationId') + '&gototab=settings')
    onChangeTab('settings')
    onChangeOpacity()
  }
  const goToTabCert = (event: any) => {
    history.push('/organization/edit/?id=' + window.localStorage.getItem('organizationId') + '&gototab=cert')
    onChangeTab('cert')
    onChangeOpacity()
  }
  useEffect(() => {
    const fetchData = async () => {
      const orgId = window.localStorage.getItem('organizationId') || ''
      if (orgId !== '') {
        const permitions = await GetUserOrganizationRole(GetUserToken(), orgId, 'organization')
        setPermitions(permitions)
      }
    }
    fetchData()
  }, [])

  return (
    <List>

      <Tooltip title={String(t('MENU_DASHBOARD'))}>
        <ListItem button component={ReactLink} to="/dashboard" onClick={onChangeOpacity}>
          <ListItemIcon>

            <DashboardIcon />

          </ListItemIcon>
          <ListItemText primary={t('MENU_DASHBOARD')} />
        </ListItem>
      </Tooltip>

      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && window.localStorage.getItem('organizationId') !== '' &&
                <Tooltip title={String(t('ORGANIZATION_TAB_BASIC_INFORMATION'))}>
                  <ListItem button onClick={goToTab}>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('ORGANIZATION_TAB_BASIC_INFORMATION')} />
                  </ListItem>
                </Tooltip>}
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && window.localStorage.getItem('organizationId') !== '' &&
                <Tooltip title={String(t('ORGANIZATION_TAB_BRANCH'))}>
                  <ListItem button onClick={goToTabBranch}>
                    <ListItemIcon>
                      <img src="https://img.icons8.com/pastel-glyph/24/000000/company--v2.png" />
                    </ListItemIcon>
                    <ListItemText primary={t('ORGANIZATION_TAB_BRANCH')} />
                  </ListItem>
                </Tooltip>}
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && window.localStorage.getItem('organizationId') !== '' &&
                <Tooltip title={String(t('ORGANIZATION_TAB_USERS'))}>
                  <ListItem button onClick={goToTabUser}>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('ORGANIZATION_TAB_USERS')} />
                  </ListItem>
                </Tooltip>}
      {window.localStorage.getItem('organizationId') !== '' && (permitions.isCourseAdministrator || permitions.isCourseEditor || permitions.isOrganizationAdministrator || permitions.isOrganizationOwner) &&
                <Tooltip title={String(t('ORGANIZATION_COURSE'))}>
                  <ListItem button onClick={goToTabCourse}>
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('ORGANIZATION_COURSE')} />
                  </ListItem>
                </Tooltip>}
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && window.localStorage.getItem('organizationId') !== '' &&
                <Tooltip title={String(t('ORGANIZATION_BANK_OF_QUESTION'))}>
                  <ListItem button onClick={goToTabBankOfQuestion} >
                    <ListItemIcon>
                      <img src="/img/cloud-with-question-mark.png" />
                    </ListItemIcon>
                    <ListItemText primary={t('ORGANIZATION_BANK_OF_QUESTION')} />
                  </ListItem>
                </Tooltip>}
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator || permitions.isCourseAdministrator || permitions.isCourseEditor) && window.localStorage.getItem('organizationId') !== '' &&
                <Tooltip title={String(t('ORGANIZATION_TITLE_QUESTION'))}>
                  <ListItem button onClick={goToTabQuestion} >
                    <ListItemIcon>
                      <img src="/img/online-test.png" />
                    </ListItemIcon>
                    <ListItemText primary={t('ORGANIZATION_TITLE_QUESTION')} />
                  </ListItem>
                </Tooltip>}
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && window.localStorage.getItem('organizationId') !== '' &&
                <Tooltip title={String(t('ORGANIZATION_SETTING'))}>
                  <ListItem button onClick={goToTabSettings} >
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('ORGANIZATION_SETTING')} />
                  </ListItem>
                </Tooltip>}
      {(permitions.isOrganizationOwner || permitions.isOrganizationAdministrator) && window.localStorage.getItem('organizationId') !== '' &&
                <Tooltip title={String(t('ORGANIZATION_CERTIFICATE'))}>
                  <ListItem button onClick={goToTabCert}>
                    <ListItemIcon>
                      <img src="https://img.icons8.com/material-two-tone/24/000000/certificate.png" />
                    </ListItemIcon>
                    <ListItemText primary={t('ORGANIZATION_CERTIFICATE')} />
                  </ListItem>
                </Tooltip>}
      {window.localStorage.getItem('organizationId') === '' &&
                <Tooltip title={String(t('MENU_MY_ORGANIZATIONS'))}>
                  <ListItem button component={ReactLink} to="/organization/list" onClick={onChangeOpacity}>
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('MENU_MY_ORGANIZATIONS')} />
                  </ListItem>
                </Tooltip>}

      <Tooltip title={String(t('MENU_MY_COURSES'))}>
        <ListItem button component={ReactLink} to="/course/list" onClick={onChangeOpacity}>
          <ListItemIcon>
            <img src="/img/student.png" />
          </ListItemIcon>
          <ListItemText primary={t('MENU_MY_COURSES')} />
        </ListItem>
      </Tooltip>
      <Tooltip title={String(t('MENU_ABOUT_CONTACT'))}>
        <ListItem button component={ReactLink} to="/contact" onClick={onChangeOpacity}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={t('MENU_ABOUT_CONTACT')} />
        </ListItem>
      </Tooltip>
      <Tooltip title={String(t('MENU_ABOUT_HELP'))}>
        <ListItem button component="a" href="https://help.flexiblelms.com" target="_blank">
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary={t('MENU_ABOUT_HELP')} />
        </ListItem>
      </Tooltip>
      {window.localStorage.getItem('organizationId') === '' &&
                <Tooltip title={String(t('MENU_ABOUT_PRICE'))}>
                  <ListItem button component="a" href="https://www.flexiblelms.com/pricelist" target="_blank">
                    <ListItemIcon>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('MENU_ABOUT_PRICE')} />
                  </ListItem>
                </Tooltip>
      }
      <Tooltip title={String(t('MENU_LOG_OUT'))}>
        <ListItem button component={ReactLink} to="/logout" onClick={onChangeOpacity}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={t('MENU_LOG_OUT')} />
        </ListItem>
      </Tooltip>

    </List>)
}
LogedUserItems.prototype = {
  onChangeTab: PropTypes.func,
  onChangeOpacity: PropTypes.func

}
