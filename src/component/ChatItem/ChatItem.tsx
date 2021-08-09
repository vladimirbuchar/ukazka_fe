import React from 'react'
import { Grid, Button, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import GetUserToken from '../../core/GetUserToken'
import { axiosInstance } from '../../axiosInstance'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { UpdateChatItem } from '../../WebModel/Chat/UpdateChatItem'
import { AddChatItem } from '../../WebModel/Chat/AddChatItem'
import GetUserId from '../../core/GetUserId'
import GetUrlParam from '../../core/GetUrlParam'
import parse from 'html-react-parser'

export default function ChatItem (props: any) {
  const { text, fullName, date, isAuthor, id, answers, hideAddAnswer } = props
  const [showEdit, setShowEdit] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [showAddAnswer, setShowAddAnswer] = React.useState(false)
  const [courseMessageAnswer, setCourseMessageAnswer] = React.useState('')

  const [courseMessage, setCouseMessage] = React.useState(text)
  const showUpdateMessage = () => {
    setShowEdit(true)
    setShowDelete(false)
  }
  const hideDeleteMessage = () => {
    setShowDelete(false)
  }

  const hideUpdateMessage = () => {
    setShowEdit(false)
  }
  const hideAnswer = () => {
    setShowAddAnswer(false)
  }
  const sendAnswerdMesasge = () => {
    const obj = new AddChatItem(GetUserId(), GetUrlParam('courseTermId'), id, GetUserToken(), courseMessageAnswer)
    axiosInstance.post('/webportal/Chat/AddChatItem', obj).then(function (response:any) {
      setShowAddAnswer(false)
      setCourseMessageAnswer('')
    })
  }

  const updateMessage = () => {
    const obj = new UpdateChatItem(id, GetUserToken(), courseMessage)
    axiosInstance.put('/webportal/Chat/UpdateChatItem', obj).then(function (response:any) {
      setShowEdit(false)
    })
  }
  const showDeleteQuestion = () => {
    setShowDelete(true)
    setShowEdit(false)
  }
  const deleteMessage = () => {
    axiosInstance.delete('/webportal/Chat/DeleteChatItem', {
      params: {
        chatItemId: id,
        accessToken: GetUserToken()
      }
    })
  }
  const onChangeMessage = (e: any) => {
    setCouseMessage(e.target.value)
  }
  const onChangeAnswer = (e: any) => {
    setCourseMessageAnswer(e.target.value)
  }

  const showAnswer = () => {
    setShowAddAnswer(true)
  }

  const { t } = useTranslation()

  return (<Grid item xs={12} style={{ paddingTop: '15px' }}>

    <Grid item xs={10}>
      <Grid container xs={12} style={{ height: '40px' }} >
        <Grid item style={{ paddingRight: '10px' }}>
          {fullName}
        </Grid>
        <Grid item style={{ paddingRight: '10px' }}>
          {new Date(date).toLocaleString()}
        </Grid>
        {isAuthor &&
                        <Grid item style={{ paddingRight: '10px' }}>
                          <Button color="primary" variant="contained" onClick={showUpdateMessage}>{t('UPDATE_MESSAGE')}</Button>
                        </Grid>
        }
        {isAuthor &&
                        <Grid item style={{ paddingRight: '10px' }}>
                          <Button color="primary" variant="contained" onClick={showDeleteQuestion}>{t('DELETE_MESSAGE')}</Button>
                        </Grid>
        }
        {!hideAddAnswer &&
        <Grid item style={{ paddingRight: '10px' }}>
          <Button color="primary" variant="contained" onClick={showAnswer}>{t('MESSAGE_ANSWER')}</Button>
        </Grid>
        }

      </Grid>
      <Grid item xs={12}>
        {!showEdit && !showDelete && parse(text.replace(/\n/g, '<br />'))}
        {showDelete && <Grid container xs={12}>
          <Grid item xs={10}>
            {t('DELETE_CHAT_ITEM_QUESTION')}
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth color="primary" variant="contained" onClick={deleteMessage}><CheckIcon /></Button>
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth color="primary" variant="contained" onClick={hideDeleteMessage}><CloseIcon /></Button>
          </Grid>
        </Grid>

        }
        {showEdit && <Grid container xs={12}>
          <Grid item xs={10}>
            <TextField
              label={t('COURSE_MESSAGE')}
              onChange={onChangeMessage}
              name={'courseMessage'}
              value={courseMessage}
              variant="outlined"
              fullWidth
              autoFocus
              multiline={true}
              id='courseMessage'/>
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth color="primary" variant="contained" onClick={updateMessage}><CheckIcon /></Button>
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth color="primary" variant="contained" onClick={hideUpdateMessage}><CloseIcon /></Button>
          </Grid>
        </Grid>
        }
        {showAddAnswer && <Grid container xs={12}>
          <Grid item xs={10}>
            <TextField
              label={t('COURSE_MESSAGE')}
              onChange={onChangeAnswer}
              name={'courseMessage'}
              value={courseMessageAnswer}
              variant="outlined"
              fullWidth
              autoFocus
              multiline={true}
              id='courseMessage'/>
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth color="primary" variant="contained" onClick={sendAnswerdMesasge}><CheckIcon /></Button>
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth color="primary" variant="contained" onClick={hideAnswer}><CloseIcon /></Button>
          </Grid>
        </Grid>
        }

        {answers?.map(function (item:any, key:any) {
          return (<Grid item xs={12} key={key} style={{ paddingLeft: '20px' }}>
            <ChatItem text={item.text} isAuthor={item.isAuthor} fullName={item.fullName} date={item.date} id={item.id} hideAddAnswer={true} />
          </Grid>

          )
        })}

      </Grid>
    </Grid>
  </Grid>
  )
}
ChatItem.prototype = {
  text: PropTypes.string,
  fullName: PropTypes.string,
  date: PropTypes.string,
  isAuthor: PropTypes.bool,
  id: PropTypes.string,
  answers: PropTypes.array,
  hideAddAnswer: PropTypes.bool
}
