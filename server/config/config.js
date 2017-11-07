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
    // rootPath: rootPath,
    // db: 'mongodb://jeames:multivision@ds053178.mongolab.com:53178/multivision',
    // port: process.env.PORT || 80,
    // userCookieName
  }
}