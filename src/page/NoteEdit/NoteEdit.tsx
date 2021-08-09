import React, { useEffect } from 'react'
import { Container, Paper, AppBar, Tabs, Tab, Grid, TextField } from '@material-ui/core'
import Loading from '../../component/Loading/Loading'
import GetUserToken from '../../core/GetUserToken'
import GetUrlParam from '../../core/GetUrlParam'
import PageName from '../../component/PageName/PageName'
import { axiosInstance } from '../../axiosInstance'
import { useTranslation } from 'react-i18next'
import TabPanel from '../../component/TabPanel/TabPanel'
import a11yProps from '../../component/A11yProps/A11yProps'
import CustomHtmlEditor from '../../component/CustomHtmlEditor/CustomHtmlEditor'
import { UpdateNoteType } from '../../WebModel/Note/UpdateNoteType'
import CustomDrawPanel from '../../component/CustomDrawPanel/CustomDrawPanel'

export default function NoteEdit () {
  const { t } = useTranslation()
  const [showLoading, setShowLoading] = React.useState(false)
  const [valueTab, setValueTab] = React.useState(0)
  const [noteText, setNoteText] = React.useState('')
  const [noteName, setNoteName] = React.useState('')
  const [noteType, setNoteType] = React.useState('')
  const [filePath, setFilePath] = React.useState('')

  const handleChangeTab = (event: any, newValue: any) => {
    setValueTab(newValue)
  }

  const onChangeNoteName = (e:any) => {
    setNoteName(e.target.value)

    const obj = new UpdateNoteType(noteText, GetUrlParam('id'), GetUserToken(), e.target.value)
    axiosInstance.put('/webportal/Note/UpdateNote', obj)
  }
  const onChangeNote = (content: any) => {
    setNoteText(content)

    const obj = new UpdateNoteType(content, GetUrlParam('id'), GetUserToken(), noteName)
    axiosInstance.put('/webportal/Note/UpdateNote', obj)
  }

  useEffect(() => {
    const fetchData = async () => {
      setShowLoading(true)

      loadNote()
    }

    fetchData()
  }, [])
  const loadNote = async () => {
    setShowLoading(true)

    await axiosInstance.get('webportal/Note/GetNoteDetail', {
      params: {
        accessToken: GetUserToken(),
        noteId: GetUrlParam('id')
      }
    }).then(function (response: any) {
      setNoteName(response.data.data.noteName)
      setNoteText(response.data.data.text)
      setNoteType(response.data.data.noteType)
      setFilePath(response.data.data.filePath)
      setShowLoading(false)
    })
  }
  const savePrawPanel = (img:any) => {
    const obj = new UpdateNoteType('', GetUrlParam('id'), GetUserToken(), noteName, img)
    axiosInstance.put('/webportal/Note/UpdateNoteImage', obj)
  }

  return (
    <Container component='main' maxWidth='xl'>
      <Loading showLoading={showLoading} />
      <PageName title={t('NOTE_TEXT')} showBackButton={true} backButtonUrl={'/myprofile'} />

      <Paper>
        <AppBar position='static'>
          <Tabs value={valueTab} onChange={handleChangeTab} scrollButtons="auto" variant="scrollable">
            <Tab label={t('NOTE_TEXT')} {...a11yProps(0)} />

          </Tabs>
        </AppBar>
        <TabPanel value={valueTab} index={0}>
          <Grid container>
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
            {noteType === 'NOTE_TYPE_TEXT' && <Grid item xs={12}>
              <CustomHtmlEditor content={noteText} onChangeContent={onChangeNote} />
            </Grid>
            }
            {noteType === 'NOTE_TYPE_DRAW' && <Grid item xs={12}>
              <CustomDrawPanel onSave={savePrawPanel} filePath={filePath} undoText={t('TABLE_UNDO_TEXT')} redoText={t('TABLE_REDO_TEXT')} saveText={t('TABLE_SAVE_IMAGE')} clearText={t('TABLE_CLEAR_IMAGE')} />
            </Grid>
            }

          </Grid>
        </TabPanel>

      </Paper>

    </Container>
  )
}
