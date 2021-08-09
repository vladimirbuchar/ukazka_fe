import React, { useEffect } from 'react'
import { Button, Menu, MenuItem } from '@material-ui/core'
import { getLanguage, changeLanguage } from './../../i18n'
import TranslateIcon from '@material-ui/icons/Translate'
import { axiosInstance } from '../../axiosInstance'

export default function LangSelector () {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [lang, setLang] = React.useState([] as any)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const changeLanguageClick = (event: any) => {
    const { language } = event.currentTarget.dataset
    changeLanguage(language)
    setAnchorEl(null)
  }
  const menuItem = lang?.map((item: any) => {
    return (
      <MenuItem key={item.systemIdentificator} onClick={changeLanguageClick} data-language={item.systemIdentificator}>{item.name}</MenuItem>
    )
  })
  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get('shared/CodeBook/GetCodeBookItems/cb_env_culture').then(function (response:any) {
        setLang(response?.data?.data)
      })
    }
    fetchData()
  }, [])

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
        <TranslateIcon />{lang?.find((x:any) => x.systemIdentificator === getLanguage())?.name || (lang?.find((x:any) => x.systemIdentificator.startsWith(getLanguage()))?.name || lang?.find((x:any) => x.systemIdentificator === 'en')?.name)}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItem}
      </Menu>
    </div>
  )
}
