import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'https://localhost:44311/api/' : 'https://api.flexiblelms.com/api/',
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
axiosInstance.interceptors.response.use(undefined, function (error) {
  try {
    if (error.response.status === 400) {
      return Promise.reject(error)
    }
    if (error.response.status === 401) {
      sessionStorage.clear()
      localStorage.removeItem('userId')
      localStorage.removeItem('userToken')
      window.location.href = '/'
      return Promise.reject(error)
    }
    if (error.response.status === 403) {
      if (process.env.NODE_ENV !== 'development') {
        window.location.href = '/dashboard'
      }
      return Promise.reject(error)
    }
    if (error.response.status === 500) {
      if (process.env.NODE_ENV !== 'development') {
        window.location.href = '/error500'
      }
      return Promise.reject(error)
    }
    if (error.response.status === 404) {
      return Promise.reject(error)
    }
  } catch (e) {
    console.log(e)
    // window.location.href="/";
  }
})
