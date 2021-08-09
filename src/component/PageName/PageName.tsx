import React, { useEffect } from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from '../../styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useTranslation } from 'react-i18next'
import { Link as ReactLink } from 'react-router-dom'
import { axiosInstance } from '../../axiosInstance'
import GetUserToken from '../../core/GetUserToken'
import SelectItem from '../../WebModel/Shared/SelectItem'
import CustomSelect from '../CustomSelect/CustomSelect'
export default function PageName (props: any) {
  const { title, showBackButton, backButtonUrl, showChangeCulture, organizationId } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const [orgCulture, setOrgCulture] = React.useState([])
  const [selectCulture, setSelectCulture] = React.useState('')
  useEffect(() => {
    const fetchData = async () => {
      if (organizationId !== '' && showChangeCulture === true) {
        axiosInstance.get('/webportal/Organization/GetOrganizationCulture', {
          params: {
            accessToken: GetUserToken(),
            organizationId: organizationId
          }
        }).then(function (response: any) {
          setOrgCulture(response?.data?.data)
          setSelectCulture(response?.data?.data?.find((x: any) => x.isDefault)?.id)
        })
      }
    }
    fetchData()
  }, [])
  const handleSelectedEditCulture = (event: any) => {
    setSelectCulture(event.target.value)
  }

  return (
    <Grid container spacing={0} className={classes.pageTitle} style={
      {
        paddingLeft: 0,
        paddingRight: 0
      }
    }>
      <Grid item sm={organizationId !== '' && showChangeCulture === true ? 8 : 10} >

        <Typography component="h1" variant="h6">
          {title}

        </Typography>

      </Grid>
      {showChangeCulture === true && organizationId !== '' &&
        <Grid item sm={showBackButton === true ? 2 : 4} justify="flex-end">

          <CustomSelect label={t('PAGE_NAME_EDIT_CULTURE')} data={orgCulture?.map(function (e: any) {
            return new SelectItem(e.id, e.name)
          })} selectValue={selectCulture} onChangeValue={handleSelectedEditCulture} id="editCulture" multiple={false} onlySelect={true} />

        </Grid>
      }

      {showBackButton === true &&
        <Grid item sm={2} >
          <Grid container justify="flex-end">
            <Button
              component={ReactLink}
              to={backButtonUrl}
              style={{
                margin: 0

              }}
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<ArrowBackIosIcon>{t('PAGE_NAME_BACK_BUTTON')}</ArrowBackIosIcon>}
            >
              {t('PAGE_NAME_BACK_BUTTON')}
            </Button>
          </Grid>

        </Grid>}
    </Grid>
  )
}
PageName.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
  backButtonUrl: PropTypes.string,
  organizationId: PropTypes.string,
  showChangeCulture: PropTypes.bool

}
