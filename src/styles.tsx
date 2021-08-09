import './App.css'
import { makeStyles } from '@material-ui/core/styles'
import img from './img.jpg'
const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  loadingpanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    zIndex: 9999,
    opacity: 0.4
  },
  root: {
    display: 'flex',
    background: `url(${img}) no-repeat center fixed`
  },
  rootCourseMenu: {

    flexGrow: 1,
    maxWidth: 400
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
    /* opacity:'0.9' */
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  organizationName: {
    marginTop: theme.spacing(2),
    paddingLeft: '10px'
  },
  organizationMenu: {
    paddingTop: theme.spacing(3),
    paddingLeft: '10px'
  },
  fixedHeight: {
    height: 240
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  },
  button: {
    margin: theme.spacing(1)
  },
  pageTitle: {
    padding: theme.spacing(2)
  },
  buttonSbmitPadding: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  userEmails: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0
  },
  dn: {
    display: 'none'
  },
  top: {
    marginTop: 0,
    position: 'relative'
  },
  manyAnswers: {
    width: '100%'
  },
  testOk: {
    color: 'green'
  },
  testError: {
    color: 'red'
  },
  footer: {
    paddingTop: '10px',
    overflow: 'hidden'
  },
  footerContact: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    margin: '0 auto',
    overflow: 'hidden',
    width: '25em'
  },
  footerContactItem: {
    width: '3em'
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700]
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2)
  },
  priceListUl: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  },
  dashboardOrganization: {
    paddingLeft: 0
  },
  selectBoxPadding: {
    marginTop: 10
  },
  rootPaper: {
    minHeight: 'calc(100vh - 64px)',
    height: 'auto'
  },
  leftMenu: {
    opacity: '0.8'
  },
  saveButtons: {
    margin: 0,
    marginTop: 10
  },
  table: {
    width: '100%'
  }
}))
export default useStyles
