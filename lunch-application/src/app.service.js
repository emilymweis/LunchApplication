import axios from 'axios'
import VueOnToast from 'vue-on-toast'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

axios.defaults.baseURL = 'https://lunchapplication.azurewebsites.net'
const baseUrl = axios.defaults.baseURL

axios.interceptors.request.use(function (config) {
  if (typeof window === 'undefined') {
    return config
  }
  const token = window.sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const state = {
  authStatus: false
}

const loginService = {
  state,
  getters: {
    authStatus: (state) => {
      console.log('service getter: ' + state.authStatus)
      return state.authStatus
    }
  },
  actions: {
    login (credentials) {
      return new Promise((resolve, reject) => {
        axios.post(baseUrl + '/userdata/userlogin', credentials)
          .then(function (response) {
            if (response.data === true) {
              window.sessionStorage.setItem('loginSuccessMessage', 'You have successfully logged on')
              window.sessionStorage.setItem('authStatus', true)
              if (window.sessionStorage.getItem('authStatus') === 'true') {
                state.authStatus = true
              }
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
    logout () {
      window.sessionStorage.setItem('authStatus', false)
      if (window.sessionStorage.getItem('authStatus') === 'false') {
        state.authStatus = false
      }
      window.location.href = '/home'
    }
  }
}

export default loginService
