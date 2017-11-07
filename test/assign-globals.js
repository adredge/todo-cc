"use strict"

const chai = require('chai')
// const chaiAsPromised = require('chai-as-promised')
// const sinon = require('sinon')
const td = require('testdouble')

// require('sinon-as-promised')
// chai.use(chaiAsPromised)
td.config({ignoreWarnings: true})

Object.assign(global, {
  assert: chai.assert,
  expect: chai.expect,
//   sinon,
  td
})

// process.on('uncaughtException', function (err) {
//   console.error('uncaughtException')
//   console.error(err.stack)
// })

// process.on('unhandledRejection', function (err) {
//   console.error('unhandledRejection')
//   console.error(err.stack)
// })