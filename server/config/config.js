'use strict'

module.exports = {
  development: {
    db: 'mongodb://localhost/todo',
    port: process.env.PORT || 3001,
    defaultUserId: 'amy-dredge',
    userCookieName: 'user'
  },
  test: {
    db: 'mongodb://localhost/todo-integration',
    port: process.env.PORT || 3001,
    defaultUserId: 'test-user',
    userCookieName: 'user'
  },
  production: {
    // db: 'mongodb://localhost/todo',
    // port: process.env.PORT || 80,
    //defaultUserId: 'some-user',
    // userCookieName: 'user'
  }
}