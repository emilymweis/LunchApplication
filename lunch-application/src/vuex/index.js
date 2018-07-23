import Vue from 'vue'
import Vuex from 'vuex'
import loginService from '../app.service.js'

Vue.use(Vuex)

const state = {
  isAuthenticated: false
}
const store = new Vuex.Store({
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    authStatus: () => {
      console.log('index getter ' + loginService.getters.authStatus)
      return loginService.getters.authStatus
    }
  },
  actions: {
    logout (context) {
      loginService.actions.logout()
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise((resolve) => {
        loginService.actions.login(credentials)
          .then((data) => {
            context.commit('login', data)
            resolve()
          })
          .catch(() => {
            console.log('error logging in')
          })
      })
    }
  },
  mutations: {
    logout (state) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('token', null)
        window.sessionStorage.setItem('tokenExpiration', null)
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('token', token.token)
        window.sessionStorage.setItem('tokenExpiration', token.expiration)
      }
      state.isAuthenticated = true
    }
  }
})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    let expiration = window.sessionStorage.getItem('tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      store.state.isAuthenticated = true
    }
  })
}

export default store
