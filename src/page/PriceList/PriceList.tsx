import { Card, CardContent, CardHeader, Container, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { axiosInstance } from '../../axiosInstance'
import PageName from '../../component/PageName/PageName'
import StarIcon from '@material-ui/icons/StarBorder'
import useStyles from '../../styles'
import PriceListLicence from '../../WebModel/Page/PriceListLicence'

export default function PriceList () {
  const { t } = useTranslation()
  const classes = useStyles()
  const [priceList, setPriceList] = React.useState([])
  useEffect(() => {
    const fetchData = async () => {
      axiosInstance.get('web/Page/PriceList').then(function (response: any) {
        setPriceList(response?.data?.data)
      })
    }

    fetchData()
  }, [])
  return (<Container component="main" maxWidth="xl">
    <PageName title={t('PAGE_PRICELIST_TITLE')} />
    <Paper>

      <Grid container spacing={3} alignItems="flex-end">
        {priceList?.map((price: PriceListLicence) => (

          <Grid item key={price.id} xl={3}>
            <Card>
              <CardHeader
                title={t(price.name)}
                subheader=""
                titleTypographyProps={{ align: 'center' }}
                subheaderTypographyProps={{ align: 'center' }}
                action={price.name === 'PROFESIONAL' ? <StarIcon /> : null}
                className={classes.cardHeader}
              />
              <CardContent>
                <div className={classes.cardPricing}>
                  <Typography component="h2" variant="h3" color="textPrimary">
                    {price.mounthPrice}/€
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    /{t('PRICE_LIST_MOUNT')}
                  </Typography>
                </div>
                <ul className={classes.priceListUl}>
                  <Typography component="li" variant="subtitle1" align="center">
                    {t('PRICE_LIST_MAXIMUM_BRANCH')}: {price.maximumBranch === 0 ? t('PRICE_LIST_UNLIMITED') : price.maximumBranch}
                  </Typography>
                  <Typography component="li" variant="subtitle1" align="center">
                    {t('PRICE_LIST_MAXIMUM_COURSE')}: {price.maximumCourse === 0 ? t('PRICE_LIST_UNLIMITED') : price.maximumCourse}
                  </Typography>
                  <Typography component="li" variant="subtitle1" align="center">
                    {t('PRICE_LIST_MAXIMUM_USER')}: {price.maximumUser === 0 ? t('PRICE_LIST_UNLIMITED') : price.maximumUser}
                  </Typography>

                </ul>
              </CardContent>

            </Card>
          </Grid>
        ))}
      </Grid>

    </Paper>
  </Container>

  )
}
