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

  return {
    getAuthStatus: getAuthStatus,
    setAuthStatus: setAuthStatus
  }
})()

export default memoryService
