export default function GetUserToken () {
  let token = sessionStorage.getItem('userToken')
  if (token === null || token === undefined || token === 'undefined') {
    token = localStorage.getItem('userToken')
    if (token === null || token === undefined || token === 'undefined') {
      return ''
    }
    sessionStorage.setItem('userToken', token)
  }
  return token
}
