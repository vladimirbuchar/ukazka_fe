import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import signincs from './page/SignIn/SignIn.i18.cs.json'
import menucs from './component/Menu/Menu.i18n.cs.json'
import signupcs from './page/SignUp/SignUp.i18n.cs.json'
import validationcs from './i118n/Validation.i18n.cs.json'
import myprofilecs from './page/MyProfile/MyProfile.i18n.cs.json'
import organizationcs from './component/Organization/Organization.i18n.cs.json'
import dashboardcs from './page/Dashboard/Dashboard.i18n.cs.json'
import organizationeditcs from './page/OrganizationEdit/OrganizationEdit.i18n.cs.json'
import branchcs from './page/BranchEdit/BranchEdit.i18n.cs.json'
import classroomcs from './page/ClassRoomEdit/ClassRoomEdit.i18n.cs.json'
import questiondialogcs from './component/QuestionDialog/QuestionDialog.i18n.cs.json'
import myorgsanizationscs from './page/OrganizationList/OrganizationList.i18n.cs.json'
import addUserToOrgnizationCs from './page/AddUserToOrganization/AddUserToOrganization.i18n.cs.json'
import organizationRoleCs from './i118n/OrganizationRole.i18n.cs.json'
import notificationlistcs from './page/NotificationList/NotificationList.i18n.cs.json'
import courseeditcs from './page/CourseEdit/CourseEdit.i18n.cs.json'
import addresscs from './component/AddressField/AddressField.i18n.cs.json'
import contactcs from './component/ContactField/ContactField.i18n.cs.json'
import accessforbidencs from './component/AccessForbiden/AccessForbiden.i18n.cs.json'
import savebuttonscs from './component/SaveButtons/SaveButtons.i18n.cs.json'
import codebookcs from './component/CodeBook/CodeBook.i18n.cs.json'
import coursetermeditcs from './page/CourseTermEdit/CourseTermEdit.i18n.cs.json'
import coursepricecs from './component/CoursePrice/CoursePrice.i18n.cs.json'
import coursestudentcountcs from './component/CourseStudentCount/CourseStudentCount.i18.cs.json'
import addstudenttotermcs from './page/AddStudentToTerm/AddStudentToTerm.i18n.cs.json'
import courseleesoneditcs from './page/CourseLessonEdit/CourseLessonEdit.i18n.cs.json'
import courselessitemeditcs from './page/CourseLessonItemEdit/CourseLessonItemEdit.i18n.cs.json'
import fileuploadcs from './component/FileUpload/FileUpload.i18n.cs.json'
import bankofquestioncs from './page/BankOfQuestionEdit/BankOfQuestionEdit.i18n.cs.json'
import questioncs from './page/Question/Question.i18n.cs.json'
import answercs from './page/Answer/Answer.i18n.cs.json'
import coursetestcs from './page/CourseTestEdit/CourseTestEdit.i18n.cs.json'
import errorcs from './i118n/Error.i18n.cs.json'
import errorpagecs from './page/Error/Error.i18n.cs.json'
import mycoursecs from './component/MyCourse/MyCourse.i18n.cs.json'
import browsecoursecs from './page/BrowseCourse/BrowseCourse.i18n.cs.json'
import importlessonfrompowerpointcs from './component/ImportLessonDialog/ImportLessonDialog.i18n.cs.json'
import studenttestresultcs from './page/StudentTestResult/StudentTestResult.i18n.cs.json'
import studenttestresultdetailcs from './page/StudentTestResultDetail/StudentTestResultDetail.i18n.cs.json'
import mycourselistcs from './page/MyCourseList/MyCourseList.i18n.cs.json'
import contactpagecs from './page/Contact/Contact.i18n.cs.json'
import pricelistcs from './page/PriceList/PriceList.i18n.cs.json'
import helpcs from './page/Help/Help.i18n.cs.json'
import activateusercs from './page/ActivateUser/ActivateUser.i18n.cs.json'
import passwordresetcs from './page/PasswordReset/PasswordReset.i18n.cs.json'
import newpasswordcs from './page/NewPassword/NewPassword.i18n.cs.json'
import pagenamecs from './component/PageName/PageName.i18n.cs.json'
import customtablecs from './component/CustomTable/CustomTable.i18n.cs.json'
import infodialogcs from './component/InfoDialog/InfoDialog.i18n.cs.json'
import certificatecs from './page/CertficateEdit/CertficateEdit.i18n.cs.json'
import messagetypecs from './page/SendMessageEdit/SendMessageEdit.i18n.cs.json'
import studentgroupcs from './page/StudentGroupEdit/StudentGroupEdit.i18n.cs.json'
import coursematerialcs from './page/CourseMaterialEdit/CourseMaterialEdit.i18n.cs.json'
import htmleditorcs from './component/CustomHtmlEditor/CustomHtmlEditor.i18n.cs.json'
import colordialogcs from './component/ColorDialog/ColorDialog.i18n.cs.json'
import studentattendancecs from './page/StudentAttendance/StudentAttendance.i18n.cs.json'
import studentevaluationcs from './page/StudentEvaluation/StudentEvaluation.i18n.cs.json'
import notecs from './page/NoteEdit/NoteEdit.i18n.cs.json'
import customdrawpanelcs from './component/CustomDrawPanel/CustomDrawPanel.i18n.cs.json'
// en
import signinen from './page/SignIn/SignIn.i18.en.json'
import menuen from './component/Menu/Menu.i18n.en.json'
import signupen from './page/SignUp/SignUp.i18n.en.json'
import validationen from './i118n/Validation.i18n.en.json'
import myprofileen from './page/MyProfile/MyProfile.i18n.en.json'
import organizationen from './component/Organization/Organization.i18n.en.json'
import dashboarden from './page/Dashboard/Dashboard.i18n.en.json'
import organizationediten from './page/OrganizationEdit/OrganizationEdit.i18n.en.json'
import branchen from './page/BranchEdit/BranchEdit.i18n.en.json'
import classroomen from './page/ClassRoomEdit/ClassRoomEdit.i18n.en.json'
import questiondialogen from './component/QuestionDialog/QuestionDialog.i18n.en.json'
import myorgsanizationsen from './page/OrganizationList/OrganizationList.i18n.en.json'
import addUserToOrgnizationen from './page/AddUserToOrganization/AddUserToOrganization.i18n.en.json'
import organizationRoleen from './i118n/OrganizationRole.i18n.en.json'
import notificationlisten from './page/NotificationList/NotificationList.i18n.en.json'
import courseediten from './page/CourseEdit/CourseEdit.i18n.en.json'
import addressen from './component/AddressField/AddressField.i18n.en.json'
import contacten from './component/ContactField/ContactField.i18n.en.json'
import accessforbidenen from './component/AccessForbiden/AccessForbiden.i18n.en.json'
import savebuttonsen from './component/SaveButtons/SaveButtons.i18n.en.json'
import codebooken from './component/CodeBook/CodeBook.i18n.en.json'
import coursetermediten from './page/CourseTermEdit/CourseTermEdit.i18n.en.json'
import coursepriceen from './component/CoursePrice/CoursePrice.i18n.en.json'
import coursestudentcounten from './component/CourseStudentCount/CourseStudentCount.i18.en.json'
import addstudenttotermen from './page/AddStudentToTerm/AddStudentToTerm.i18n.en.json'
import courseleesonediten from './page/CourseLessonEdit/CourseLessonEdit.i18n.en.json'
import courselessitemediten from './page/CourseLessonItemEdit/CourseLessonItemEdit.i18n.en.json'
import fileuploaden from './component/FileUpload/FileUpload.i18n.en.json'
import bankofquestionen from './page/BankOfQuestionEdit/BankOfQuestionEdit.i18n.en.json'
import questionen from './page/Question/Question.i18n.en.json'
import answeren from './page/Answer/Answer.i18n.en.json'
import coursetesten from './page/CourseTestEdit/CourseTestEdit.i18n.en.json'
import erroren from './i118n/Error.i18n.en.json'
import errorpageen from './page/Error/Error.i18n.en.json'
import mycourseen from './component/MyCourse/MyCourse.i18n.en.json'
import browsecourseen from './page/BrowseCourse/BrowseCourse.i18n.en.json'
import importlessonfrompowerpointen from './component/ImportLessonDialog/ImportLessonDialog.i18n.en.json'
import mycourselisten from './page/MyCourseList/MyCourseList.i18n.en.json'
import contactpageen from './page/Contact/Contact.i18n.en.json'
import pricelisten from './page/PriceList/PriceList.i18n.en.json'
import helpen from './page/Help/Help.i18n.en.json'
import activateuseren from './page/ActivateUser/ActivateUser.i18n.en.json'
import passwordreseten from './page/PasswordReset/PasswordReset.i18n.en.json'
import newpassworden from './page/NewPassword/NewPassword.i18n.en.json'
/* import studenttestresulten from './page/StudentTestResult/StudentTestResult.i18n.en.json';
import studenttestresultdetailen from './page/StudentTestResultDetail/StudentTestResultDetail.i18n.en.json'; */

