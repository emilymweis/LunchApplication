const memoryService = (function () {
  const authStatus = 'authStatus'

  function getAuthStatus () {
    return getValue(authStatus)
  }

  function setAuthStatus (value) {
    window.sessionStorage.setItem(authStatus, value)
  }

  function getValue (key) {
    if (window.sessionStorage.getItem(key) === 'true') {
      return true
    } else if (window.sessionStorage.getItem(key) === 'false') {
      return false
    } else if (window.sessionStorage.getItem(key) === null) {
      // all bool values
      if ([authStatus].indexOf(key)) {
        return false
      }
      return ''
    }
    return window.sessionStorage.getItem(key)
  }

  function isLoading () {
    return window.sessionStorage.getItem('loadingState')
  }

  function setLoading (s) {
    if (typeof window === 'object') {
      window.sessionStorage.setItem('loadingState', s)
      callback()
    }
  }

  function setCallback (c) {
    callback = c
  }

  var callback = function () { }

  return {
    getAuthStatus: getAuthStatus,
    setAuthStatus: setAuthStatus,
    isLoading: isLoading,
    setLoading: setLoading,
    setCallback: setCallback
  }
})()

export default memoryService
