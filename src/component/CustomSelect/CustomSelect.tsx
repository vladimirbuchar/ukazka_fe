import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from '../../styles'
import SelectItem from '../../WebModel/Shared/SelectItem'
import { useTranslation } from 'react-i18next'

export default function CustomSelect (props: any) {
  const classes = useStyles()
  const { label, data, onChangeValue, id, multiple, error, errorMessage, onlySelect, showSelectValue } = props

  let { selectValue } = props
  const { t } = useTranslation()
  if (selectValue === '' || selectValue === '00000000-0000-0000-0000-000000000000') {
    selectValue = 'CODEBOOK_SELECT_VALUE'
  }

  if (onlySelect === true) {
    return <Select fullWidth multiple={multiple}
      labelId={id + '-label'}
      id={id}
      value={selectValue}
      onChange={onChangeValue}
      label={label}>
      {data?.map((e: SelectItem, keyIndex: any) => {
        return (<MenuItem key={keyIndex} value={e.Id}>{e.Name}</MenuItem>)
      })}
    </Select>
  }
  return (
    <FormControl className={classes.formControl} variant="outlined" fullWidth error={error}>
      <InputLabel id={id + '-label'}>{label}</InputLabel>
      <Select fullWidth multiple={multiple}
        labelId={id + '-label'}
        id={id}
        value={selectValue}
        onChange={onChangeValue}
        label={label}>
        {(showSelectValue === '' || showSelectValue === undefined || showSelectValue === null || showSelectValue === true) &&
          <MenuItem key={''} value={'CODEBOOK_SELECT_VALUE'}>{t('CODEBOOK_SELECT_VALUE')}</MenuItem>
        }
        {data?.map((e: SelectItem, keyIndex: any) => {
          return (<MenuItem key={keyIndex} value={e.Id} >{e.Name}</MenuItem>)
        })}
      </Select>

      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}
CustomSelect.prototype = {
  label: PropTypes.string,
  data: PropTypes.array,
  selectValue: PropTypes.any,
  onChangeValue: PropTypes.func,
  id: PropTypes.string,
  multiple: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onlySelect: PropTypes.bool,
  showSelectValue: PropTypes.bool

}
