import React from 'react'
import { useTranslation } from 'react-i18next'
import { ListItemIcon, ListItemText, Menu, MenuItem, TableCell, TableRow } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link as ReactLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import SchoolIcon from '@material-ui/icons/School'
export function MyCourseItem (props: any) {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const { id, name, isOrganizationLector, isOrganizationStudent, termName, organizationName, branchName, classRoomName, courseStudentId, finishCourse, onChangeOpacity, courseTermId } = props
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const courseLink = '/browsecourse?courseId=' + id + '&courseTermId=' + courseTermId
  const studenttestresult = '/studenttestresult?courseId=' + id
  const attendanceLink = '/studentattendance?courseId=' + id + '&courseTermId=' + courseTermId
  const evaluationLink = '/studentevaluation?courseId=' + id + '&courseTermId=' + courseTermId
  const onClickLink = () => {
    //         onChangeOpacity()
  }
  return (
    <TableRow key={id}>

      <TableCell component="th" scope="row">

        {isOrganizationLector &&
<Link component={ReactLink} variant="body2" to={courseLink} onClick={onClickLink}>
  {t('ORGANIZATION_LECTOR')} - {name}

</Link>}

        {isOrganizationStudent && !finishCourse &&
<Link component={ReactLink} variant="body2" to={courseLink + '&courseStudentId=' + courseStudentId} onClick={onClickLink}>
 xxx
  {isOrganizationStudent && t('ORGANIZATION_STUDENT')} - {name}
</Link>}
        {isOrganizationStudent && finishCourse &&
<Link component={ReactLink} variant="body2" to="" onClick={onClickLink}>

  {isOrganizationStudent && t('ORGANIZATION_STUDENT')} - {name}
</Link>}

      </TableCell>
      <TableCell>
        {termName
          .replace('CORSE_TERM_MONDAY', t('CORSE_TERM_MONDAY'))
          .replace('CORSE_TERM_TUESDAY', t('CORSE_TERM_TUESDAY'))
          .replace('CORSE_TERM_WEDNESDAY', t('CORSE_TERM_WEDNESDAY'))
          .replace('CORSE_TERM_THURSDAY', t('CORSE_TERM_THURSDAY'))
          .replace('COURSE_TERM_FRIDAY', t('COURSE_TERM_FRIDAY'))
          .replace('COURSE_TERM_SATURDAY', t('COURSE_TERM_SATURDAY'))
          .replace('COURSE_TERM_SUNDAY', t('COURSE_TERM_SUNDAY'))

        }
      </TableCell>
      <TableCell>
        {organizationName}
      </TableCell>
      <TableCell>
        {branchName === 'ONLINE_BRANCH' ? t('ONLINE_STUDY') : branchName }
      </TableCell>
      <TableCell>
        {classRoomName === 'ONLINE_CLASSROOM' ? t('ONLINE_STUDY') : classRoomName }
      </TableCell>
      <TableCell>
        {isOrganizationStudent && !finishCourse && t('STUDENT_STUDY')}
        {isOrganizationStudent && finishCourse && t('STUDENT_STUDY_FINSH')}
        {isOrganizationLector && '-'}
      </TableCell>
      <TableCell align="right"><IconButton
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >

        {(isOrganizationLector || (isOrganizationStudent && !finishCourse)) &&
                <MenuItem button component={ReactLink} to={courseLink} onClick={onChangeOpacity}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('BROWSE_COURSE')} />
                </MenuItem>
        }
        {isOrganizationLector &&
                <MenuItem button component={ReactLink} to={studenttestresult}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('STUDENT_TEST_RESULT')} />
                </MenuItem>
        }
        {isOrganizationLector &&
                <MenuItem button component={ReactLink} to={attendanceLink}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('STUDENT_TEST_ATTENDANCE')} />
                </MenuItem>
        }
        {isOrganizationLector &&
                <MenuItem button component={ReactLink} to={evaluationLink}>
                  <ListItemIcon>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('STUDENT_STUDENT_EVALUATION')} />
                </MenuItem>
        }

      </Menu>

      </TableCell>

    </TableRow>

  )
}
MyCourseItem.propTypes = {
  name: PropTypes.string,
  isOrganizationLector: PropTypes.bool,
  isOrganizationStudent: PropTypes.bool,
  id: PropTypes.string,
  termName: PropTypes.string,
  organizationName: PropTypes.string,
  branchName: PropTypes.string,
  classRoomName: PropTypes.string,
  courseStudentId: PropTypes.string,
  finishCourse: PropTypes.bool,
  onChangeOpacity: PropTypes.func,
  courseTermId: PropTypes.string
}
