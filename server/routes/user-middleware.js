'use strict'

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env]

module.exports = function(req, res, next) {
  let userId
  const userIdCookie = req.cookies[config.userCookieName]

  if (!userIdCookie) {
    userId = config.defaultUserId
    res.cookie(config.userCookieName, userId, { maxAge: 900000, httpOnly: true });
    req.userId = userId
    return next();
  }

  req.userId = userIdCookie
  next()
}