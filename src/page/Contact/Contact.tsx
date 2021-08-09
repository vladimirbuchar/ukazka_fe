import { Container, List, ListItem, ListItemIcon, ListItemText, Paper } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import PageName from '../../component/PageName/PageName'
import PhoneIcon from '@material-ui/icons/Phone'
import MailIcon from '@material-ui/icons/Mail'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import YouTubeIcon from '@material-ui/icons/YouTube'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import TelegramIcon from '@material-ui/icons/Telegram'
import { Link as ReactLink } from 'react-router-dom'

export default function Contact () {
  const { t } = useTranslation()
  return (<Container component="main" maxWidth="xl">
    <PageName title={t('PAGE_CONTACT_TITLE')} />
    <Paper>
      <List >
        <ListItem button component="a" href="mailto:info@flexiblelms.com">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="info@flexiblelms.com" />
        </ListItem>

        <ListItem button component="a" href="tel:+420725770270">
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          <ListItemText primary="+420 725 770 270" />
        </ListItem>
        <ListItem button component="a" target="_blank" href="https://www.facebook.com/Flexiblelms-100439018565929">
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          <ListItemText primary="FlexibleLMS" />
        </ListItem>
        <ListItem button component={ReactLink} to="" >
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText primary="FlexibleLMS" />
        </ListItem>
        <ListItem button component={ReactLink} to="" >
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="FlexibleLMS" />
        </ListItem>
        <ListItem button component={ReactLink} to="" >
          <ListItemIcon>
            <YouTubeIcon />
          </ListItemIcon>
          <ListItemText primary="FlexibleLMS" />
        </ListItem>
        <ListItem button component={ReactLink} to="" >
          <ListItemIcon>
            <WhatsAppIcon />
          </ListItemIcon>
          <ListItemText primary="+420 725 770 270" />
        </ListItem>
        <ListItem button component={ReactLink} to="">
          <ListItemIcon>
            <TelegramIcon />
          </ListItemIcon>
          <ListItemText primary="+420 725 770 270" />
        </ListItem>
      </List>

    </Paper>
  </Container>

  )
}
