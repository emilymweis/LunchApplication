import Vue from 'vue'
import Vuex from 'vuex'
import appService from '../app.service.js'

Vue.use(Vuex)

const state = {
  isAuthenticated: false
}

const store = new Vuex.Store({
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },
  actions: {
    logout (context) {
      appService.logout(context)
      context.commit('logout')
    },
    login (context, credentials) {
      return new Promise((resolve) => {
        appService.login(credentials)
          .then((data) => {
            context.commit('login', data)
            resolve()
          })
          .catch(() => {
            if (typeof window !== 'undefined') { window.alert('Could not login!') }
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
      window.sessionStorage.setItem('isAuthenticated', null)
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('token', token.token)
        window.sessionStorage.setItem('tokenExpiration', token.expiration)
      }
      state.isAuthenticated = true
      window.sessionStorage.setItem('isAuthenticated', true)
    }
  }
})

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    let expiration = window.sessionStorage.getItem('tokenExpiration')
    var unixTimestamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimestamp > 0) {
      store.state.isAuthenticated = true
      window.sessionStorage.setItem('isAuthenticated', true)
    }
  })
}

export default store
