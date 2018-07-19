import axios from 'axios'
import VueOnToast from 'vue-on-toast'

axios.defaults.baseURL = 'https://lunchapplication.azurewebsites.net'
const baseUrl = axios.defaults.baseURL

axios.interceptors.request.use(function (config) {
  if (typeof window === 'undefined') {
    return config
  }
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const appService = {
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/userdata/userlogin', credentials)
        .then(function (response) {
          console.log(response)
          if (response.data === true) {
            window.sessionStorage.setItem('loginSuccessMessage', 'You have successfully logged on')
            window.location.href = '/home'
          } else {
            VueOnToast.ToastService.pop('error', 'You have not been logged in. This is because of a wrong password or username')
          }
        })
        .catch(function (error) {
          console.log(error)
          VueOnToast.ToastService.pop('error', 'you have not been logged in ' + error)
        })
    })
  },
  logout (credentials) {
    if (credentials) {
      window.sessionStorage.setItem('logoutSuccessMessage', 'You have successfully logged off')
      window.location.href = '/home'
      console.log('logged off')
    } else {
      VueOnToast.ToastService.pop('error', 'You have not been logged off')
    }
  }
}

export default appService
