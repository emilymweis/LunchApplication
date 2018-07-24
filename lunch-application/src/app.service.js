import axios from 'axios'
import VueOnToast from 'vue-on-toast'
import Vue from 'vue'
import Vuex from 'vuex'
import memoryService from './memory.service'

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

var loginService = (function () {
  function authStatus () {
    // var state = memoryService.getAuthStatus()
    // console.log(['state: ', state])
    return false // state
  }

  function login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post(baseUrl + '/userdata/userlogin', credentials)
        .then(function (response) {
          if (response.data === true) {
            window.sessionStorage.setItem('loginSuccessMessage', 'You have successfully logged on')
            memoryService.setAuthStatus(true)
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
  }

  function logout () {
    memoryService.setAuthStatus(false)
    window.location.href = '/home'
  }

  return {
    login: login,
    logout: logout,
    authStatus: authStatus
  }
})()

export default loginService
