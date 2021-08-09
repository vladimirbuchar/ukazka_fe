import _ from 'lodash'
export default function GetUserId () {
  let userId = sessionStorage.getItem('userId')
  if (userId === null || userId === undefined || userId === 'undefined') {
    userId = localStorage.getItem('userId')
    if (userId === null || userId === undefined || userId === 'undefined') {
      return ''
    }
    sessionStorage.setItem('userId', userId)
  }
  return userId
}
