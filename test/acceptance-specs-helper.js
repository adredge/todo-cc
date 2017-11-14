'use strict'

const axios = require('axios')
const LocalService = require('./local-service')
const config = require('../server/config/config')['test'];

const localService = new LocalService('./server.js')

const apiBaseUrl = `http://localhost:${config.port}/api`

before(() => {
  return localService.start()
})

after(() => {
  return localService.kill()
})

function generateAuthCookie(userId) {
  if (!userId) return Promise.resolve({})

  return Promise.resolve({ Cookie: `${config.userCookieName}=${userId}` })
}

module.exports = {
  apiGet(userId, relativeUrl) {
    let url = `${apiBaseUrl}/${relativeUrl}`
    // console.log('url', url)
    return generateAuthCookie(userId).then(headers =>
      axios.get(url, { headers }))
      .then(response => response.data)
  },

  apiPost(userId, relativeUrl, data) {
    let url = `${apiBaseUrl}/${relativeUrl}`
    // console.log('post url', url, data)
    return generateAuthCookie(userId).then(headers =>
      axios.post(url, data, { headers })
        .then(response => response.data)
    )
  },
  apiDelete(userId, relativeUrl) {
    let url = `${apiBaseUrl}/${relativeUrl}`
    // console.log('delete url', url)
    return generateAuthCookie(userId).then(headers =>
      axios.delete(url, { headers })
        .catch(err => console.log("ERROR", err))
    )
  },
}