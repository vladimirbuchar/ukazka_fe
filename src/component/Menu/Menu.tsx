import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Lock from '@material-ui/icons/Lock'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import EmailIcon from '@material-ui/icons/Email'
import HelpIcon from '@material-ui/icons/Help'
import { Link as ReactLink } from 'react-router-dom'
import { List, Tooltip } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

export function UnLoggedUserItems (props: any) {
  const { t } = useTranslation()
  const { showRegistration } = props
  return (
    <List>

      <Tooltip title={String(t('MENU_SIGN_IN'))}>
        <ListItem button component="a" href={window.localStorage.getItem('loginUrl') || '/'}>
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText primary={t('MENU_SIGN_IN')} />

        </ListItem>
      </Tooltip>
      {showRegistration === true &&
        <Tooltip title={String(t('MENU_SIGN_UP'))}>
          <ListItem button component={ReactLink} to="/signup">
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={t('MENU_SIGN_UP')} />
          </ListItem>
        </Tooltip>
      }
      <Tooltip title={String(t('MENU_ABOUT_CONTACT'))}>
        <ListItem button component={ReactLink} to="/contact">
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

    </List>
  )
}
UnLoggedUserItems.prototype = {
  showRegistration: PropTypes.bool
}
