import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Typography, List, ListItemIcon } from '@material-ui/core'
import useStyles from '../../styles'
import PhoneIcon from '@material-ui/icons/Phone'
import MailIcon from '@material-ui/icons/Mail'
import { Link as ReactLink } from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import YouTubeIcon from '@material-ui/icons/YouTube'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import TelegramIcon from '@material-ui/icons/Telegram'

export default function ContactFooter () {
  const classes = useStyles()
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <List className={classes.footerContact}>
        <ListItem button component="a" href="mailto:info@flexiblelms.com" className={classes.footerContactItem}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component="a" href="tel:+420725770270" className={classes.footerContactItem}>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component="a" target="_blank" href="https://www.facebook.com/Flexiblelms-100439018565929" className={classes.footerContactItem}>
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component="a" href="https://www.instagram.com/flexiblelms/" target="_blank" className={classes.footerContactItem}>
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component={ReactLink} to="" className={classes.footerContactItem}>
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component="a" href="https://www.youtube.com/playlist?list=PLIyYUIptx6ol0iIJNVvYOyo0sj-gdCapn" target="_blank" className={classes.footerContactItem}>
          <ListItemIcon>
            <YouTubeIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component="a" href="https://wa.me/420775770270" target="_blank" className={classes.footerContactItem}>
          <ListItemIcon>
            <WhatsAppIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button component={ReactLink} to="" className={classes.footerContactItem}>
          <ListItemIcon>
            <TelegramIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </Typography>
  )
}