i18n.use(LanguageDetector).init({
  // we init with resources
  resources: {
    en: {
      translations: Object.assign({}, signinen, menuen, signupen, validationen, myprofileen, organizationen, dashboarden, organizationediten, branchen, classroomen, questiondialogen, myorgsanizationsen, addUserToOrgnizationen, organizationRoleen, notificationlisten, courseediten, addressen, contacten, accessforbidenen, savebuttonsen, codebooken, coursetermediten, coursepriceen, coursestudentcounten, addstudenttotermen, courseleesonediten, courselessitemediten, fileuploaden, bankofquestionen, questionen, answeren, coursetesten, erroren, errorpageen, mycourseen, browsecourseen, importlessonfrompowerpointen, mycourselisten, contactpageen, pricelisten, helpen, activateuseren, passwordreseten, newpassworden)
    },
    cs: {
      translations: Object.assign({}, signincs, menucs, signupcs, validationcs, myprofilecs, organizationcs, dashboardcs, organizationeditcs, branchcs, classroomcs, questiondialogcs, myorgsanizationscs, addUserToOrgnizationCs, organizationRoleCs, notificationlistcs, courseeditcs, addresscs, contactcs, accessforbidencs, savebuttonscs, codebookcs, coursetermeditcs, coursepricecs, coursestudentcountcs, addstudenttotermcs, courseleesoneditcs, courselessitemeditcs, fileuploadcs, bankofquestioncs, questioncs, answercs, coursetestcs, errorcs, errorpagecs, mycoursecs, browsecoursecs, importlessonfrompowerpointcs, studenttestresultcs, studenttestresultdetailcs, mycourselistcs, contactpagecs, pricelistcs, helpcs, activateusercs, passwordresetcs, newpasswordcs, pagenamecs, customtablecs, infodialogcs, certificatecs, messagetypecs, studentgroupcs, coursematerialcs, htmleditorcs, colordialogcs, studentattendancecs, studentevaluationcs, notecs, customdrawpanelcs)
    }
  },
  fallbackLng: 'en',
  debug: false,

  // have a common namespace used around the full app
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  }
})

export default i18n
export const getLanguage = () => {
  return i18n.language ||
    (typeof window !== 'undefined' && window.localStorage.i18nextLng) ||
    'en'
}
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language)
}
