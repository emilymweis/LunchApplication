const memoryService = (function () {
  const authStatus = 'authStatus'

  function getAuthStatus () {
    // console.log(['window', window])
    console.log(['getting auth status'])
    console.log(['getValue value: ', getValue(authStatus)])
    return getValue(authStatus)
  }

  function setAuthStatus (value) {
    console.log(['setting auth status', value])
    window.sessionStorage.setItem(authStatus, value)
    console.log(['setter auth status', window.sessionStorage.getItem(authStatus)])
    console.log(['get: ', getValue(authStatus)])
  }

  function getValue (key) {
    if (window.sessionStorage.getItem(key) === 'true') {
      console.log(['memory true: ', window.sessionStorage.getItem(key)])
      return true
    } else if (window.sessionStorage.getItem(key) === 'false') {
      console.log(['memory false: ', window.sessionStorage.getItem(key)])
      return false
    } else if (window.sessionStorage.getItem(key) === null) {
      console.log(['memory null: ', window.sessionStorage.getItem(key)])
      // all bool values
      if ([authStatus].indexOf(key)) {
        return false
      }
      console.log(['returned: blank'])
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
