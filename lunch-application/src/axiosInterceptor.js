import axios from 'axios'
import memoryService from './memory.service'

axios.interceptors.request.use(function (config) {
  memoryService.setLoading(true)
  return config
}, function (error) {
  memoryService.setLoading(false)
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  memoryService.setLoading(false)
  return response
}, function (error) {
  memoryService.setLoading(false)

  if (error.response && error.response.status && error.response.status === 401) {
    if (document.location.hash.toLowerCase() !== '#/denied') {
      this.$router.push({ name: 'DeniedView' })
    }
  }

  return Promise.reject(error)
})

export default axios
