import React, { useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { axiosInstance } from '../../axiosInstance'
import PropTypes from 'prop-types'
import useStyles from '../../styles'
import { useTranslation } from 'react-i18next'
import { CodeBookItem } from '../../WebModel/Shared/CodeBookItem'

export default function CodeBook (props: any) {
  const { codeBookIdentificator, label, id, onChange, autoTranslate, data, readonly, removeItems } = props
  const { value } = props
  const [dataSelectItems, setDataSelectItems] = React.useState([])
  const { t } = useTranslation()
  const classes = useStyles()

  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get('/shared/CodeBook/GetCodeBookItems/' + codeBookIdentificator).then(function (response) {
        setDataSelectItems(response?.data?.data)
      })
    }
    if (data?.length === undefined || data?.length === 0) {
      fetchData()
    } else {
      setDataSelectItems(data)
    }
  }, [])
  return (
    <FormControl variant="outlined" fullWidth className={classes.selectBoxPadding}>
      <InputLabel id={id + '-label'}>{label}</InputLabel>
      <Select labelId={id + '-label'} id={id} value={value} onChange={onChange} label={label} fullWidth readOnly={readonly} >
        {dataSelectItems?.map((e: CodeBookItem, keyIndex: number) => {
          if (removeItems?.length !== undefined && data?.length > 0) {
            if (removeItems.indexOf(e.systemIdentificator) > -1) {
              return
            }
          }
          const translate = autoTranslate || e.name === 'CODEBOOK_SELECT_VALUE' ? t(e.name) : e.name
          return (<MenuItem key={keyIndex} disabled={e.disabled} value={e.id}>{translate}</MenuItem>)
        })}
      </Select>
    </FormControl>
  )
}
CodeBook.prototype = {
  codeBookIdentificator: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  autoTranslate: PropTypes.bool,
  data: PropTypes.array,
  readonly: PropTypes.bool,
  removeItems: PropTypes.array
}
